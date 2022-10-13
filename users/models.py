from __future__ import unicode_literals

import glob
import os
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

USER_TYPE_CHOICES = (
    ('User', 'User'),
    ('Company_User', 'Company_User')
)


def get_file_size(start_path):
    total_size = 0
    files = glob.glob(os.path.join(start_path, '*'))
    for item in files:
        total_size += os.path.getsize(item)
    print(total_size)
    kbyte_size = total_size/1000
    mb_size = kbyte_size / 1000
    gb_size = mb_size / 1000
    print(gb_size)
    return gb_size

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
    pending_connections = models.ManyToManyField('users.Connection', blank=True,
                                                 related_name='pending_user_connections')
    groups = models.ManyToManyField('chat.GroupChatModel', blank=True)
    # Django
    date_joined = models.DateTimeField(_('date joined'), auto_now_add=True)
    is_active = models.BooleanField(_('active'), default=False)
    is_verified = models.BooleanField(_('verified'), default=False)
    is_staff = models.BooleanField(_('staff'), default=False)

    is_group_share = models.BooleanField(default=False)
    group_id_share = models.IntegerField(null=True, blank=True)

    user_type = models.CharField(choices=USER_TYPE_CHOICES, max_length=100, default='User')
    company = models.ForeignKey('company.Company', on_delete=models.SET_NULL, null=True, blank=True)
    is_company_admin = models.BooleanField(default=False)
    is_peer_share = models.BooleanField(default=False)
    peer_id = models.IntegerField(null=True, blank=True)
    objects = UserManager()

    USERNAME_FIELD = 'email'
    EMAIL_FIELD = 'email'
    REQUIRED_FIELDS = ['phone_number']

    def is_company_user(self):
        return  self.user_type == 'Company_User'

    def get_company_users(self):
        return User.objects.filter(user_type='Company_User', company=self.company).exclude(email=self.email)

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

    def get_user_group(self):
        if self.is_company_user and self.company:
            return GroupChatModel.objects.filter(company=self.company)
        return self.groups.all()

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

    def is_company_plan_valid(self):
        if self.company:
            if self.payment and self.payment.paid and self.payment.plan.is_company_plan:
                return True
        return False

    def normal_company_plan_valid(self):
        if self.company and self.company.get_plan():
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
        if self.is_company_user():
            return User.objects.filter(company=self.company, user_type='Company_User').exclude(email=self.email)
        emails = [user.connection_user.email for user in self.connections.filter(send_request="Accepted")]
        pending_emails = [user.connection_user.email for user in
                          self.pending_connections.filter(send_request="Accepted")]
        emails = emails + pending_emails
        users = User.objects.exclude(email=self.email).exclude(user_type='Company_User').filter(email__in=emails)
        return users

    def get_user_requested_users(self):
        users = self.connections.filter(request=True, send_request="Process",connection_user__user_type='Company_User')
        return users

    def get_user_received_users(self):
        users = self.pending_connections.filter(request=True, send_request="Process",connection_user__user_type='Company_User')
        return users

    def get_remaining_users(self):
        if self.is_company_user():
            return User.objects.filter(company=self.company, user_type='Company_User').exclude(email=self.email)
        emails = [user.connection_user.email for user in self.connections.filter(send_request="Accepted")]
        pending_emails = [user.connection_user.email for user in
                          self.pending_connections.filter(send_request="Accepted")]
        emails = emails + pending_emails
        users = User.objects.exclude(email=self.email).exclude(email__in=emails).exclude(user_type='Company_User')
        print(users, "Aniket")
        return users

    def get_profile_img(self):
        if self.profile_image:
            return self.profile_image.url
        else:
            return '/static/images/icon/user.png'

    def get_coderoom_size(self, user):
        second_user = user
        first_user = self

        x = first_user if first_user.id > second_user.id else second_user
        y = second_user if second_user.id < first_user.id else first_user

        coderoom = CodeRoomSize.objects.filter(first_user=x, second_user=y).last()
        if not coderoom:
            return 0
        return coderoom.get_available_size()

    def is_coderoom_valid(self, user):
        coderoom = self.get_coderoom(user)
        if coderoom:
            return float(coderoom.get_available_size()) > 0
        return True

    def get_coderoom(self, user):
        second_user = user
        first_user = self

        x = first_user if first_user.id > second_user.id else second_user
        y = second_user if second_user.id < first_user.id else first_user

        coderoom = CodeRoomSize.objects.filter(first_user=x, second_user=y).last()
        return coderoom

    def get_company_coderoom_size(self):
        groups = GroupChatModel.objects.filter(company=self.company).count()
        return groups



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

class CodeRoomSize(models.Model):
    group_name = models.CharField(max_length=300, null=True, blank=True)
    current_size = models.CharField(max_length=300, default=0)
    room_size = models.CharField(max_length=300, default=0.2)
    first_user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True, related_name='user_first')
    second_user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True, related_name='user_second')
    def get_available_size(self):
        size = float(self.room_size) - float(self.current_size)
        return "{:.3f}".format(size)

    def save(self, *args, **kwargs):
        if self.second_user:
            x = self.first_user if self.first_user.id > self.second_user.id else self.second_user
            y = self.second_user if self.second_user.id < self.first_user.id else self.first_user

            self.group_name = f"coderoom_{x.id}_{y.id}"
        else:
            self.group_name = f"coderoom_{self.first_user.id}"
        super(CodeRoomSize, self).save(*args, **kwargs)

    def get_size(self):
        location = f"/home/jupyter-{self.group_name}/"
        self.current_size = get_file_size(location)
        self.save()
        return self.room_size
