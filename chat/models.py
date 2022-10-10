import datetime

from django.db import models

import users.models


class Message(models.Model):
    author = models.ForeignKey('users.User', related_name='author_messages', on_delete=models.CASCADE)
    content = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.author.username

    def last_10_messages(self):
        return Message.objects.order_by('-timestamp').all()[:10]


class P2pChatModel(models.Model):
    user = models.ForeignKey('users.User', on_delete=models.CASCADE, verbose_name='user',
                             related_name='from_user', db_index=True)
    recipient = models.ForeignKey('users.User', on_delete=models.CASCADE, verbose_name='recipient',
                                  related_name='to_user', db_index=True)
    timestamp = models.DateTimeField('timestamp', auto_now_add=True, editable=False,
                                     db_index=True)
    body = models.TextField()

    read = models.BooleanField(default=False)

    is_delete = models.BooleanField(default=False)
    is_receiver_delete = models.BooleanField(default=False)
    clear_all = models.BooleanField(default=False)
    is_media_present = models.BooleanField(default=False)
    bucket = models.ForeignKey('chat.UserMedia', on_delete=models.CASCADE, null=True, blank=True)

    def __str__(self):
        return str(self.id)

    class Meta:
        ordering = ['-timestamp']


class GroupCallHistory(models.Model):
    started_by = models.ForeignKey('users.User', on_delete=models.SET_NULL, blank=True, null=True)
    is_end = models.BooleanField(default=False)

    def __str__(self):
        return f"call_{self.id}"


class GroupChatModel(models.Model):
    group_name = models.CharField(max_length=300)
    name = models.CharField(max_length=300, null=True, blank=True)
    profile_image = models.ImageField(upload_to='profile_image/', null=True, blank=True)
    group_info = models.TextField(null=True, blank=True)

    admin = models.ManyToManyField('users.User', blank=True, related_name='group_admin')
    created_by = models.ForeignKey('users.User', on_delete=models.CASCADE, related_name='group_created_by_user')
    created_at = models.DateTimeField(auto_now_add=True)

    history = models.ManyToManyField(GroupCallHistory, blank=True)
    plan = models.ForeignKey('order.Plan', null=True, blank=True, on_delete=models.CASCADE)
    valid_till = models.DateField(null=True, blank=True)

    company = models.ForeignKey('company.Company', null=True, blank=True, on_delete=models.CASCADE)

    pending_connections = models.ManyToManyField('users.User', related_name='group_pending_connections', blank=True)
    current_size = models.CharField(max_length=300, default=0)
    room_size = models.CharField(max_length=300, default=0)


    def __str__(self):
        return str(self.id)

    def get_available_size(self):
        size = float(self.current_size) if float(self.current_size) > 0 else 0
        return "{:.3f}".format(size)

    def is_coderoom_full(self):
        self.get_size()
        return  float(self.current_size) < float(self.room_size)

    def get_size(self):
        location = f"/home/jupyter-{self.name}/"
        self.current_size = users.models.get_file_size(location)
        self.save()
        return self.room_size

    def get_profile_img(self):
        if self.profile_image:
            return self.profile_image.url
        return None

    def is_valid(self):
        now = datetime.datetime.now().date()
        return now < self.valid_till

    def get_remaining_days(self):
        if self.valid_till:
            now = datetime.datetime.now().date()
            days = (self.valid_till - now).days
            return f"{days if days > 0 else 0}/{self.plan.duration}"
        return ""


class GroupChatUnreadMessage(models.Model):
    user = models.ForeignKey('users.User', on_delete=models.CASCADE, verbose_name='grp_user',
                             related_name='from_user_to_group_unread_msg')
    read = models.BooleanField(default=False)

    def __str__(self):
        return str(self.id)


class GroupChat(models.Model):
    group = models.ForeignKey(GroupChatModel, on_delete=models.CASCADE, related_name='from_group')
    user = models.ForeignKey('users.User', on_delete=models.CASCADE, verbose_name='grp_user',
                             related_name='from_user_to_group', db_index=True)
    timestamp = models.DateTimeField('timestamp', auto_now_add=True, editable=False,
                                     db_index=True)
    body = models.TextField()

    user_read = models.ManyToManyField('users.User', blank=True, verbose_name='User_unread_msg_check')
    receiver_delete = models.ManyToManyField('users.User', blank=True, verbose_name='User_deleted_chat',
                                             related_name='user_receiver_delete')
    is_delete = models.BooleanField(default=False)
    is_media_present = models.BooleanField(default=False)
    bucket = models.ForeignKey('chat.UserMedia', on_delete=models.CASCADE, null=True, blank=True)

    def __str__(self):
        return str(self.id)

    class Meta:
        ordering = ['-timestamp']


class UploadedMedia(models.Model):
    media = models.FileField()
    is_valid = models.BooleanField(default=False)

    def __str__(self):
        return str(self.id)


class UserMedia(models.Model):
    files = models.ManyToManyField(UploadedMedia, blank=True)
    access_by = models.ManyToManyField('users.User', blank=True)
    owner = models.ForeignKey('users.User', on_delete=models.SET_NULL, null=True, blank=True,
                              related_name='Owner_of_media')

    def __str__(self):
        return str(self.id)


def get_last_10_msg_p2p(sender, receiver):
    return P2pChatModel.objects.filter(user__email=sender, recipient__email=receiver)[:10]


def get_last_10_msg(grp_name):
    return GroupChatModel.objects.filter(grp_name=grp_name)[:10]


POST_CATEGORY_CHOICES = (
    ('Question/Errors', 'Question/Errors'),
    ('Discussion and Informative', 'Discussion and Informative'),
    ('Skeleton Code', 'Skeleton Code'),
)

LANGUAGES_CHOICES = (
    ('Python', 'Python'),
    ('Java', 'Java'),
)

SCOPE_CHOICES = (
    ('Scope 1', 'Scope 1'),
    ('Scope 2', 'Scope 2'),

)


class UserNewNotification(models.Model):
    user = models.ForeignKey('users.User', on_delete=models.CASCADE, null=True, blank=True,
                             related_name='user_new_notification_user')
    friends = models.ManyToManyField('users.User', blank=True, related_name='user_new_notification_friends')
    groups = models.ManyToManyField(GroupChatModel, blank=True, related_name='user_new_notification_groups')
