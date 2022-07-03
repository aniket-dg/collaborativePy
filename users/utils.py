from django.conf import settings
from django.core.mail import EmailMessage
from django.contrib import messages

# Verification email
from django.urls import reverse_lazy
from django.contrib.sites.shortcuts import get_current_site
from django.template.loader import render_to_string
from django.utils.http import urlsafe_base64_encode
from django.utils.encoding import force_bytes
from django.contrib.auth.tokens import default_token_generator

# Social Pipeline for USERNAME_FIELD='email'
from django.contrib.auth import get_user_model
from social_core.pipeline.user import get_username as social_get_username
import uuid


def send_welcome_mail(request, message, user):
    email_subject = 'Welcome to Company Name'
    email_body = 'Hi ' + user.first_name + ', '
    email = EmailMessage(
        email_subject,
        email_body,
        settings.AUTH_USER_MODEL,
        [user.email],
    )
    email.content_subtype = "html"
    email.send(fail_silently=False)
    messages.success(request, message)


def send_email_verification_mail(request, user):
    current_site = get_current_site(request)
    mail_subject = 'Please activate your account.'
    activation_link = reverse_lazy('user:activate', kwargs={
        'uidb64': urlsafe_base64_encode(force_bytes(user.pk)),
        'token': default_token_generator.make_token(user)
    })
    user_link = f'http://{current_site}{activation_link}'

    html_message = render_to_string('users/email_verification.html', {
        'username': user.username,
        'user_link': user_link,
    })
    to_email = user.email
    send_email = EmailMessage(mail_subject, html_message, to=[to_email])
    send_email.content_subtype = 'html'
    send_email.send()


def pipeline_send_verification_email(strategy, details, user=None, is_new=False, *args, **kwargs):
    if user:
        # acitvate if user from social authenticated
        user.is_active = True
        # send_email_verification_mail(strategy.request, user)
    return


def get_username(strategy, details, user=None, is_new=False, *args, **kwargs):
    result = social_get_username(strategy, details, user=user, *args, **kwargs)
    if is_new:
        username = result['username']
        while get_user_model().objects.filter(username=username).exists():
            username = result['username'] + uuid.uuid4().hex[:10]
        return {'username': username}
    else:
        return result
