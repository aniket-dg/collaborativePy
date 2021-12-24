# Generated by Django 3.2.9 on 2021-12-24 06:14

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Plan',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=100)),
                ('cost', models.FloatField()),
                ('duration', models.IntegerField(blank=True, help_text='Enter how many days plan valid', null=True)),
                ('description', models.TextField(blank=True, null=True)),
                ('group_create', models.BooleanField(default=False)),
                ('add_people', models.BooleanField(default=False)),
                ('total_group_create_size', models.IntegerField(default=0)),
                ('group_size', models.IntegerField(default=0)),
            ],
        ),
        migrations.CreateModel(
            name='Payment',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('valid_till', models.DateField(blank=True, null=True)),
                ('amt_paid', models.FloatField(blank=True, null=True)),
                ('order_id', models.CharField(blank=True, max_length=100, null=True, unique=True)),
                ('paid', models.BooleanField(default=False)),
                ('timestamp', models.DateTimeField(auto_now_add=True)),
                ('plan', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='order.plan')),
            ],
        ),
    ]
