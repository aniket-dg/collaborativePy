import glob
import json
from django.core.mail import EmailMessage

from django.contrib import messages
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.mixins import LoginRequiredMixin, UserPassesTestMixin
from django.contrib.messages.views import SuccessMessageMixin
from django.core.exceptions import ObjectDoesNotExist
from django.core.paginator import Paginator
from django.http import HttpResponse, JsonResponse
from django.shortcuts import redirect, render
from django.views import View
from django.views.generic import ListView, DetailView
from django.views.generic.edit import (
    FormView, UpdateView
)
from django.urls import reverse

from company.utils import decrypt_string
from home.models import PopUpQuestions
from post.models import Post
from stellar_ai import settings
from .forms import (
    RegistrationForm, LoginForm, UserUpdateForm
)
from django.utils.http import urlsafe_base64_decode
from .models import User, Connection, CodeRoomSize
from post.models import Post, FlagInappropriate, BookMark
from .utils import send_welcome_mail, send_email_verification_mail
from django.contrib.auth.tokens import default_token_generator
from social_django.models import UserSocialAuth
from chat.models import GroupChatModel, GroupCallHistory, UserNewNotification

from .api import send_notification


class UserData(LoginRequiredMixin, View):
    def get(self, *args, **kwargs):
        user = self.request.user
        if user.is_peer_share:
            peer = User.objects.filter(id=user.peer_id).last()
            if peer and peer in user.get_user_connected_users():
                x = user if user.id > peer.id else peer
                y = peer if peer.id < user.id else user
                coderoom = CodeRoomSize.objects.filter(first_user=x, second_user=y).last()
                if not coderoom:
                    coderoom = CodeRoomSize(first_user=x, second_user=y)
                    coderoom.save()

                return HttpResponse(
                    json.dumps({
                        'username': coderoom.group_name
                    })
                )
        if user.is_group_share:
            group_id = user.group_id_share
            group = GroupChatModel.objects.filter(id=int(group_id)).last()
            if not group and group not in user.groups.all():
                coderoom = CodeRoomSize.objects.filter(first_user = user).last()
                if not coderoom:
                    coderoom = CodeRoomSize(first_user=user)
                    coderoom.save()

                return HttpResponse(
                    json.dumps({
                        'username': coderoom.group_name
                    }),
                    content_type='application/json'
                )
            return HttpResponse(
                json.dumps({
                    'username': group.name
                }),
                content_type='application/json'
            )
        coderoom = CodeRoomSize.objects.filter(first_user=user).last()
        if not coderoom:
            coderoom = CodeRoomSize(first_user=user)
            coderoom.save()
        return HttpResponse(
            json.dumps({
                'username': coderoom.group_name
            }),
            content_type='application/json'
        )


class SaveSessionForNotebook(LoginRequiredMixin, View):
    def get(self, *args, **kwargs):
        group_id = self.request.GET.get('group_id')
        group_share = self.request.GET.get('group_share')

        user_id = int(self.request.GET.get('user_id'))
        session = self.request.session
        user = self.request.user
        print(group_id, group_share, user_id, "Aniket")
        if user_id:
            request_user = User.objects.filter(id=user_id).last()
            if request_user and request_user in self.request.user.get_user_connected_users():
                user.is_peer_share = True
                user.is_group_share = False
                user.peer_id = request_user.id
                user.save()
                return redirect("https://jupyter.stellar-ai.in/jupyter/")
        if group_share and group_id:
            user.is_group_share = True
            user.is_peer_share = False
            user.group_id_share = group_id
            user.save()
        else:
            user.is_group_share = False
            user.is_peer_share = False
            user.group_id_share = ''
            user.save()
        return redirect("https://jupyter.stellar-ai.in/jupyter/")
        # return redirect("https://www.google.com/jupyter/")


class OpenNotebook(LoginRequiredMixin, View):
    def get(self, *args, **kwargs):

        group_id = int(self.request.GET.get('group_id'))
        group_share = self.request.GET.get('group_share')
        user = self.request.user
        group = GroupChatModel.objects.get(id=group_id)
        if group and group in self.request.user.groups.all():
            if not group.is_valid():
                return redirect('chat:chat')

        group_name_url = None
        call_active = False
        if group_id and group_share:
            user.is_group_share = True
            user.is_peer_share = False
            user.group_id_share = group_id
            user.save()
            if group and group.company:
                if group.is_coderoom_full():
                    messages.warning(self.request, "Code Room Storage is full!")
                    return redirect('chat:chat')
        else:
            user.is_group_share = False
            user.is_peer_share = False
            user.group_id_share = ''
            user.save()

        try:
            group_call_history = GroupCallHistory.objects.filter(is_end=False).last()
            group_name = f"GroupVideoMeeting_{group.id}_{group_call_history.id}"  # use in websocket url
            group_name_url = hash(group_name)  # use in websocket url
            call_active = True
        except AttributeError as e:
            print(e)
        session = self.request.session
        user = self.request.user
        context = {
            'group_id': group_id,
            'group_share': group_share,
            'group_name': group.group_name,
            'group': group,
            'group_name_url': group_name_url,
            'call_active': call_active,
            'join_url': group_name_url
        }
        print(context)

        return render(self.request, "users/notebook.html", context)


class OpenChatNotebook(LoginRequiredMixin, View):
    def get(self, *args, **kwargs):
        user = self.request.user
        user_id = int(self.request.GET.get('user_id'))
        request_user = User.objects.filter(id=user_id).last()
        if not request_user:
            messages.warning(self.request, "User does not exist!")
            return redirect('chat:chat')
        if request_user not in user.get_user_connected_users():
            messages.warning(self.request, "User not Found!")
            return redirect('chat:chat')
        if not user.is_coderoom_valid(request_user):
            messages.warning(self.request, "Code Room Storage is full!")
            return redirect('chat:chat')
        if user_id:
            request_user = User.objects.filter(id=user_id).last()
            if request_user and request_user in self.request.user.get_user_connected_users():
                user.is_peer_share = True
                user.is_group_share = False
                user.peer_id = request_user.id
                user.save()
        a, b = min(user.id, request_user.id), max(user.id, request_user.id)
        user_url = f"P2pVideoMeeting_{a}_{b}"
        meeting_url = hash(user_url)
        context = {
            'receiver_id': request_user.id,
            'receiver': request_user,
            'join_url': meeting_url,
            'call_active': True,
            'user': user
        }

        return render(self.request, 'users/user_notebook.html', context)


class SignUpView(View):
    def get(self, *args, **kwargs):
        if self.request.user.is_authenticated:
            return redirect('post:post')
        register_form = RegistrationForm()
        context = {
            'register_form': register_form,
        }
        return render(self.request, 'users/user_register.html', context)

    def post(self, *args, **kwargs):
        register_form = RegistrationForm(self.request.POST, self.request.FILES)
        if register_form.is_valid():
            user = register_form.save()
            if len(user.username.split(" ")) > 1:
                user.username = user.username.replace(" ", "")
            user.save()
            send_email_verification_mail(self.request, user)
            messages.success(self.request,
                             'Thank you for registering with us. We have mailed you a verification link to activate your account.')
            return redirect('user:login')

        messages.warning(self.request, 'Invalid registration information.')
        return redirect('user:register')


class CompanySignUpView(View):
    def get(self, *args, **kwargs):
        if self.request.user.is_authenticated:
            messages.warning(self.request, "Logged in user can't sign up")
            return redirect('chat:chat')
        register_form = RegistrationForm()
        context = {
            'register_form': register_form,
        }
        return render(self.request, 'users/user_register.html', context)

    def post(self, *args, **kwargs):
        register_form = RegistrationForm(self.request.POST, self.request.FILES)
        if register_form.is_valid():
            user = register_form.save()
            if len(user.username.split(" ")) > 1:
                user.username = user.username.replace(" ", "")
            #Todo: comment below line to send activation link to user
            user.is_active = True
            if self.request.GET.get('code'):
                enc_link = self.request.GET.get('code')
                dec_link = decrypt_string(enc_link)
                user_id = dec_link.split("_")[1] if len(dec_link.split("_")) > 1 else None
                company_user = User.objects.filter(id=int(user_id)).last()
                if user_id and company_user:
                    user.user_type = "Company_User"
                    user.company = company_user.company
                    user.is_active = True
                    user.save()
                else:
                    messages.warning(self.request, "Invalid registration Link, Contact to your Company's Superuser")
                    return redirect('user:login')
            else:
                user.user_type = "Company_User"
                user.is_company_admin = True
                user.save()
                user.is_active = True
                user.is_verified = True
                send_email_verification_mail(self.request, user)

                messages.success(self.request,
                             'Thank you for registering with us. We have mailed you a verification link to activate your account.')
            return redirect('user:login')
        messages.warning(self.request, 'Invalid registration information.')
        return redirect('user:register')



class UserAccountActivateView(View):
    def get(self, *args, **kwargs):
        try:
            uidb64 = kwargs['uidb64']
            token = kwargs['token']
            uid = urlsafe_base64_decode(uidb64).decode()
            user = User._default_manager.get(pk=uid)
        except(TypeError, ValueError, OverflowError, User.DoesNotExist):
            user = None

        if user is not None and default_token_generator.check_token(user, token):
            user.is_active = True
            user.save()
            messages.success(self.request, 'Congratulations! Your account is activated.')
            return redirect('user:login')
        else:
            messages.error(self.request, 'Invalid activation link')
            return redirect('user:register')


class RedirectProfileRegister:
    def dispatch(self, request, *args, **kwargs):
        user = request.user
        if user.is_authenticated:
            if not user.username or not user.profile_image:
                user_social_auth = UserSocialAuth.objects.filter(user=user, provider='google-oauth2').exists()
                if user_social_auth:
                    return render(request, 'users/oauth_register.html')
                else:
                    return super().dispatch(request, *args, **kwargs)
            else:
                return super().dispatch(request, *args, **kwargs)
        return super().dispatch(request, *args, **kwargs)


class GoogleOAuthSignUpView(LoginRequiredMixin, View):
    def get(self, *args, **kwargs):
        user = self.request.user
        user_social_auth = UserSocialAuth.objects.filter(user=user, provider='google-oauth2').exists()
        if user_social_auth:
            return render(self.request, 'users/oauth_register.html')
        else:
            return redirect('user:login')

    def post(self, *args, **kwargs):
        # return HttpResponse(self.request.POST)
        user = self.request.user
        user.username = self.request.POST.get('username', None)
        if user.username:
            user.username = user.username.replace(" ", "")
        user.designation = self.request.POST.get('designation', None)
        user.bio = self.request.POST.get('bio', None)
        user.profile_image = self.request.FILES.get('profile_image', None)
        try:
            user.save()
            messages.success(self.request, 'Account details saved.')
            return redirect('home:home')
        except Exception as e:
            # print(e)
            messages.error(self.request, 'Username already taken.')
            return render(self.request, 'users/oauth_register.html')


# Login View
class LoginView(SuccessMessageMixin, FormView):
    form_class = LoginForm
    success_url = '/'

    def get(self, *args, **kwargs):
        if self.request.user.is_authenticated:
            if self.request.GET.get('next'):
                return redirect(self.request.GET.get('next'))
            if self.request.user.user_type == 'Company_User':
                return redirect('company:home')
            return redirect('post:post')
        return render(self.request, 'users/login.html')

    def form_valid(self, form):
        credentials = form.cleaned_data
        user = authenticate(email=credentials['email'],
                            password=credentials['password'])
        # Get the user
        try:
            user_query = User.objects.get(email=credentials['email'])
        except ObjectDoesNotExist:
            messages.warning(self.request, 'Email or Password is incorrect')
            return redirect('user:login')

        if user is not None:
            if user.is_active:
                popup = None
                popup_question = PopUpQuestions.objects.filter(session_key=self.request.session.session_key).last()
                if popup_question:
                    if popup_question.user:
                        pass
                    else:
                        popup = popup_question
                login(self.request, user)
                if popup:
                    popup.user = self.request.user
                    popup.save()
                url_redirect = self.request.POST.get('redirect', None)
                if url_redirect:
                    return redirect(url_redirect)
                if self.request.GET.get('next'):
                    return redirect(self.request.GET.get('next'))
                if self.request.user.user_type == 'Company_User':
                    return redirect('company:home')
                return redirect('home:home')
            else:
                messages.warning(self.request,
                                 'Your account is not active, check your mail for activation link or contact support!')
                return redirect('user:login')

        if not user_query.is_active:
            messages.warning(self.request,
                             'Your account is not active, check your mail for activation link or contact support!')
            return redirect('user:login')
        else:
            messages.warning(self.request, 'Email or Password is incorrect')
            return redirect('user:login')


# User logout view
class LogoutView(View):
    def get(self, *args, **kwargs):
        logout(self.request)
        self.request.session.flush()
        return redirect('/')


# class UserProfileView(LoginRequiredMixin, View):
#     def get(self, *args, **kwargs):
#         user = self.request.user
#         context = {}
#
#         context['bookmark_list'] = BookMark.objects.filter(user=user)
#         context['post_list'] = Post.objects.filter(user=user)
#         context['user'] = user
#         context['form'] = UserUpdateForm(instance=user)
#
#         return render(self.request, 'users/profile.html', context)


class CheckProfile:
    def dispatch(self, request, *args, **kwargs):
        if request.user.id == self.kwargs.get('pk'):
            return redirect('user:profile')
        return super().dispatch(request, *args, **kwargs)


class UserFriendProfileView(LoginRequiredMixin, CheckProfile, UserPassesTestMixin, DetailView):
    model = User
    template_name = 'users/profile.html'

    def get_context_data(self, **kwargs):
        context = super(UserFriendProfileView, self).get_context_data(**kwargs)
        user = self.get_object()

        context['user_friend'] = True
        context['post_list'] = Post.objects.filter(user=user)
        context['profile_user'] = user
        context['form'] = UserUpdateForm(instance=user)
        connected_users = user.get_user_connected_users()
        context['connected_users'] = connected_users
        context['request_already_sent'] = user.pending_connections.filter(connection_user=self.request.user).exists()
        return context

    def test_func(self):
        return True


class UserUpdateView(LoginRequiredMixin, UserPassesTestMixin, SuccessMessageMixin, UpdateView):
    model = User
    fields = ['email', 'first_name', 'last_name', 'phone_number', 'bio', 'designation']
    template_name = 'users/profile.html'
    success_message = 'Profile successfully updated'

    def form_valid(self, form):
        user = form.instance
        user.save()
        redirect_url = self.request.META.get('HTTP_REFERER')
        if redirect_url:
            return redirect(redirect_url)
        return redirect('user:profile')

    def form_invalid(self, form):
        redirect_url = self.request.META.get('HTTP_REFERER')
        if redirect_url:
            return redirect(redirect_url)
        return redirect('user:profile')

    def test_func(self):
        model = self.get_object()
        return self.request.user == model


class UserProfileImageUpdateView(LoginRequiredMixin, UserPassesTestMixin, SuccessMessageMixin, UpdateView):
    model = User
    fields = ['profile_image']
    success_message = 'Profile image successfully updated'

    def form_valid(self, form):
        user = form.instance
        user.save()
        redirect_url = self.request.META.get('HTTP_REFERER')
        if redirect_url:
            return redirect(redirect_url)
        return redirect('user:profile')

    def form_invalid(self, form):
        return HttpResponse(form.errors.as_json())

    def test_func(self):
        model = self.get_object()
        return self.request.user == model


class BookMarkListView(LoginRequiredMixin, ListView):
    model = BookMark
    template_name = 'users/user_bookmarks.html'

    def get_queryset(self):
        user = self.request.user
        return BookMark.objects.filter(user=user)


class UserProfileView(LoginRequiredMixin, RedirectProfileRegister, View):
    def get(self, *args, **kwargs):
        user = self.request.user
        context = {}

        context['bookmark_list'] = BookMark.objects.filter(user=user)
        context['post_list'] = Post.objects.filter(user=user)
        flags_objs = FlagInappropriate.objects.filter(user=user)
        flags = []
        for flag in flags_objs:
            flags.append(flag.post.id)
        bookmarks = []
        skeleton_bookmarks = []
        for bookmark in context['bookmark_list']:
            if bookmark.post:
                bookmarks.append(bookmark.post.id)
            else:
                skeleton_bookmarks.append(bookmark.skeleton_post.id)
        context['bookmark_list_post_id'] = bookmarks
        context['skeleton_bookmark_list_post_id'] = skeleton_bookmarks

        context['flag_list'] = flags
        context['profile_user'] = user
        connected_users = user.get_user_connected_users()
        requested_users = user.get_user_requested_users()
        received_users = user.get_user_received_users()
        remaining_users = user.get_remaining_users()
        context['connected_users'] = connected_users
        context['requested_users'] = requested_users
        context['received_users'] = received_users
        context['remaining_users'] = remaining_users
        context['form'] = UserUpdateForm(instance=user)
        return render(self.request, 'users/profile.html', context)


class SendUserRequest(LoginRequiredMixin, View):
    def post(self, *args, **kwargs):
        id = self.request.POST.get('id')
        user = self.request.user
        send_request_user = User.objects.filter(id=int(id)).last()
        is_connection = send_request_user.pending_connections.filter(connection_user=user).exists()
        if send_request_user and not is_connection:
            connection = Connection()
            connection.connection_user = send_request_user
            connection.request = True
            connection.save()
            receive_connection = Connection()
            receive_connection.connection_user = user
            receive_connection.request = True
            receive_connection.save()
            user.connections.add(connection)
            send_request_user.pending_connections.add(receive_connection)
            send_request_user.save()
            user.save()
            extra = {
                'title': 'New friend request!',
                'url': reverse('user:profile')
                # 'icon': self.request.build_absolute_uri(user.get_profile_img()),
            }
            send_notification([send_request_user.id], f'Request from {user.get_full_name()}', extra)
            # messages.success(self.request, "Request sent")
            # return redirect('user:profile')
            return JsonResponse({
                'status': 'success',
                'data': 'Friend Request Sent!'
            })
        if is_connection:
            return JsonResponse({
                'status': 'failure',
                'data': 'Already requested'
            })
        # messages.warning(self.request, "User not found")
        # return redirect('user:profile')
        return JsonResponse({
            'status': 'failure',
            'error': 'User not found.'
        })


class UserConnection(LoginRequiredMixin, View):
    def get(self, *args, **kwargs):
        context = {}
        user = self.request.user
        connected_users = user.get_user_connected_users()
        requested_users = user.get_user_requested_users()
        received_users = user.get_user_received_users()
        remaining_users = user.get_remaining_users()
        context['connected_users'] = connected_users
        context['requested_users'] = requested_users
        context['received_users'] = received_users
        context['remaining_users'] = remaining_users

        return render(self.request, 'users/connections.html', context)

    def post(self, *args, **kwargs):
        redirect_url = self.request.META.get('HTTP_REFERER')
        id = self.request.POST.get('id')
        user = self.request.user
        send_request_user = User.objects.filter(id=int(id)).last()
        if send_request_user:
            user_present = send_request_user.pending_connections.filter(connection_user=user).last()
            if user_present:
                messages.warning(self.request, "Request already sent to user")
                if redirect_url:
                    return redirect(redirect_url)
                return redirect('user:profile')
            connection = Connection()
            connection.connection_user = send_request_user
            connection.request = True
            connection.save()
            receive_connection = Connection()
            receive_connection.connection_user = user
            receive_connection.request = True
            receive_connection.save()
            user.connections.add(connection)
            send_request_user.pending_connections.add(receive_connection)
            send_request_user.save()
            user.save()
            messages.success(self.request, "Request sent")
            return redirect('user:profile')
        messages.warning(self.request, "User not found")
        return redirect('user:profile')


class AcceptUserRequest(LoginRequiredMixin, View):
    def post(self, *args, **kwargs):
        id = self.request.POST.get('id')
        user = self.request.user
        request_user = User.objects.filter(id=int(id)).last()
        request_user_connection = request_user.connections.filter(connection_user=user).last()
        user_pending_connection = user.pending_connections.filter(connection_user=request_user).last()
        # print(request_user_connection, user_pending_connection)
        if request_user_connection and user_pending_connection:
            request_user_connection.send_request = "Accepted"
            request_user_connection.save()
            user_pending_connection.send_request = "Accepted"
            user_pending_connection.save()
            # messages.success(self.request, "Request accepted")
            # return redirect('user:profile')
            extra = {
                'title': 'Request accepted!',
                'url': reverse('chat:chat')
            }
            send_notification([request_user.id], f'You are now friends with {user.get_full_name()}', extra)
            save_notification_for_user(request_user, self.request.user)
            return JsonResponse({
                'status': 'success',
                'data': 'Request accepted!'
            })
        # messages.warning(self.request, "User not found")
        # return redirect('user:profile')
        return JsonResponse({
            'status': 'failure',
            'error': 'You did not receive a request from this user.'
        })


class UnfriendUserAJAX(View):
    def post(self, *args, **kwargs):
        user_friend_id = self.request.POST.get('pk')
        user_friend = User.objects.filter(id=user_friend_id).last()
        user = self.request.user
        if not user_friend or (user_friend not in user.get_user_connected_users()):
            return JsonResponse({
                'status': 'failure',
                'error': 'User not found'
            })
        if user_friend in user.get_user_connected_users() or user in user_friend.get_user_connected_users():
            user.connections.remove(*user.connections.filter(connection_user=user_friend))
            user.pending_connections.remove(*user.pending_connections.filter(connection_user=user_friend))
            user_friend.connections.remove(*user_friend.connections.filter(connection_user=user))
            user_friend.pending_connections.remove(*user_friend.pending_connections.filter(connection_user=user))

            user.save()
            user_friend.save()
            return JsonResponse({
                'status': 'success',
                'data': 'User removed from your friend list'
            })
        return JsonResponse({
            'status': 'failure',
            'error': 'User not found'
        })


class UnfriendUser(View):
    def get(self, *args, **kwargs):
        redirect_url = self.request.META.get('HTTP_REFERER')
        user_friend_id = self.kwargs.get('pk')
        user_friend = User.objects.filter(id=user_friend_id).last()
        user = self.request.user
        if not user_friend:
            messages.warning(self.request, "User not found")
            if redirect_url:
                return redirect(redirect_url)
            return redirect('user:profile')
        if user_friend not in user.get_user_connected_users():
            messages.warning(self.request, "User not found")
            if redirect_url:
                return redirect(redirect_url)
            return redirect('user:profile')
        if user_friend in user.get_user_connected_users() or user in user_friend.get_user_connected_users():
            user.connections.remove(*user.connections.filter(connection_user=user_friend))
            user.pending_connections.remove(*user.pending_connections.filter(connection_user=user_friend))
            user_friend.connections.remove(*user_friend.connections.filter(connection_user=user))
            user_friend.pending_connections.remove(*user_friend.pending_connections.filter(connection_user=user))

            user.save()
            user_friend.save()
        messages.success(self.request, "User removed from your friend list")
        if redirect_url:
            return redirect(redirect_url)
        return redirect('user:profile')


# class PasswordChangeDoneView(LoginRequiredMixin, )

class UsersAndPostsSearchView(LoginRequiredMixin, View):
    def get(self, *args, **kwargs):
        query = self.request.GET.get('query')
        current_user = self.request.user
        user_list = []
        post_list = []
        users = User.objects.filter(username__icontains=query)
        # posts = Post.objects.filter(description__icontains=query)
        # print(users)

        for user in users:
            # 0 -> Not Friend, 1 -> Already sent request, 2 -> Already Friend
            is_friend = 0
            if user.pending_connections.filter(connection_user=current_user).exists():
                is_friend = 1
            elif current_user.get_user_connected_users().filter(id=user.id).exists() or user == current_user:
                is_friend = 2
            user_list.append({
                'id': user.id,
                'name': user.get_full_name(),
                'username': user.username,
                'profile_image_url': user.get_profile_img(),
                'is_friend': is_friend
            })
        # for post in posts:
        #     post_list.append({
        #         'id': post.id,
        #         'description': post.description,
        #         'author': post.user.username,
        #         'author_image': post.user.profile_image.url,
        #         'image': post.image1.url,
        #         'language': post.language,
        #     })
        return JsonResponse({
            'user_list': user_list,
            'post_list': post_list
        })


class LoadMoreFriends(LoginRequiredMixin, View):
    def get(self, *args, **kwargs):
        user_type = self.request.GET.get('profile_user_id')
        user = User.objects.filter(id=int(user_type)).last()
        if not user:
            user = self.request.user
        connected_users = user.get_user_connected_users()
        p = Paginator(connected_users, 10)
        current_status = int(self.request.GET['current_friends'])
        if p.count <= current_status:
            return JsonResponse({
                'Status': False,
                'Message': 'No more friends!...'
            })
        new_friends = list(p.get_page((current_status + 10) / 10))
        friends = []
        for item in new_friends:
            if not item.profile_image:
                profile = "https://e7.pngegg.com/pngimages/798/436/png-clipart-computer-icons-user-profile-avatar-profile-heroes-black.png"
            else:
                profile = item.profile_image.url
            friends.append({
                'username': item.username,
                'name': item.get_full_name(),
                'profile_image_url': profile,
                'profile_link': reverse('user:friend-profile', kwargs={'pk': item.id}),
                'user_id': item.id,
            })
        return JsonResponse({'friends': friends})


def save_notification_for_user(user_id, self_user):
    user = User.objects.filter(email=user_id).last()
    if user:
        user_notification = UserNewNotification.objects.filter(user=user).last()
        if not user_notification:
            user_notification = UserNewNotification(user=user)
            user_notification.save()
        user_notification.friends.add(self_user)
        user_notification.save()


def send_mail(request, user, message):
    email = EmailMessage(
        f'Status',
        message,
        settings.EMAIL_HOST_USER,
        [user.email],
    )
    email.content_subtype = "html"
    email.send(fail_silently=False)


class SendTempMail(View):
    def get(self, *args, **kwargs):
        user = self.request.user
        send_mail(self.request, user, "Test Message")
        return HttpResponse("Message sent")

class GetCodeRoomSize(View):
    def get(self, *args, **kwargs):
        first_id = self.kwargs.get('first_id')
        second_id = self.kwargs.get('second_id')
        first_user = User.objects.filter(id=first_id).last()
        second_user = User.objects.filter(id=second_id).last()
        if not first_user or not second_user:
            return JsonResponse({
                'status': False,
                "msg": "User not found"
            })
        coderoom = first_user.get_coderoom(second_user)
        coderoom.get_size()

        coderoom_size = first_user.get_coderoom_size(second_user)

        return JsonResponse({
            'status': True,
            "available_size": str(coderoom_size),
            "coderoom_size": str(coderoom.room_size) if coderoom else 0
        })


class GetGroupRoomSize(View):
    def get(self, *args, **kwargs):
        group_id = self.kwargs.get('group_id')
        group = GroupChatModel.objects.filter(id=group_id).last()
        if not group:
            return JsonResponse({
                'status': False,
                "msg": "Group not found"
            })
        group.get_size()
        coderoom_size = group.get_available_size()
        return JsonResponse({
            'status': True,
            "available_size": str(coderoom_size),
            "coderoom_size": str(group.room_size)
        })

