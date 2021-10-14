from django.conf import settings
from django.core.mail import EmailMessage
from django.contrib import messages


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



