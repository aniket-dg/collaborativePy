# Generated by Django 3.2.9 on 2022-01-22 11:43

import ckeditor.fields
import datetime
import django.core.validators
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Competion',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('image', models.ImageField(blank=True, null=True, upload_to='image/')),
                ('overview', ckeditor.fields.RichTextField(blank=True, null=True)),
                ('challenge', ckeditor.fields.RichTextField(blank=True, null=True)),
                ('rules', ckeditor.fields.RichTextField(blank=True, null=True)),
                ('evaluation', ckeditor.fields.RichTextField(blank=True, null=True)),
                ('prize', ckeditor.fields.RichTextField(blank=True, null=True)),
                ('data', models.FileField(blank=True, null=True, upload_to='image/')),
                ('status', models.CharField(blank=True, choices=[('Active', 'Active'), ('Late Submission', 'Late Submission'), ('Closed', 'Closed')], max_length=100, null=True)),
                ('level', models.CharField(blank=True, choices=[('Beginner', 'Beginner'), ('Advanced', 'Advanced')], max_length=100, null=True)),
                ('admin_file', models.FileField(blank=True, null=True, upload_to='admin_submissions/', validators=[django.core.validators.FileExtensionValidator(allowed_extensions=['csv'])])),
                ('start', models.DateField(default=datetime.date.today)),
                ('end', models.DateField(default=datetime.date.today)),
            ],
        ),
        migrations.CreateModel(
            name='UserSubmission',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('user_file', models.FileField(blank=True, null=True, upload_to='user_submissions/', validators=[django.core.validators.FileExtensionValidator(allowed_extensions=['csv'])])),
                ('submission_date', models.DateTimeField(auto_now_add=True)),
                ('score', models.DecimalField(decimal_places=2, default=0, max_digits=5, validators=[django.core.validators.MinValueValidator(0), django.core.validators.MaxValueValidator(100)])),
                ('competition', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='submissions', to='competition.competion')),
            ],
        ),
    ]
