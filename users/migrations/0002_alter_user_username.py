# Generated by Django 3.2.9 on 2021-12-22 06:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='username',
            field=models.CharField(default=1, max_length=200, unique=True, verbose_name='User Name'),
            preserve_default=False,
        ),
    ]
