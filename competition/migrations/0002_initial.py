
# Generated by Django 3.2.9 on 2022-01-22 11:43
# Generated by Django 3.2.9 on 2022-01-24 06:21

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('competition', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='usersubmission',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='submissions', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='competion',
            name='participants',
            field=models.ManyToManyField(to=settings.AUTH_USER_MODEL),
        ),
    ]
