# Generated by Django 3.2.9 on 2021-12-18 07:40

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('post', '0002_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='FirstLevelCategory',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=300)),
            ],
        ),
        migrations.CreateModel(
            name='FourthLevelCategory',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=300)),
            ],
        ),
        migrations.CreateModel(
            name='SecondLevelCategory',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=300)),
            ],
        ),
        migrations.CreateModel(
            name='ThirdLevelCategory',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=300)),
            ],
        ),
        migrations.AlterModelOptions(
            name='skeletonpost',
            options={'ordering': ['-timestamp']},
        ),
        migrations.RemoveField(
            model_name='skeletonpost',
            name='category',
        ),
        migrations.AddField(
            model_name='post',
            name='code',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.CreateModel(
            name='SkeletonPostComment',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('comment', models.TextField(max_length=200)),
                ('timestamp', models.DateTimeField(auto_now_add=True)),
                ('post', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='post_comment', to='post.skeletonpost')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.AddField(
            model_name='skeletonpost',
            name='first_level_category',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='post.firstlevelcategory'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='skeletonpost',
            name='fourth_level_category',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='post.fourthlevelcategory'),
        ),
        migrations.AddField(
            model_name='skeletonpost',
            name='second_level_category',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='post.secondlevelcategory'),
        ),
        migrations.AddField(
            model_name='skeletonpost',
            name='third_level_category',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='post.thirdlevelcategory'),
        ),
    ]
