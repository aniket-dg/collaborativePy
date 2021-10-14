from __future__ import unicode_literals
from django.core.mail import send_mail
from django.contrib.auth.models import PermissionsMixin
from django.contrib.auth.base_user import AbstractBaseUser
from django.db import models
from django.shortcuts import reverse
from django.utils.translation import gettext_lazy as _

from .managers import UserManager


class User(AbstractBaseUser, PermissionsMixin):
    # Required
    email = models.EmailField(_('Email'), unique=True, max_length=320, help_text='Provide an email for registration')

    # Optional
    phone_number = models.BigIntegerField(help_text='Provide an mobile number with country code!', unique=True,
                                          null=True, blank=True)
    name = models.CharField(_('Name'), max_length=200, null=True, blank=True)

    # Django
    date_joined = models.DateTimeField(_('date joined'), auto_now_add=True)
    is_active = models.BooleanField(_('active'), default=True)
    is_verified = models.BooleanField(_('verified'), default=False)
    is_staff = models.BooleanField(_('staff'), default=False)

    objects = UserManager()

    USERNAME_FIELD = 'email'
    EMAIL_FIELD = 'email'
    REQUIRED_FIELDS = ['phone_number']

    class Meta:
        verbose_name = _('user')
        verbose_name_plural = _('users')

    def __str__(self):
        return self.email

    def get_absolute_url(self):
        return reverse("update", kwargs={'pk': self.pk})

    def get_full_name(self):
        return self.name

    def get_short_name(self):
        return self.name

    def email_user(self, subject, message, from_email=None, **kwargs):
        send_mail(subject, message, from_email, [self.email], **kwargs)

