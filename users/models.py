from __future__ import unicode_literals

from datetime import datetime

from django.core.mail import send_mail
from django.contrib.auth.models import PermissionsMixin
from django.contrib.auth.base_user import AbstractBaseUser
from django.db import models
from django.db.models import Q
from django.shortcuts import reverse
from django.utils.translation import gettext_lazy as _

from chat.models import GroupChatModel
from post.models import Post
from .managers import UserManager
from django.utils import timezone

from home.signals import process_files

@process_files(['profile_image'])
class User(AbstractBaseUser, PermissionsMixin):
    # Required
    username = models.CharField(_('User Name'), unique=True, max_length=200)
    email = models.EmailField(_('Email'), unique=True, max_length=320, help_text='Provide an email for registration')

    # Optional
    phone_number = models.BigIntegerField(help_text='Provide an mobile number with country code!', unique=True,
                                          null=True, blank=True)
    account_type = models.CharField(max_length=100, null=True, blank=True)
    first_name = models.CharField(_('First Name'), max_length=200, null=True, blank=True)
    last_name = models.CharField(_('Last Name'), max_length=200, null=True, blank=True)
    designation = models.CharField(max_length=300, null=True, blank=True)
    bio = models.TextField(max_length=300, null=True, blank=True)
    profile_image = models.ImageField(upload_to='profile_image/', null=True, blank=True)

    payment = models.ForeignKey('order.Payment', on_delete=models.SET_NULL, null=True, blank=True)
    connections = models.ManyToManyField('users.Connection', blank=True)
    pending_connections = models.ManyToManyField('users.Connection', blank=True, related_name='pending_user_connections')
    groups = models.ManyToManyField('chat.GroupChatModel', blank=True)
    # Django
    date_joined = models.DateTimeField(_('date joined'), auto_now_add=True)
    is_active = models.BooleanField(_('active'), default=False)
    is_verified = models.BooleanField(_('verified'), default=False)
    is_staff = models.BooleanField(_('staff'), default=False)

    is_group_share = models.BooleanField(default=False)
    group_id_share = models.IntegerField(null=True, blank=True)

    is_peer_share = models.BooleanField(default=False)
    peer_id = models.IntegerField(null=True, blank=True)
    objects = UserManager()

    USERNAME_FIELD = 'email'
    EMAIL_FIELD = 'email'
    REQUIRED_FIELDS = ['phone_number']

    class Meta:
        verbose_name = _('user')
        verbose_name_plural = _('users')

    def __str__(self):
        return self.email

    def get_user_active_sessions(self):
        return self.session_set.filter(expire_date__gt=timezone.localtime())

    def get_absolute_url(self):
        return reverse("update", kwargs={'pk': self.pk})

    def get_full_name(self):
        return f"{self.first_name} {self.last_name}"

    def get_short_name(self):
        return self.first_name

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
            if self.payment.paid:
                return True
        return False

    def has_group_create_permission(self):
        plan = self.payment.plan
        if plan.group_create:
            return True
        return False

    def is_new_group_valid(self):
        payment = self.payment
        if payment.plans.count() > 0:
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

    def get_user_connected_users(self):
        emails = [user.connection_user.email for user in self.connections.filter(send_request="Accepted")]
        pending_emails = [user.connection_user.email for user in
                          self.pending_connections.filter(send_request="Accepted")]
        emails = emails + pending_emails
        users = User.objects.exclude(email=self.email).filter(email__in=emails)
        return users


    def get_user_requested_users(self):
        users = self.connections.filter(request=True, send_request="Process")
        return users


    def get_user_received_users(self):
        users = self.pending_connections.filter(request=True, send_request="Process")
        return users


    def get_remaining_users(self):
        emails = [user.connection_user.email for user in self.connections.filter(send_request="Accepted")]
        pending_emails = [user.connection_user.email for user in self.pending_connections.filter(send_request="Accepted")]
        emails = emails + pending_emails
        users = User.objects.exclude(email=self.email).exclude(email__in=emails)
        return users

    def get_profile_img(self):
        if self.profile_image:
            return self.profile_image.url
        else:
            return '/static/images/icon/user.png'

REQUEST_CHOICES = (
    ('Process', 'Process'),
    ('Accepted', 'Accepted'),
    ('Declined', 'Declined'),
)


class Connection(models.Model):
    connection_user = models.ForeignKey(User, on_delete=models.CASCADE)
    request = models.BooleanField(default=False)
    send_request = models.CharField(max_length=10, choices=REQUEST_CHOICES, default='Process')

    def __str__(self):
        return self.connection_user.username


