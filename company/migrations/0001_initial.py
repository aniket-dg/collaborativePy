# Generated by Django 3.2.9 on 2023-02-10 05:51

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Company',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=300)),
                ('website_url', models.URLField(blank=True, null=True)),
                ('share_link', models.TextField(blank=True, null=True)),
            ],
        ),
    ]
