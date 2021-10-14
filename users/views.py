from django.contrib import messages
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.mixins import LoginRequiredMixin, UserPassesTestMixin
from django.contrib.messages.views import SuccessMessageMixin
from django.core.exceptions import ObjectDoesNotExist
from django.shortcuts import redirect, render
from django.views import View
from django.views.generic.edit import (
    FormView, UpdateView
)
from .forms import (
    RegistrationForm, LoginForm
)
from .models import User
from .utils import send_welcome_mail


class SignUpView(View):
    def get(self, *args, **kwargs):
        register_form = RegistrationForm()
        context = {
            'register_form': register_form,
        }
        return render(self.request, 'users/form.html', context)

    def post(self, *args, **kwargs):
        register_form = RegistrationForm(self.request.POST)
        if register_form.is_valid():
            register_form.save()
            messages.success(self.request, 'Account successfully created')
            return redirect('login')

        messages.warning(self.request, 'Invalid registration information.')
        return redirect('register')


# Login View
class LoginView(SuccessMessageMixin, FormView):
    form_class = LoginForm
    template_name = 'users/form.html'
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
                    return redirect('order:checkout')
                return redirect('home:home')
            else:
                messages.warning(self.request, 'Your account is not active, Please contact Support!')
                return redirect('login')

        if not user_query.is_active:
            messages.warning(self.request, 'Your account is not active, Please contact Support!')
            return redirect('login')
        else:
            messages.warning(self.request, 'Email or Password is incorrect')
            return redirect('login')


# User logout view
class LogoutView(View):
    def get(self, *args, **kwargs):
        logout(self.request)
        self.request.session.flush()
        return redirect('/')


# User Update View
class UserUpdateView(LoginRequiredMixin, UserPassesTestMixin, SuccessMessageMixin, UpdateView):
    model = User
    fields = ['email', 'name', 'phone_number']
    template_name = 'users/profile.html'
    success_message = 'Profile successfully updated'

    def test_func(self):
        model = self.get_object()
        return self.request.user == model

