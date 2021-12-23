from io import BytesIO

from PIL import Image
from django.core.files.uploadedfile import InMemoryUploadedFile
from django.http import JsonResponse, Http404
from django.shortcuts import redirect, render

from users.models import User
from .forms import PostCreateForm, PostCommentForm, SkeletonPostCommentForm
from .models import Post, PostComment, SkeletonPostComment, POST_CATEGORY_CHOICES, LANGUAGES_CHOICES, SCOPE_CHOICES
from django.contrib.auth.mixins import LoginRequiredMixin
from django.views import View
from django.views.generic import ListView
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.core import serializers
from django.core.paginator import Paginator
from post.models import BookMark, FlagInappropriate, SkeletonPost, FirstLevelCategory, SecondLevelCategory, \
    ThirdLevelCategory, FourthLevelCategory
from post.filters import SkeletonPostFilter
from django.contrib import messages


def image_process(file):
    """
    :param request:
        image file
    :return:
        File/None
    """
    try:
        img = Image.open(file)
        image_format = ['JPEG', 'PNG', 'TIFF', 'EPS', 'RAW']
        if img.format in image_format:
            img.thumbnail((640, 480), Image.ANTIALIAS)
            thumbnailString = BytesIO()
            if file.size > 5242880:
                img.save(thumbnailString, 'JPEG', quality=50)
            else:
                img.save(thumbnailString, 'JPEG', quality=100)
            newFile = InMemoryUploadedFile(thumbnailString, None, 'temp.jpg', 'image/jpeg', thumbnailString, None)
            return newFile
        else:
            return None
    except:
        return None


class PostIndex(View):
    """
        :param request:
                authenticated_user, form-data,
        :return:
            Posts/False
    """

    def get(self, *args, **kwargs):
        context = {}
        category = []
        languages = []
        scopes = []

        post_category = POST_CATEGORY_CHOICES
        languages_choices = LANGUAGES_CHOICES
        scopes_choices = SCOPE_CHOICES
        for item in post_category:
            category.append(item[0])
        for item in languages_choices:
            languages.append(item[0])
        for item in scopes_choices:
            scopes.append(item[0])
        context['category'] = category
        context['languages'] = languages
        context['scopes'] = scopes
        context['post'] = []
        return render(self.request, 'post/feeds.html', context)

    def post(self, *args, **kwargs):
        if not self.request.user.is_authenticated:
            return JsonResponse({
                "Status": False,
                'Message': "Authenticated user can post only!..."
            })
        form = PostCreateForm(self.request.user, self.request.POST, self.request.FILES)
        if not form.is_valid():
            return JsonResponse({
                "Status": False,
                'Message': "Required fields are empty!..."
            })
        post = form.save(commit=False)
        post.user = self.request.user
        for count, item in enumerate(self.request.FILES.getlist('images')):
            img = image_process(item)
            if img is None:
                return JsonResponse({
                    'status': False,
                    'message': "Only Image Files Are Acceptable!..."
                })
            if count == 0:
                post.image1 = img
            elif count == 1:
                post.image2 = img
            elif count == 2:
                post.image3 = img
            elif count == 3:
                post.image4 = img
            elif count == 4:
                post.image5 = img
            else:
                return JsonResponse({'status': False,
                                     'message': "Only 5 Image Files Are Acceptable!..."
                                     })
        post.save()

        post.description = self.request.POST.get('description')
        code = self.request.POST.get('code')

        if code:
            post.code = code
        post.save()

        return JsonResponse({
            'Status': True
        })


@method_decorator(csrf_exempt, name='dispatch')
class PostLike(LoginRequiredMixin, View):
    def post(self, *args, **kwargs):
        """
        :param request:
            authenticated_user, post-id,
        :return:
            True/False, Number of likes
        """
        id = self.request.POST.get('id')
        if not id:
            return JsonResponse({
                'Status': False,
                'Message': 'ID is required!...'
            })
        if len(Post.objects.filter(id=id)) == 0:
            return JsonResponse({
                'Status': False,
                'Message': 'Something went wrong!...'
            })
        post = Post.objects.filter(id=id).get()
        if self.request.user not in post.liked_by.all():
            post.liked_by.add(self.request.user)
        else:
            post.liked_by.remove(self.request.user)
        return JsonResponse({
            'likes': post.liked_by.all().count()
        })


class PostComments(View):
    """
    :param request:
        authenticated_user, post-id, form-data,
    :return:
        Comments/False
    """

    def get(self, *args, **kwargs):
        id = self.request.GET['id']
        if len(Post.objects.filter(id=id)) == 0:
            return JsonResponse({
                'status': False,
                'Message': 'Invalid post id!...'
            })

        post = Post.objects.filter(id=id).get()
        return JsonResponse({
            'status': True,
            'post_id': post.id,
        })

    def post(self, *args, **kwargs):
        if not self.request.user.is_authenticated:
            return JsonResponse({
                "status": False,
                'Message': "Authenticated user can comment only!..."
            })
        id = self.request.POST.get('id')
        if len(Post.objects.filter(id=id)) == 0:
            return JsonResponse({
                'status': False,
                'Message': 'Invalid post id!...'
            })
        post = Post.objects.filter(id=id).get()
        form = PostCommentForm(self.request.user, self.request.POST)
        if not form.is_valid():
            return JsonResponse({
                'status': False,
                'Message': 'Invalid data!...'
            })
        comment = form.save(commit=False)
        comment.user = self.request.user
        comment.post = post
        comment.save()
        return JsonResponse({'status': True, 'id': post.id})


class LoadMore(View):
    """
        :param request:
            current_posts
        :return:
            more_posts
    """

    def get(self, *args, **kwargs):
        if self.request.GET['category'] == 'normal':
            p = Paginator(Post.objects.filter(category__in=['Question/Errors', 'Discussion and Informative']), 10)
        else:
            p = Paginator(Post.objects.filter(category__in=['Skeleton Code']), 10)
        current_status = int(self.request.GET['current_posts'])
        if p.count <= current_status:
            return JsonResponse({
                'Status': False,
                'Message': 'No more posts!...'
            })
        new_posts = list(p.get_page((current_status + 2) / 2))
        posts = []
        for post in new_posts:
            bookmark = "none"
            if BookMark.objects.filter(user=self.request.user, post=post).exists():
                bookmark = "#1589FF"
            flag = ""
            if FlagInappropriate.objects.filter(user=self.request.user, post=post).exists():
                flag = "is-hidden"
            if not post.user.profile_image:
                profile = "https://e7.pngegg.com/pngimages/798/436/png-clipart-computer-icons-user-profile-avatar-profile-heroes-black.png"
            else:
                profile = post.user.profile_image.url
            try:
                image1 = post.image1.url
            except ValueError:
                image1 = ""
            try:
                image2 = post.image2.url
            except ValueError:
                image2 = ""
            try:
                image3 = post.image3.url
            except ValueError:
                image3 = ""
            try:
                image4 = post.image4.url
            except ValueError:
                image4 = ""
            try:
                image5 = post.image5.url
            except ValueError:
                image5 = ""
            posts.append({
                'user': post.user.username, 'profile': profile, 'post_id': post.id, 'category': post.category,
                'description': post.description, 'language': post.language, 'likes': post.liked_by.count(),
                'scope_of_work': post.scope_of_work, 'timestamp': post.timestamp.strftime("%H:%M:%S %d-%m-%Y"),
                'like_status': True if self.request.user in post.liked_by.all() else False, 'image1': image1,
                'comments': PostComment.objects.filter(post=post).count(), 'image2': image2, 'image3': image3,
                'image4': image4, 'image5': image5, 'bookmark': bookmark, 'flag': flag, 'code': post.skeleton_code
            })
        return JsonResponse({'posts': posts})


@method_decorator(csrf_exempt, name='dispatch')
class BookMarkPost(LoginRequiredMixin, View):
    def post(self, *args, **kwargs):
        """
        :param request:
            authenticated_user, post-id,
        :return:
            True/False, Bookmark post
        """
        id = self.request.POST.get('id')
        if not id:
            return JsonResponse({
                'Status': False,
                'Message': 'ID is required!...'
            })
        if len(Post.objects.filter(id=id)) == 0:
            return JsonResponse({
                'Status': False,
                'Message': 'Something went wrong!...'
            })
        post = Post.objects.filter(id=id).get()
        if FlagInappropriate.objects.filter(user=self.request.user, post=post).exists():
            return JsonResponse({
                'Status': False,
                'Message': 'Cant bookmark a Inappropriate post!...'
            })
        if BookMark.objects.filter(user=self.request.user, post=post).exists():
            BookMark.objects.filter(user=self.request.user, post=post).delete()
            return JsonResponse({
                'Status': 0
            })
        else:
            BookMark.objects.create(user=self.request.user, post=post)
            return JsonResponse({
                'Status': 1
            })


@method_decorator(csrf_exempt, name='dispatch')
class FlagInappropriatePost(LoginRequiredMixin, View):
    def post(self, *args, **kwargs):
        """
        :param request:
            authenticated_user, post-id,
        :return:
            True/False, flag post
        """
        id = self.request.POST.get('id')
        reason = self.request.POST.get('reason')
        if not id:
            return JsonResponse({
                'Status': False,
                'Message': 'ID is required!...'
            })
        if len(Post.objects.filter(id=id)) == 0:
            return JsonResponse({
                'Status': False,
                'Message': 'Something went wrong!...'
            })
        post = Post.objects.filter(id=id).get()
        if FlagInappropriate.objects.filter(user=self.request.user, post=post).exists():
            return JsonResponse({
                'Status': False,
                'Message': 'Already Flagged!...'
            })

        if BookMark.objects.filter(user=self.request.user, post=post).exists():
            BookMark.objects.filter(user=self.request.user, post=post).delete()

        FlagInappropriate.objects.create(user=self.request.user, post=post, reason=reason)
        return JsonResponse({
            'Status': True
        })


class SkeletonPostListView(ListView):
    model = SkeletonPost
    paginate_by = 10
    template_name = 'post/skeleton_feed.html'

    def get_queryset(self):
        return self.model.objects.all()

    def get_context_data(self, **kwargs):
        context = super(SkeletonPostListView, self).get_context_data(**kwargs)
        filter_query = SkeletonPostFilter(self.request.GET, self.object_list)
        if len(filter_query.qs) != len(self.object_list):
            context['object_list'] = filter_query.qs
            context['post_list'] = filter_query.qs
            context['post_list'] = context['member_list'][self.paginate_by:]
            if len(filter_query.qs) > self.paginate_by:
                context['is_paginated'] = False
        context['first_level_category'] = FirstLevelCategory.objects.all()
        context['second_level_category'] = SecondLevelCategory.objects.all()
        context['third_level_category'] = ThirdLevelCategory.objects.all()
        context['fourth_level_category'] = FourthLevelCategory.objects.all()
        return context


class LoadMoreSkeletonPost(View):
    """
        :param request:
            current_posts
        :return:
            more_posts
    """

    def get(self, *args, **kwargs):
        p = Paginator(SkeletonPost.objects.all(), 10)
        current_status = int(self.request.GET['current_posts'])
        if p.count <= current_status:
            return JsonResponse({
                'Status': False,
                'Message': 'No more posts!...'
            })
        new_posts = list(p.get_page((current_status + 2) / 2))
        posts = []
        print(new_posts, "Aniket")
        for post in new_posts:
            bookmark = "none"
            flag = ""
            if not post.user.profile_image:
                profile = "https://e7.pngegg.com/pngimages/798/436/png-clipart-computer-icons-user-profile-avatar-profile-heroes-black.png"
            else:
                profile = post.user.profile_image.url
            try:
                image1 = post.image1.url
            except ValueError:
                image1 = ""
            try:
                image2 = post.image2.url
            except ValueError:
                image2 = ""
            try:
                image3 = post.image3.url
            except ValueError:
                image3 = ""
            try:
                image4 = post.image4.url
            except ValueError:
                image4 = ""
            try:
                image5 = post.image5.url
            except ValueError:
                image5 = ""
            posts.append({
                'user': post.user.username, 'profile': profile, 'post_id': post.id,
                'description': post.description, 'language': post.language, 'likes': post.liked_by.count(),
                'scope_of_work': post.scope_of_work, 'timestamp': post.timestamp.strftime("%H:%M:%S %d-%m-%Y"),
                'like_status': True if self.request.user in post.liked_by.all() else False, 'image1': image1,
                'comments': SkeletonPostComment.objects.filter(post=post).count(), 'image2': image2, 'image3': image3,
                'image4': image4, 'image5': image5, 'bookmark': bookmark, 'flag': flag, 'code': post.skeleton_code,
                'first_level_category': post.first_level_category.id,
                'second_level_category': post.second_level_category.id if post.second_level_category else "null",
                'third_level_category': post.third_level_category.id if post.third_level_category else "null",
                'fourth_level_category': post.fourth_level_category.id if post.fourth_level_category else "null"
            })
        return JsonResponse({'posts': posts})


@method_decorator(csrf_exempt, name='dispatch')
class SkeletonPostCommentView(View):
    """
    :param request:
        authenticated_user, post-id, form-data,
    :return:
        Comments/False
    """

    def post(self, *args, **kwargs):
        if not self.request.user.is_authenticated:
            return JsonResponse({
                "status": False,
                'Message': "Authenticated user can comment only!..."
            })
        id = self.request.POST.get('id')
        if len(SkeletonPost.objects.filter(id=id)) == 0:
            return JsonResponse({
                'status': False,
                'Message': 'Invalid post id!...'
            })
        post = SkeletonPost.objects.filter(id=id).get()
        form = SkeletonPostCommentForm(self.request.user, self.request.POST)
        if not form.is_valid():
            return JsonResponse({
                'status': False,
                'Message': 'Invalid data!...'
            })
        comment = form.save(commit=False)
        comment.user = self.request.user
        comment.post = post
        comment.save()
        return JsonResponse({'status': True, 'id': post.id})


class LoadMorePost(View):
    def get(self, *args, **kwargs):
        self_post = self.request.GET.get('self')
        if self_post:
            user_id = self.request.GET.get('user_id')
            if user_id:
                user = User.objects.filter(id=int(user_id)).last()
                if user:
                    p = Paginator(Post.objects.filter(user=user), 10)
            else:
                p = Paginator(Post.objects.filter(user=self.request.user), 10)
        else:
            p = Paginator(Post.objects.all(), 10)

        current_status = int(self.request.GET['current_posts'])
        if p.count <= current_status:
            return JsonResponse({
                'Status': False,
                'Message': 'No more posts!...'
            })
        new_posts = list(p.get_page((current_status + 2) / 2))
        posts = []
        for post in new_posts:
            bookmark = "none"
            if BookMark.objects.filter(user=self.request.user, post=post).exists():
                bookmark = "#1589FF"
            flag = ""
            if FlagInappropriate.objects.filter(user=self.request.user, post=post).exists():
                flag = "is-hidden"
            if not post.user.profile_image:
                profile = "https://e7.pngegg.com/pngimages/798/436/png-clipart-computer-icons-user-profile-avatar-profile-heroes-black.png"
            else:
                profile = post.user.profile_image.url
            try:
                image1 = post.image1.url
            except ValueError:
                image1 = ""
            try:
                image2 = post.image2.url
            except ValueError:
                image2 = ""
            try:
                image3 = post.image3.url
            except ValueError:
                image3 = ""
            try:
                image4 = post.image4.url
            except ValueError:
                image4 = ""
            try:
                image5 = post.image5.url
            except ValueError:
                image5 = ""
            posts.append({
                'user': post.user.get_full_name(),'user_id':post.user.id, 'profile': profile, 'post_id': post.id, 'category': post.category,
                'description': post.description, 'language': post.language, 'likes': post.liked_by.count(),
                'scope_of_work': post.scope_of_work, 'timestamp': post.user.username,
                'like_status': True if self.request.user in post.liked_by.all() else False, 'image1': image1,
                'comments': PostComment.objects.filter(post=post).count(), 'image2': image2, 'image3': image3,
                'image4': image4, 'image5': image5, 'bookmark': bookmark, 'flag': flag, 'code': post.code

            })
        return JsonResponse({'posts': posts})


class DeletePost(View):
    def get(self, *args, **kwargs):
        post_id = self.kwargs.get('pk')
        post = Post.objects.filter(id=post_id, user=self.request.user).last()
        redirect_url = self.request.META.get('HTTP_REFERER')
        if not post:
            messages.warning(self.request, "Post not exist")
            if redirect_url:
                return redirect(redirect_url)
            return redirect('user:profile')
        post.delete()
        messages.warning(self.request, "Post deleted")
        if redirect_url:
            return redirect(redirect_url)
        return redirect('user:profile')


class LoadMoreComments(View):
    def get(self, *args, **kwargs):
        post_id = self.request.GET.get('post_id')
        post = Post.objects.filter(id=post_id).last()
        if not post:
            return JsonResponse({})
        comment_list = PostComment.objects.filter(post=post)
        p = Paginator(comment_list, 4)

        current_status = int(self.request.GET.get('current_comments'))
        if p.count <= current_status:
            return JsonResponse({
                'Status': False,
                'Message': 'No more posts!...'
            })
        new_comments = list(p.get_page((current_status + 2) // 2))
        comments = []
        for item in new_comments:
            if not item.user.profile_image:
                profile = "https://e7.pngegg.com/pngimages/798/436/png-clipart-computer-icons-user-profile-avatar-profile-heroes-black.png"
            else:
                profile = post.user.profile_image.url
            comments.append({
                'id': item.id,
                'post_id': item.post.id,
                'comment': item.comment,
                'timestamp': item.timestamp.strftime("%d %b, %Y"),
                'post_user_id': item.user.id,
                'user': item.user.username,
                'post_user': item.user.get_full_name(),
                'user_email': item.user.email,
                'user_profile': profile
            })

        return JsonResponse({
            'comments': comments
        })


class LoadMoreSkeletonComments(View):
    def get(self, *args, **kwargs):
        post_id = self.request.GET.get('post_id')
        post = SkeletonPost.objects.filter(id=post_id).last()
        if not post:
            return JsonResponse({})
        comment_list = SkeletonPostComment.objects.filter(post=post)
        p = Paginator(comment_list, 4)

        current_status = int(self.request.GET.get('current_comments'))
        if p.count <= current_status:
            return JsonResponse({
                'Status': False,
                'Message': 'No more comments!...'
            })
        new_comments = list(p.get_page((current_status + 2) / 2))
        comments = []
        for item in new_comments:
            if not item.user.profile_image:
                profile = "https://e7.pngegg.com/pngimages/798/436/png-clipart-computer-icons-user-profile-avatar-profile-heroes-black.png"
            else:
                profile = post.user.profile_image.url
            comments.append({
                'id': item.id,
                'post_id': item.post.id,
                'comment': item.comment,
                'timestamp': item.timestamp.strftime("%d %b, %Y"),
                'post_user_id': item.user.id,
                'post_user': item.user.get_full_name(),
                'user': item.user.username,
                'user_email': item.user.email,
                'user_profile': profile
            })

        return JsonResponse({
            'comments': comments
        })


class GetComment(View):
    def get(self, *args, **kwargs):
        post_id = self.request.GET.get('post_id')
        post = Post.objects.filter(id=post_id).last()
        comment_list = PostComment.objects.filter(post=post).first()
        comment_list = [comment_list]
        comments = []
        for item in comment_list:
            if not item.user.profile_image:
                profile = "https://e7.pngegg.com/pngimages/798/436/png-clipart-computer-icons-user-profile-avatar-profile-heroes-black.png"
            else:
                profile = item.post.user.profile_image.url
            comments.append({
                'id': item.id,
                'post_id': item.post.id,
                'comment': item.comment,
                'timestamp': item.timestamp,
                'post_user_id': item.user.id,
                'user': item.user.username,
                'post_user': item.user.get_full_name(),
                'user_email': item.user.email,
                'user_profile': profile
            })

        return JsonResponse({
            'comments': comments
        })


class GetSkeletonComment(View):
    def get(self, *args, **kwargs):
        post_id = self.request.GET.get('post_id')
        post = SkeletonPost.objects.filter(id=post_id).last()
        comment_list = SkeletonPostComment.objects.filter(post=post).first()
        comment_list = [comment_list]
        comments = []
        for item in comment_list:
            if not item.user.profile_image:
                profile = "https://e7.pngegg.com/pngimages/798/436/png-clipart-computer-icons-user-profile-avatar-profile-heroes-black.png"
            else:
                profile = item.post.user.profile_image.url
            comments.append({
                'id': item.id,
                'post_id': item.post.id,
                'comment': item.comment,
                'timestamp': item.timestamp.strftime("%d %b, %Y"),
                'post_user_id': item.user.id,
                'post_user': item.user.get_full_name(),
                'user': item.user.username,
                'user_email': item.user.email,
                'user_profile': profile
            })

        return JsonResponse({
            'comments': comments
        })


class LoadMoreBookmarkPost(View):
    def get(self, *args, **kwargs):
        p = Paginator(BookMark.objects.filter(user=self.request.user), 10)

        current_status = int(self.request.GET['current_posts'])
        if p.count <= current_status:
            return JsonResponse({
                'Status': False,
                'Message': 'No more posts!...'
            })
        new_posts = list(p.get_page((current_status + 2) / 2))
        posts = []
        for post in new_posts:
            bookmark = "#1589FF"
            flag = ""
            if FlagInappropriate.objects.filter(user=self.request.user, post=post.post).exists():
                flag = "is-hidden"
            if not post.post.user.profile_image:
                profile = "https://e7.pngegg.com/pngimages/798/436/png-clipart-computer-icons-user-profile-avatar-profile-heroes-black.png"
            else:
                profile = post.post.user.profile_image.url
            try:
                image1 = post.post.image1.url
            except ValueError:
                image1 = ""
            try:
                image2 = post.post.image2.url
            except ValueError:
                image2 = ""
            try:
                image3 = post.post.image3.url
            except ValueError:
                image3 = ""
            try:
                image4 = post.post.image4.url
            except ValueError:
                image4 = ""
            try:
                image5 = post.post.image5.url
            except ValueError:
                image5 = ""
            posts.append({
                'user': post.post.user.get_full_name(), 'profile': profile, 'post_id': post.post.id,
                'category': post.post.category,
                'description': post.post.description, 'language': post.post.language,
                'likes': post.post.liked_by.count(),
                'scope_of_work': post.post.scope_of_work,
                'timestamp': post.post.user.username,
                'like_status': True if self.request.user in post.post.liked_by.all() else False, 'image1': image1,
                'comments': PostComment.objects.filter(post=post.post).count(), 'image2': image2, 'image3': image3,
                'image4': image4, 'image5': image5, 'bookmark': bookmark, 'flag': flag, 'code': post.post.code

            })
        return JsonResponse({'posts': posts})
