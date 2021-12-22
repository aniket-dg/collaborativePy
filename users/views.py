import json

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

from post.models import Post
from .forms import (
    RegistrationForm, LoginForm, UserUpdateForm
)
from .models import User, Connection
from post.models import Post, FlagInappropriate, BookMark
from .utils import send_welcome_mail


class UserData(LoginRequiredMixin, View):
    def get(self, *args, **kwargs):
        user = self.request.user
        return HttpResponse(
            json.dumps({
                'username': user.username,
                'img': user.get_profile_img()
            }),
            content_type='application/json'
        )


class SignUpView(View):
    def get(self, *args, **kwargs):
        register_form = RegistrationForm()
        context = {
            'register_form': register_form,
        }
        return render(self.request, 'users/user_register.html', context)

    def post(self, *args, **kwargs):
        register_form = RegistrationForm(self.request.POST, self.request.FILES)
        if register_form.is_valid():
            register_form.save()
            messages.success(self.request, 'Account successfully created')
            return redirect('user:login')

        messages.warning(self.request, 'Invalid registration information.')
        return redirect('user:register')


# Login View
class LoginView(SuccessMessageMixin, FormView):
    form_class = LoginForm
    template_name = 'users/login.html'
    success_url = '/'

    def form_valid(self, form):
        credentials = form.cleaned_data
        user = authenticate(email=credentials['email'],
                            password=credentials['password'])
        # Get the user
        try:
            user_query = User.objects.get(email=credentials['email'])
        except ObjectDoesNotExist:
            messages.warning(self.request, 'Email or Password is incorrect')
            return redirect('login')

        if user is not None:
            if user.is_active:
                login(self.request, user)
                url_redirect = self.request.POST.get('redirect', None)
                if url_redirect:
                    return redirect(url_redirect)
                return redirect('home:home')
            else:
                messages.warning(self.request, 'Your account is not active, Please contact Support!')
                return redirect('user:login')

        if not user_query.is_active:
            messages.warning(self.request, 'Your account is not active, Please contact Support!')
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

class UserFriendProfileView(LoginRequiredMixin, CheckProfile,UserPassesTestMixin, DetailView):
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
        return context

    def test_func(self):
        return True

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

class UserUpdateView(LoginRequiredMixin, UserPassesTestMixin, SuccessMessageMixin, UpdateView):
    model = User
    fields = ['email', 'first_name', 'last_name', 'phone_number', 'bio', 'designation', 'username']
    template_name = 'users/test.html'
    success_message = 'Profile successfully updated'

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


class UserProfileView(LoginRequiredMixin, View):
    def get(self, *args, **kwargs):
        user = self.request.user
        context = {}

        context['bookmark_list'] = []
        context['post_list'] = []
        flags_objs = FlagInappropriate.objects.filter(user=user)
        flags = []
        for flag in flags_objs:
            flags.append(flag.post.id)
        bookmarks = []
        for bookmark in context['bookmark_list']:
            bookmarks.append(bookmark.post.id)
        context['bookmark_list_post_id'] = bookmarks
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
        redirect_url = self.request.META.get('HTTP_REFERER')
        id = self.request.POST.get('id')
        user = self.request.user
        send_request_user = User.objects.filter(id=int(id)).last()
        if send_request_user:
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
            if redirect_url:
                return redirect(redirect_url)
            return redirect('user:profile')
        messages.warning(self.request, "User not found")
        if redirect_url:
            return redirect(redirect_url)
        return redirect('user:profile')


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
            if redirect_url:
                return redirect(redirect_url)
            return redirect('user:profile')
        messages.warning(self.request, "User not found")
        if redirect_url:
            return redirect(redirect_url)
        return redirect('user:profile')


class SendRequest(View):
    def get(self, *args, **kwargs):
        redirect_url = self.request.META.get('HTTP_REFERER')
        user_id = self.kwargs.get('user_id')
        if not user_id:
            messages.warning(self.request, "User not found")
            if redirect_url:
                return redirect(redirect_url)
            return redirect('user:profile')
        user = self.request.user
        send_request_user = User.objects.filter(id=int(user_id)).last()
        if not send_request_user:
            messages.warning(self.request, "User not found")
            if redirect_url:
                return redirect(redirect_url)
            return redirect('user:profile')
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
        if redirect_url:
            return redirect(redirect_url)
        return redirect('user:profile')


class AcceptRequest(View):
    def get(self, *args, **kwargs):
        redirect_url = self.request.META.get('HTTP_REFERER')
        id = self.kwargs.get('id')
        user = self.request.user
        request_user = User.objects.filter(id=int(id)).last()
        request_user_connection = request_user.connections.filter(connection_user=user).last()
        user_pending_connection = user.pending_connections.filter(connection_user=request_user).last()
        if request_user_connection and user_pending_connection:
            request_user_connection.send_request = "Accepted"
            request_user_connection.save()
            user_pending_connection.send_request = "Accepted"
            user_pending_connection.save()
            messages.success(self.request, "Request accepted")
            if redirect_url:
                return redirect(redirect_url)
            return redirect('user:profile')
        messages.warning(self.request, "User not found")
        if redirect_url:
            return redirect(redirect_url)
        return redirect('user:profile')


class AcceptUserRequest(LoginRequiredMixin, View):
    def post(self, *args, **kwargs):
        redirect_url = self.request.META.get('HTTP_REFERER')
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
            messages.success(self.request, "Request accepted")
            if redirect_url:
                return redirect(redirect_url)
            return redirect('user:profile')
        messages.warning(self.request, "User not found")
        if redirect_url:
            return redirect(redirect_url)
        return redirect('user:profile')


# class UnfriendUser(View):
#     def get(self, *args, **kwargs):
#         redirect_url = self.request.META.get('HTTP_REFERER')
#         user_friend_id = self.kwargs.get('pk')
#         user_friend = User.objects.filter(id=user_friend_id).last()
#         user = self.request.user
#         if not user_friend:
#             messages.warning(self.request, "User not found")
#             if redirect_url:
#                 return redirect(redirect_url)
#             return redirect('user:profile')
#         if user_friend not in user.connections.all():
#             messages.warning(self.request, "User not found")
#             if redirect_url:
#                 return redirect(redirect_url)
#             return redirect('user:profile')
#         user.connections.remove(user_friend)
#         user.save()
#         if user in user_friend.connections.all():
#             user_friend.connections.remove(user)
#             user_friend.save()
#         messages.success(self.request, "User removed from your friend list")
#         if redirect_url:
#             return redirect(redirect_url)
#         return redirect('user:profile')


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


class LoadMoreFriends(LoginRequiredMixin, View):
    def get(self, *args, **kwargs):
        user = self.request.user
        connected_users = user.get_user_connected_users()
        p = Paginator(connected_users, 2)
        current_status = int(self.request.GET['current_friends'])
        if p.count <= current_status:
            return JsonResponse({
                'Status': False,
                'Message': 'No more friends!...'
            })
        new_friends = list(p.get_page((current_status + 2) / 2))
        friends = []
        for item in new_friends:
            if not item.profile_image:
                profile = "https://e7.pngegg.com/pngimages/798/436/png-clipart-computer-icons-user-profile-avatar-profile-heroes-black.png"
            else:
                profile = item.profile_image.url
            friends.append({
                'username': item.username,
                'name': item.first_name + " " + item.last_name,
                'profile': profile,
                'user_id': item.id,
            })
        return JsonResponse({'friends': friends})


class UsersAndPostsSearchView(LoginRequiredMixin, View):
    def get(self, *args, **kwargs):
        query = self.request.GET.get('query')
        current_user = self.request.user
        user_list = []
        post_list = []
        users = User.objects.filter(username__icontains=query)
        # posts = Post.objects.filter(description__icontains=query)
        print(users)

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
                'profile_image_url': user.profile_image.url,
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