from django import forms

from .models import Post, PostComment, SkeletonPostComment, SkeletonPost


class PostCreateForm(forms.ModelForm):
    class Meta:
        model = Post
        fields = ['category', 'description', 'language', 'scope_of_work', 'image1']
        exclude = ['liked_by', 'timestamp', 'user', 'image2', 'image3', 'image4',
                  'image5']

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
        exclude = ['post', 'timestamp', 'user', 'image2', 'image3', 'image4',
                  'image5']

    def __init__(self, user, *args, **kwargs):
        super(SkeletonPostCommentForm, self).__init__(*args, **kwargs)
        self.user = user


class SkeletonPostCreateForm(forms.ModelForm):
    class Meta:
        model = SkeletonPost
        exclude = ['liked_by','user']