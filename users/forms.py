from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.core.exceptions import ValidationError
from django.core.validators import validate_email
from django.utils.translation import gettext_lazy as _

from .models import User


class LoginForm(forms.Form):
    email = forms.CharField(label='email')
    password = forms.CharField(label='Password', widget=forms.PasswordInput)


class EmailForm(forms.Form):
    email = forms.CharField(label='email')


class RegistrationForm(UserCreationForm):
    class Meta(UserCreationForm.Meta):
        model = User
        fields = (
            'email', 'first_name', 'last_name', 'username', 'profile_image', 'bio', 'designation', 'password1',
            'password2')

    def clean(self):
        super(RegistrationForm, self).clean()
        username = self.cleaned_data.get('username')
        if len(username.split(" ")) > 1:
            self.add_error('username', "Username must not contain any space.")


class UserUpdateForm(forms.ModelForm):
    class Meta:
        model = User
        fields = ('email', 'first_name', 'last_name', 'bio', 'designation')

    def clean_email(self):
        email = self.cleaned_data['email']
        try:
            validate_email(email)
        except ValidationError:
            raise ValidationError(
                _(f'{email} is not an valid email'))

        try:
            email = User.objects.exclude(pk=self.instance.pk).get(email=email)
        except User.DoesNotExist:
            return email
        raise forms.ValidationError('email "%s" is already in use.' % email)
