from django import forms

from chat.models import GroupChatModel
from post.models import Post


class PostCreateForm(forms.ModelForm):
    class Meta:
        model = Post
        exclude = ['likes', 'timestamp',]


class GroupCreateForm(forms.ModelForm):
    class Meta:
        model = GroupChatModel
        fields = ['group_name', 'profile_image', 'group_info']