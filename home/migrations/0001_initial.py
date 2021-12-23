# Generated by Django 3.2.9 on 2021-12-22 19:08

import ckeditor.fields
from django.db import migrations, models
import django.utils.timezone
import multiselectfield.db.fields


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Contact',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('email', models.EmailField(blank=True, max_length=254, null=True)),
                ('mobile', models.BigIntegerField()),
                ('description', models.TextField()),
                ('date', models.DateTimeField(default=django.utils.timezone.now)),
                ('seen', models.BooleanField(default=False)),
            ],
            options={
                'ordering': ['-date'],
            },
        ),
        migrations.CreateModel(
            name='NewsLetter',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('email', models.EmailField(max_length=254, unique=True)),
                ('date', models.DateTimeField(default=django.utils.timezone.now)),
                ('seen', models.BooleanField(default=False)),
            ],
            options={
                'ordering': ['-date'],
            },
        ),
        migrations.CreateModel(
            name='PopUpQuestions',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('age', models.CharField(choices=[('12-18', '12-18'), ('18-24', '18-24'), ('24-30', '24-30'), ('ABOVE 30', 'ABOVE 30')], max_length=100)),
                ('knowledge_ml_dl_ai', models.CharField(choices=[('Yes', 'Yes'), ('No', 'No')], max_length=100)),
                ('worked_in', models.CharField(choices=[('MACHINE LEARNING', 'MACHINE LEARNING'), ('DEEP LEARNING', 'DEEP LEARNING'), ('JUST PYTHON CODING', 'JUST PYTHON CODING'), ('NONE OF THE ABOVE', 'NONE OF THE ABOVE')], max_length=100)),
                ('code_difficult', models.CharField(choices=[('Yes', 'Yes'), ('No', 'No')], max_length=100)),
                ('does_ml_dl_ai', models.CharField(choices=[('Yes', 'Yes'), ('No', 'No')], max_length=100)),
                ('like_to_work_in', models.CharField(choices=[('Alone', 'Alone'), ('In a team', 'In a team')], max_length=100)),
                ('functionality_areas', multiselectfield.db.fields.MultiSelectField(choices=[('Finance and accounts', 'Finance and accounts'), ('Sales and marketing', 'Sales and marketing'), ('Office operation /Hr', 'Office operation /Hr'), ('Production/Maintainance /Quality', 'Production/Maintainance /Quality'), ('It /Software /Telecom', 'It /Software /Telecom'), ('Agriculture/farming/dairy', 'Agriculture/farming/dairy'), ('Construction/Real Estate', 'Construction/Real Estate'), ('Entertainment and media', 'Entertainment and media'), ('Education/Teachers/professor', 'Education/Teachers/professor'), ('Bpo/ITES/Telecaller/Customer care', 'Bpo/ITES/Telecaller/Customer care'), ('Fashion Designing', 'Fashion Designing'), ('Content/Editor/ journalists', 'Content/Editor/ journalists'), ('Legal/ law', 'Legal/ law'), ('Travelling agencies', 'Travelling agencies'), ('Bio tech /R&D /Scientists', 'Bio tech /R&D /Scientists'), ('Data scientists/Machine learning engineer/AI', 'Data scientists/Machine learning engineer/AI'), ('Student', 'Student'), ('Medicine/Biology /Pharmaceutical', 'Medicine/Biology /Pharmaceutical'), ('Electrical /Electronics/Electronic and telecommunications', 'Electrical /Electronics/Electronic and telecommunications'), ('Mechanical', 'Mechanical'), ('Chemical', 'Chemical')], max_length=500)),
            ],
        ),
        migrations.CreateModel(
            name='TPP',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('terms_and_condition', ckeditor.fields.RichTextField(blank=True, null=True)),
                ('privacy_policy', ckeditor.fields.RichTextField(blank=True, null=True)),
            ],
        ),
    ]
