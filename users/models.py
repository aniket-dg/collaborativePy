from __future__ import unicode_literals

from datetime import datetime

from django.core.mail import send_mail
from django.contrib.auth.models import PermissionsMixin
from django.contrib.auth.base_user import AbstractBaseUser
from django.db import models
from django.shortcuts import reverse
from django.utils.translation import gettext_lazy as _

from .managers import UserManager


class User(AbstractBaseUser, PermissionsMixin):
    # Required
    username = models.CharField(_('User Name'), max_length=200, null=True, blank=True)
    email = models.EmailField(_('Email'), unique=True, max_length=320, help_text='Provide an email for registration')

    # Optional
    phone_number = models.BigIntegerField(help_text='Provide an mobile number with country code!', unique=True,
                                          null=True, blank=True)
    name = models.CharField(_('Name'), max_length=200, null=True, blank=True)

    payment = models.ForeignKey('order.Payment', on_delete=models.SET_NULL, null=True, blank=True)
    connections = models.ManyToManyField('users.Connection', blank=True)
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

    def is_plan_available(self):
        if self.payment:
            if not self.payment.paid:
                return False
            return True
        return False

    def is_plan_valid(self):
        if self.payment:
            if not self.payment.paid:
                return False
            now = datetime.now().date()
            now = datetime(day=now.day - 1, month=now.month, year=now.year).date()
            if now < self.payment.valid_till:
                return True
        return False

    def remaining_days(self):
        if self.payment:
            if not self.payment.paid:
                print("Payment fail")
                return 0
            now = datetime.now().date()
            now = datetime(day=now.day - 1, month=now.month, year=now.year).date()
            days = (self.payment.valid_till - now).days
            if days >= 0:
                return days
            else:
                return 0
        return 0


REQUEST_CHOICES = (
    ('Accept', 'Accept'),
    ('Decline', 'Decline'),
)


class Connection(models.Model):
    connection_user = models.ForeignKey(User, on_delete=models.CASCADE)
    send_request = models.CharField(max_length=10, choices=REQUEST_CHOICES, null=True, blank=True)
    received_request = models.CharField(max_length=10, choices=REQUEST_CHOICES, null=True, blank=True)

    def __str__(self):
        return self.connection_user.username
