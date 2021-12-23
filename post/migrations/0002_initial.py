# Generated by Django 3.2.9 on 2021-12-22 19:08

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('post', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.AddField(
            model_name='skeletonpostcomment',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='skeletonpost',
            name='first_level_category',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='post.firstlevelcategory'),
        ),
        migrations.AddField(
            model_name='skeletonpost',
            name='fourth_level_category',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='post.fourthlevelcategory'),
        ),
        migrations.AddField(
            model_name='skeletonpost',
            name='liked_by',
            field=models.ManyToManyField(blank=True, related_name='liked', to=settings.AUTH_USER_MODEL),
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
        migrations.AddField(
            model_name='skeletonpost',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='secondlevelcategory',
            name='first_category',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='firstCat', to='post.firstlevelcategory'),
        ),
        migrations.AddField(
            model_name='postcomment',
            name='post',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='post_comment', to='post.post'),
        ),
        migrations.AddField(
            model_name='postcomment',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='post',
            name='liked_by',
            field=models.ManyToManyField(blank=True, related_name='liked_by', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='post',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='fourthlevelcategory',
            name='first_category',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='post.firstlevelcategory'),
        ),
        migrations.AddField(
            model_name='fourthlevelcategory',
            name='second_category',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='post.secondlevelcategory'),
        ),
        migrations.AddField(
            model_name='fourthlevelcategory',
            name='third_category',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='firstCatFourth', to='post.thirdlevelcategory'),
        ),
        migrations.AddField(
            model_name='flaginappropriate',
            name='post',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='post.post'),
        ),
        migrations.AddField(
            model_name='flaginappropriate',
            name='user',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='bookmark',
            name='post',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='post.post'),
        ),
        migrations.AddField(
            model_name='bookmark',
            name='user',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
    ]