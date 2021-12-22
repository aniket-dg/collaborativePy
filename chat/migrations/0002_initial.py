# Generated by Django 3.2.9 on 2021-12-21 13:21

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('chat', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='usermedia',
            name='access_by',
            field=models.ManyToManyField(blank=True, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='usermedia',
            name='files',
            field=models.ManyToManyField(blank=True, to='chat.UploadedMedia'),
        ),
        migrations.AddField(
            model_name='usermedia',
            name='owner',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='Owner_of_media', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='p2pchatmodel',
            name='bucket',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='chat.usermedia'),
        ),
        migrations.AddField(
            model_name='p2pchatmodel',
            name='recipient',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='to_user', to=settings.AUTH_USER_MODEL, verbose_name='recipient'),
        ),
        migrations.AddField(
            model_name='p2pchatmodel',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='from_user', to=settings.AUTH_USER_MODEL, verbose_name='user'),
        ),
        migrations.AddField(
            model_name='message',
            name='author',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='author_messages', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='groupchatunreadmessage',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='from_user_to_group_unread_msg', to=settings.AUTH_USER_MODEL, verbose_name='grp_user'),
        ),
        migrations.AddField(
            model_name='groupchatmodel',
            name='admin',
            field=models.ManyToManyField(blank=True, related_name='group_admin', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='groupchatmodel',
            name='created_by',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='group_created_by_user', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='groupchat',
            name='bucket',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='chat.usermedia'),
        ),
        migrations.AddField(
            model_name='groupchat',
            name='group',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='from_group', to='chat.groupchatmodel'),
        ),
        migrations.AddField(
            model_name='groupchat',
            name='receiver_delete',
            field=models.ManyToManyField(blank=True, related_name='user_receiver_delete', to=settings.AUTH_USER_MODEL, verbose_name='User_deleted_chat'),
        ),
        migrations.AddField(
            model_name='groupchat',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='from_user_to_group', to=settings.AUTH_USER_MODEL, verbose_name='grp_user'),
        ),
        migrations.AddField(
            model_name='groupchat',
            name='user_read',
            field=models.ManyToManyField(blank=True, to=settings.AUTH_USER_MODEL, verbose_name='User_unread_msg_check'),
        ),
    ]
