# Generated by Django 3.2.8 on 2021-10-27 04:58

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
