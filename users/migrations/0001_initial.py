# Generated by Django 3.2.9 on 2021-12-21 13:21

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import users.managers


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('order', '0001_initial'),
        ('auth', '0012_alter_user_first_name_max_length'),
        ('chat', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('is_superuser', models.BooleanField(default=False, help_text='Designates that this user has all permissions without explicitly assigning them.', verbose_name='superuser status')),
                ('username', models.CharField(blank=True, max_length=200, null=True, unique=True, verbose_name='User Name')),
                ('email', models.EmailField(help_text='Provide an email for registration', max_length=320, unique=True, verbose_name='Email')),
                ('phone_number', models.BigIntegerField(blank=True, help_text='Provide an mobile number with country code!', null=True, unique=True)),
                ('account_type', models.CharField(blank=True, max_length=100, null=True)),
                ('first_name', models.CharField(blank=True, max_length=200, null=True, verbose_name='First Name')),
                ('last_name', models.CharField(blank=True, max_length=200, null=True, verbose_name='Last Name')),
                ('designation', models.CharField(blank=True, max_length=300, null=True)),
                ('bio', models.TextField(blank=True, max_length=300, null=True)),
                ('profile_image', models.ImageField(blank=True, null=True, upload_to='profile_image/')),
                ('date_joined', models.DateTimeField(auto_now_add=True, verbose_name='date joined')),
                ('is_active', models.BooleanField(default=True, verbose_name='active')),
                ('is_verified', models.BooleanField(default=False, verbose_name='verified')),
                ('is_staff', models.BooleanField(default=False, verbose_name='staff')),
            ],
            options={
                'verbose_name': 'user',
                'verbose_name_plural': 'users',
            },
            managers=[
                ('objects', users.managers.UserManager()),
            ],
        ),
        migrations.CreateModel(
            name='Connection',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('request', models.BooleanField(default=False)),
                ('send_request', models.CharField(choices=[('Process', 'Process'), ('Accepted', 'Accepted'), ('Declined', 'Declined')], default='Process', max_length=10)),
                ('connection_user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.AddField(
            model_name='user',
            name='connections',
            field=models.ManyToManyField(blank=True, to='users.Connection'),
        ),
        migrations.AddField(
            model_name='user',
            name='groups',
            field=models.ManyToManyField(blank=True, to='chat.GroupChatModel'),
        ),
        migrations.AddField(
            model_name='user',
            name='payment',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='order.payment'),
        ),
        migrations.AddField(
            model_name='user',
            name='pending_connections',
            field=models.ManyToManyField(blank=True, related_name='pending_user_connections', to='users.Connection'),
        ),
        migrations.AddField(
            model_name='user',
            name='user_permissions',
            field=models.ManyToManyField(blank=True, help_text='Specific permissions for this user.', related_name='user_set', related_query_name='user', to='auth.Permission', verbose_name='user permissions'),
        ),
    ]
