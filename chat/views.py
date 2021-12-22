# chat/views.py
import json
import re

from django.contrib import messages
from django.contrib.auth.mixins import LoginRequiredMixin
from django.core.exceptions import PermissionDenied
from django.db.models import Q
from django.http import HttpResponseNotAllowed, JsonResponse, HttpResponse
from django.shortcuts import render, redirect
from django.utils.decorators import method_decorator
from django.utils.safestring import mark_safe
from django.views import View
from django.views.decorators.csrf import csrf_exempt
from django.views.generic import CreateView

from chat.forms import GroupCreateForm
from chat.models import GroupChatModel, P2pChatModel, GroupChatUnreadMessage, GroupChat, UserMedia, UploadedMedia, \
    GroupCallHistory
from users.models import User
from cryptography.fernet import Fernet


@csrf_exempt
def update_session(request):
    # if not request.is_ajax() or not request.method == 'GET':
    #     return HttpResponseNotAllowed(['POST'])
    request.session['receiver_id'] = request.GET.get('receiver_id')
    return JsonResponse({
        'status': 'success',
        'receiver_id': request.session['receiver_id'],
        # 'session': request.session,
    })


def index(request):
    return render(request, 'chat/index.html', {})


def room(request, room_name):
    return render(request, 'chat/room.html', {
        'room_name_json': mark_safe(json.dumps(room_name)),
        'username': mark_safe(json.dumps(request.user.username)),
    })


def myroom(request):
    context = {}
    users = User.objects.all().exclude(request.user)
    context['contact_list'] = users
    return render(request, 'chat/contact_list.html', context)


#
# def setroomusers(request):
#     context = {}
#     receiver = request.POST.get('receiver')

def arrange_users(users):
    chat_list = {}
    for user in users:
        username = user.username
        # print(username)
        if username[0].upper() not in chat_list.keys():
            chat_list[username[0].upper()] = []
            chat_list[username[0].upper()].append(username)
        else:
            if username not in chat_list[username[0].upper()]:
                chat_list[username[0].upper()].append(username)
    chat_list_order = sorted(chat_list.keys(), key=lambda x: x.lower())
    accounts = []
    for item in chat_list_order:
        initial = [item]
        chats = [chat_list[item]]
        print(chats)
        accounts.append([initial, chats])
    account_dict = {}
    for item in accounts:
        account_dict[item[0][0]] = []
        for username in item[1][0]:
            user = User.objects.filter(username=username).last()
            account_dict[item[0][0]].append(user)
    return account_dict


class ChatRoom(LoginRequiredMixin, View):
    def get(self, *args, **kwargs):
        context = {}
        user = self.request.user

        users = user.get_user_connected_users()
        context['chat_list_user'] = users
        remaining_users = user.get_remaining_users()
        context['contact_list'] = users
        context['group_list'] = self.request.user.groups.all()
        account_dict = arrange_users(users)
        remaining_dict = arrange_users(remaining_users)
        context['remaining_dict'] = remaining_dict
        context['accounts'] = account_dict
        context['room_name_json'] = mark_safe(json.dumps('room_name'))
        context['session_key'] = mark_safe(json.dumps(self.request.session.session_key))
        context['user'] = user
        number_of_user_created_groups = GroupChatModel.objects.filter(created_by=user).count()
        context['allow_group_creation'] = user.payment.plan.total_group_create_size > number_of_user_created_groups
        return render(self.request, 'chat/chat-direct.html', context)


class IsGroupPermission:
    def dispatch(self, request, *args, **kwargs):
        user = request.user
        if user.is_plan_valid():
            if user.has_group_create_permission():
                valid, total_groups_valid, current_groups = user.is_new_group_valid()
                if valid:
                    return super().dispatch(request, *args, **kwargs)
                else:
                    msg = f"Only {total_groups_valid} groups allowed to create under your current plan. You already " \
                          f"have {current_groups} groups. "
                    messages.warning(self.request, msg)
                    return redirect('chat:chat')
            else:
                messages.warning(self.request, "Sorry, you don't have permission to create groups")
                return redirect('chat:chat')
        messages.warning(self.request, "You don't have any active plan to create group.")
        return redirect('home:home')


class GroupCreateView(LoginRequiredMixin, IsGroupPermission, CreateView):
    model = GroupChatModel
    form_class = GroupCreateForm

    def form_valid(self, form):
        user = self.request.user
        plan = user.payment.plan
        users = self.request.POST.getlist('groupMember[]')
        if len(users) > plan.group_size:
            msg = f"Only {plan.group_size} member allowed in one Group"
            messages.warning(self.request, msg)
            return redirect('chat:chat')
        group = form.instance
        group.created_by = user
        group.save()

        group.admin.add(user)
        group.name = re.sub(r"\s+", "", group.group_name, flags=re.UNICODE)
        group.save()
        group_create_user = self.request.user
        group_create_user.groups.add(group)
        group_create_user.save()
        users = self.request.POST.getlist('groupMember[]')
        if users:
            for id in users:
                user = User.objects.filter(id=int(id)).last()
                user.groups.add(group)
                user.save()

        return redirect('chat:chat')

class GroupUpdateView(LoginRequiredMixin, IsGroupPermission, View):
    def post(self, *args, **kwargs):
        user = self.request.user
        group_id = self.request.POST['group_id']
        group = GroupChatModel.objects.filter(id=group_id).last()
        updater_belongs_to_group = group.user_set.filter(id=user.id).exists()
        print(updater_belongs_to_group)
        if updater_belongs_to_group:
            group.profile_image = self.request.FILES.get('profile_image')
            group.save()
        return redirect('chat:chat')


class ReadUnReadMessage(LoginRequiredMixin, View):
    def get(self, *args, **kwargs):
        sender_id = self.kwargs.get('pk')
        sender = User.objects.filter(id=sender_id).last()
        if sender:
            message = P2pChatModel.objects.filter(recipient=self.request.user, user=sender, read=False)
            if message:
                for item in message:
                    item.read = True
                    item.save()
                return JsonResponse({
                    'status': True,
                    'read': True
                })
            return JsonResponse({
                'status': False,
                'error': 'No new messages'
            })
        return JsonResponse({
            'status': False,
            'error': 'Sender does not exist!'
        })


class ReadGroupUnReadMessage(LoginRequiredMixin, View):
    def get(self, *args, **kwargs):
        group_id = self.kwargs.get('pk')
        group = GroupChatModel.objects.filter(id=group_id).last()
        if group:
            chats = GroupChat.objects.filter(group=group).exclude(user_read__in=[self.request.user])
            if chats:
                for item in chats:
                    item.user_read.add(self.request.user)
                    item.save()
                return JsonResponse({
                    'status': True,
                    'read': True
                })
            return JsonResponse({
                'status': False,
                'error': 'No new messages'
            })
        return JsonResponse({
            'status': False,
            'error': 'Sender does not exist!'
        })


class DeleteSenderChatMessage(LoginRequiredMixin, View):
    def get(self, *args, **kwargs):
        chat_id = self.kwargs.get('pk')
        chat = P2pChatModel.objects.filter(id=chat_id, user=self.request.user).last()
        if chat:
            chat.body = "This message was deleted."
            chat.save()
            return JsonResponse({
                'status': True,
                'error': 'Message deleted!'
            })
        return JsonResponse({
            'status': False,
            'error': 'Message not found'
        })


class DeleteSenderChatMessageSelf(LoginRequiredMixin, View):
    def get(self, *args, **kwargs):
        chat_id = self.kwargs.get('pk')
        chat = P2pChatModel.objects.filter(id=chat_id, user=self.request.user).last()
        if chat:
            chat.is_delete = True
            chat.save()
            return JsonResponse({
                'status': True,
                'error': 'Message deleted from sender system!'
            })
        return JsonResponse({
            'status': False,
            'error': 'Message not found'
        })


class DeleteSenderGroupChatMessage(LoginRequiredMixin, View):
    def get(self, *args, **kwargs):
        chat_id = self.kwargs.get('pk')
        chat = GroupChat.objects.filter(id=chat_id).last()
        if chat.group in self.request.user.groups.all() and chat.user == self.request.user:
            chat.body = "This message was deleted."
            chat.save()
            return JsonResponse({
                'status': True,
                'error': 'Message deleted from sender system!'
            })
        return JsonResponse({
            'status': True,
            'error': 'Message not found!'
        })


class DeleteSenderGroupChatMessageSelf(LoginRequiredMixin, View):
    def get(self, *args, **kwargs):
        chat_id = self.kwargs.get('pk')
        chat = GroupChat.objects.filter(id=chat_id).last()
        if chat.group in self.request.user.groups.all() and chat.user == self.request.user:
            chat.is_delete = True
            chat.save()
            return JsonResponse({
                'status': True,
                'error': 'Message deleted from sender system!'
            })
        return JsonResponse({
            'status': True,
            'error': 'Message not found!'
        })


class DeleteReceiveChatMessage(LoginRequiredMixin, View):
    def get(self, *args, **kwargs):
        chat_id = self.kwargs.get('pk')
        chat = P2pChatModel.objects.filter(id=chat_id, recipient=self.request.user).last()
        if chat:
            chat.is_receiver_delete = True
            chat.save()
            return JsonResponse({
                'status': True,
                'error': 'Message deleted from receiver system!'
            })
        return JsonResponse({
            'status': False,
            'error': 'Message not found'
        })


class DeleteReceiveGroupChatMessage(LoginRequiredMixin, View):
    def get(self, *args, **kwargs):
        chat_id = self.kwargs.get('pk')
        chat = GroupChat.objects.filter(id=chat_id).last()
        if chat.group in self.request.user.groups.all():
            chat.receiver_delete.add(self.request.user)
            chat.save()
            return JsonResponse({
                'status': False,
                'error': 'Message cleared from system'
            })
        return JsonResponse({
            'status': False,
            'error': 'Message not found'
        })


class DeleteCombineMessage(LoginRequiredMixin, View):
    def get(self, *args, **kwargs):
        chat_id = self.kwargs.get('pk')
        chat = P2pChatModel.objects.filter(id=chat_id).last()
        if chat:
            if chat.user == self.request.user or chat.recipient == self.request.user:
                chat.is_receiver_delete = True
                chat.save()
                return JsonResponse({
                    'status': True,
                    'error': 'Message deleted from receiver system in a loop!'
                })
        return JsonResponse({
            'status': False,
            'error': 'Message not found'
        })


class ClearAllChat(LoginRequiredMixin, View):
    def get(self, *args, **kwargs):
        receiver_id = self.kwargs.get('pk')
        receiver = User.objects.filter(id=receiver_id).last()
        if receiver:
            chats = P2pChatModel.objects.filter(user=self.request.user, recipient=receiver)
            for chat in chats:
                chat.is_delete = True
                chat.save()

            chats = P2pChatModel.objects.filter(user=receiver, recipient=self.request.user)
            for chat in chats:
                chat.is_receiver_delete = True
                chat.save()
            return JsonResponse({
                'status': True,
                'error': 'Clear Message system!'
            })
        return JsonResponse({
            'status': False,
            'error': 'Message not found'
        })


class ClearAllGroupChat(LoginRequiredMixin, View):
    def get(self, *args, **kwargs):
        group_id = self.kwargs.get('pk')
        group = GroupChatModel.objects.filter(id=group_id).last()
        if group and group in self.request.user.groups.all():
            group_chat = GroupChat.objects.filter(group=group)
            for chat in group_chat:
                if chat.user == self.request.user:
                    chat.is_delete = True
                    chat.save()
                else:
                    chat.receiver_delete.add(self.request.user)
                    chat.save()
            return JsonResponse({
                'status': True,
                'error': 'Clear Message system!'
            })
        return JsonResponse({
            'status': False,
            'error': 'Message not found'
        })


class DeleteCombineGroupMessage(LoginRequiredMixin, View):
    def get(self, *args, **kwargs):
        chat_id = self.kwargs.get('pk')
        chat = GroupChat.objects.filter(id=chat_id).last()
        print(chat)
        if chat and chat.group in self.request.user.groups.all():
            if chat.user == self.request.user:
                chat.is_delete = True
            else:
                chat.receiver_delete.add(self.request.user)
            chat.save()
            return JsonResponse({
                'status': True,
                'error': 'Clear Message system!'
            })
        return JsonResponse({
            'status': True,
            'error': 'Message not Found!'
        })


@method_decorator(csrf_exempt, name="dispatch")
class Upload(View):
    def post(self, *args, **kwargs):
        file_media = self.request.FILES.getlist('files')
        user_media = UserMedia(owner=self.request.user)
        user_media.save()
        for file in file_media:
            data = UploadedMedia.objects.create(media=file)
            data.save()
            user_media.files.add(data)
            user_media.save()
        return JsonResponse({
            'bucket_id': user_media.id,
        })


class GroupMemberListView(View):
    def get(self, *args, **kwargs):
        group = GroupChatModel.objects.filter(id=self.kwargs.get('pk')).last()
        if group and group in self.request.user.groups.all():
            if group:
                users = User.objects.filter(groups__in=[group])
                user_list = {}

                for user in users:
                    if user in group.admin.all():
                        user_list[user.id] = f"{user.first_name} {user.last_name},{user.email},true,{user.username}"
                    else:
                        user_list[user.id] = f"{user.first_name} {user.last_name},{user.email},false,{user.username}"

                return JsonResponse({
                    'member_list': user_list,
                    'created_by': f"{group.created_by.first_name} {group.created_by.last_name},{group.created_by.email},true",
                    'info': group.group_info,
                    'created_at': f"{group.created_at.date()},{group.created_at.time()}",
                })
            return JsonResponse({
                "error": "Group not found."
            })
        return JsonResponse({
            "error": "Group not exist."
        })


class RemoveFromGroupView(View):
    def get(self, *args, **kwargs):
        group_id = self.kwargs.get('group_id')
        user_id = self.kwargs.get('user_id')
        group = GroupChatModel.objects.filter(id=group_id).last()
        user = User.objects.filter(id=user_id).last()

        if not group:
            return JsonResponse({
                'error': "Group not exist",
            })
        if not self.request.user == group.created_by:
            return JsonResponse({
                'error': 'Only Group creator can remove member from group',
            })
        if group not in user.groups.all():
            return JsonResponse({
                'error': 'User doesn\'t belongs to group.',
            })

        user.groups.remove(group)
        user.save()
        return JsonResponse({
            'data': 'User removed from group',
        })


class DeleteGroupView(View):
    def get(self, *args, **kwargs):
        group = GroupChatModel.objects.filter(id=self.request.GET.get('pk')).last()
        if not group:
            return JsonResponse({
                'error': "Group not exist!",
            })
        if not self.request.user == group.created_by:
            return JsonResponse({
                'error': 'Only Group creator can delete group!',
            })
        group.delete()
        return JsonResponse({
            'data': 'Group deleted!',
        })


class AddMemberToGroupView(View):
    def get(self, *args, **kwargs):
        group = GroupChatModel.objects.filter(id=self.request.GET.get('pk')).last()
        if not group:
            return JsonResponse({
                'error': "Group not exist!",
            })
        if self.request.user not in group.admin.all():
            return JsonResponse({
                'error': 'Only admin can add member to group',
            })
        # user_id = self.request.GET.get('user_id')
        # user = User.objects.filter(id=user_id).last()
        # if not user:
        #     return JsonResponse({
        #         'error': 'User not exist!',
        #     })
        user_ids = self.request.GET.getlist('user_ids[]')
        users = User.objects.filter(id__in=user_ids)
        plan = self.request.user.payment.plan
        for user in users:
            # Creator is not counted in total group members size
            if plan.group_size > (group.user_set.count() - 1):
                user.groups.add(group)
                user.save()
            else:
                return JsonResponse({
                    'data': f'Failed to add few member(s). Group size of {plan.group_size} exceeded!'
                })
        return JsonResponse({
            'data': 'Member(s) added to Group.'
        })


class VideoCallView(View):
    def get(self, *args, **kwargs):
        context = {}
        return render(self.request, 'chat/video_call.html', context)


fernet_key = b'YDMimaEVL722izWNn7WnnGlEMf53P-r3rAhXh967G00='


class StartVideoCall(View):
    def post(self, *args, **kwargs):
        group_id = self.request.POST.get('group_id')
        if not group_id:
            messages.warning(self.request, "Cannot start Video Call! Invalid Group Code")
            return redirect('chat:chat')
        group = GroupChatModel.objects.filter(id=int(group_id)).last()
        if not group:
            messages.warning(self.request, "Group not exist!")
            return redirect('chat:chat')
        if group not in self.request.user.groups.all():
            messages.warning(self.request, "Group not exist!")
            return redirect('chat:chat')

        group_call_history = GroupCallHistory(started_by=self.request.user)
        group_call_history.save()
        context = {}

        context['group'] = group
        context['user'] = self.request.user

        group_name = f"GroupVideoMeeting_{group.id}_{group_call_history.id}"  # use in websocket url
        context['group_name'] = hash(group_name)  # use in websocket url

        context['is_group_creator'] = True

        fernet = Fernet(fernet_key)
        join_url = fernet.encrypt(group_name.encode())
        context['join_url'] = join_url.decode('utf-8')
        print(join_url, "Aniket join url")
        return render(self.request, 'chat/video.html', context)


class VideoCallReceiver(View):
    def get(self, *args, **kwargs):
        encrypted_group = self.kwargs.get('encrypt_group_name')
        context = {}
        fernet = Fernet(fernet_key)

        encrypted_group = bytes(encrypted_group, 'utf-8')
        group_name = fernet.decrypt(encrypted_group).decode()
        print(group_name, "Aniket")
        try:

            group_id = group_name.split("_")[1]
            call_history_id = group_name.split("_")[2]
            print(call_history_id)
            if not group_id:
                messages.warning(self.request, "Invalid Request!")
                return redirect('chat:chat')
            group = GroupChatModel.objects.filter(id=int(group_id)).last()
            if not group:
                messages.warning(self.request, "Invalid Request!")
                return redirect('chat:chat')
            if group not in self.request.user.groups.all():
                messages.warning(self.request, "Invalid Request!")
                return redirect('chat:chat')

            if not call_history_id:
                messages.warning(self.request, "Invalid Request!")
                return redirect('chat:chat')
            group_call_history = GroupCallHistory.objects.filter(id=int(call_history_id)).last()
            if not group_call_history:
                messages.warning(self.request, "Invalid Request!")
                return redirect('chat:chat')
            if group_call_history.is_end:
                messages.info(self.request, "This Call Has Been Ended By Host.")
                return redirect('chat:chat')

        except Exception as e:
            print(e)
            messages.warning(self.request, "Invalid Request")
            return redirect('chat:chat')

        context['group'] = group
        context['is_group_creator'] = True
        context['user'] = self.request.user
        group_name = f"GroupVideoMeeting_{group.id}_{group_call_history.id}"
        context['group_name'] = hash(group_name)
        return render(self.request, 'chat/video.html', context)


class CallParticpantInfo(View):
    def get(self, *args, **kwargs):
        user_id = self.kwargs.get('pk', None)
        if user_id:
            user = User.objects.filter(id=user_id).last()
            return JsonResponse({
                'status': 'success',
                'id': user.id,
                'name': user.get_full_name(),
                'username': user.username,
                'profile_image_url': user.profile_image.url
            })
        else:
            return JsonResponse({
                'status': 'failure',
                'error': 'No user found.'
            })


class StartAudioCall(View):
    def post(self, *args, **kwargs):
        group_id = self.request.POST.get('group_id')
        if not group_id:
            messages.warning(self.request, "Cannot start Video Call! Invalid Group Code")
            return redirect('chat:chat')
        group = GroupChatModel.objects.filter(id=int(group_id)).last()
        if not group:
            messages.warning(self.request, "Group not exist!")
            return redirect('chat:chat')
        if group not in self.request.user.groups.all():
            messages.warning(self.request, "Group not exist!")
            return redirect('chat:chat')
        group_call_history = GroupCallHistory(started_by=self.request.user)
        group_call_history.save()
        context = {}

        context['group'] = group
        context['user'] = self.request.user

        group_name = f"GroupVideoMeeting_{group.id}_{group_call_history.id}"  # use in websocket url
        context['group_name'] = hash(group_name)  # use in websocket url

        context['is_group_creator'] = True

        fernet = Fernet(fernet_key)
        join_url = fernet.encrypt(group_name.encode())
        context['join_url'] = join_url.decode('utf-8')

        return render(self.request, 'chat/audio.html', context)


class AudioCallReceiver(View):
    def get(self, *args, **kwargs):
        encrypted_group = self.kwargs.get('encrypt_group_name')
        context = {}
        context['join_url'] = encrypted_group
        fernet = Fernet(fernet_key)

        encrypted_group = bytes(encrypted_group, 'utf-8')
        group_name = fernet.decrypt(encrypted_group).decode()
        try:
            group_id = group_name.split("_")[1]
            call_history_id = group_name.split("_")[2]
            if not group_id:
                messages.warning(self.request, "Invalid Request!")
                return redirect('chat:chat')
            group = GroupChatModel.objects.filter(id=int(group_id)).last()
            if not group:
                messages.warning(self.request, "Invalid Request!")
                return redirect('chat:chat')
            if group not in self.request.user.groups.all():
                messages.warning(self.request, "Invalid Request!")
                return redirect('chat:chat')

            if not call_history_id:
                messages.warning(self.request, "Invalid Request!")
                return redirect('chat:chat')
            group_call_history = GroupCallHistory.objects.filter(id=int(call_history_id)).last()
            if not group_call_history:
                messages.warning(self.request, "Invalid Request!")
                return redirect('chat:chat')
            if group_call_history.is_end:
                messages.info(self.request, "This Call Has Been Ended By Host.")
                return redirect('chat:chat')
        except Exception as e:
            print(e)
            messages.warning(self.request, "Invalid Request")
            return redirect('chat:chat')

        context['group'] = group
        context['is_group_creator'] = True
        context['user'] = self.request.user
        group_name = f"GroupVideoMeeting_{group.id}_{group_call_history.id}"
        context['group_name'] = hash(group_name)
        return render(self.request, 'chat/audio.html', context)


class EndCall(View):
    def get(self, *args, **kwargs):
        encrypted_group = self.kwargs.get('encrypt_group_name')
        context = {}
        fernet = Fernet(fernet_key)

        encrypted_group = bytes(encrypted_group, 'utf-8')
        group_name = fernet.decrypt(encrypted_group).decode()
        try:
            group_id = group_name.split("_")[1]
            call_history_id = group_name.split("_")[2]
            if not group_id:
                messages.warning(self.request, "Invalid Request!")
                return redirect('chat:chat')
            group = GroupChatModel.objects.filter(id=int(group_id)).last()
            if not group:
                messages.warning(self.request, "Invalid Request!")
                return redirect('chat:chat')
            if group not in self.request.user.groups.all():
                messages.warning(self.request, "Invalid Request!")
                return redirect('chat:chat')

            if not call_history_id:
                messages.warning(self.request, "Invalid Request!")
                return redirect('chat:chat')
            group_call_history = GroupCallHistory.objects.filter(id=int(call_history_id)).last()
            if not group_call_history:
                messages.warning(self.request, "Invalid Request!")
                return redirect('chat:chat')
            if not group_call_history.started_by == self.request.user:
                messages.warning(self.request, "Only host can end up call. You can leave the call")
                return redirect('chat:chat')
            group_call_history.is_end = True
            group_call_history.save()
            messages.success(self.request, "Call ended")
            return redirect('chat:chat')
        except:
            pass
        return redirect('chat:chat')
