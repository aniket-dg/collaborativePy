from django import forms

from .models import Post, PostComment, SkeletonPostComment


class PostCreateForm(forms.ModelForm):
    class Meta:
        model = Post
        fields = ['category', 'description', 'language', 'scope_of_work', 'image1', 'image2', 'image3', 'image4',
                  'image5']
        exclude = ['liked_by', 'timestamp', 'user']

    def __init__(self, user, *args, **kwargs):
        super(PostCreateForm, self).__init__(*args, **kwargs)
        self.user = user


class PostCommentForm(forms.ModelForm):
    class Meta:
        model = PostComment
        fields = ['comment']
        exclude = ['post', 'timestamp', 'user']

    def __init__(self, user, *args, **kwargs):
        super(PostCommentForm, self).__init__(*args, **kwargs)
        self.user = user

class SkeletonPostCommentForm(forms.ModelForm):
    class Meta:
        model = SkeletonPostComment
        fields = ['comment']
        exclude = ['post', 'timestamp', 'user']

    def __init__(self, user, *args, **kwargs):
        super(SkeletonPostCommentForm, self).__init__(*args, **kwargs)
        self.user = user
