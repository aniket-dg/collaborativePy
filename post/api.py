from django.db.models import Q
from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework.authentication import SessionAuthentication
from rest_framework.pagination import PageNumberPagination
from rest_framework.viewsets import ModelViewSet

from .models import Post, PostComment, SkeletonPostComment, SkeletonPost
from .serializers import PostCommentSerilizer


class CsrfExemptSessionAuthentication(SessionAuthentication):
    def enforce_csrf(self, request):
        return


class PostCommentModelViewSet(ModelViewSet):
    queryset = PostComment.objects.all()
    serializer_class = PostCommentSerilizer
    allowed_methods = ('GET', 'POST', 'HEAD', 'OPTIONS')
    authentication_classes = (CsrfExemptSessionAuthentication,)

    # pagination_class = MessagePagination
    def list(self, request, *args, **kwargs):
        post_id = self.request.query_params.get('post_id', None)
        if post_id:
            post = Post.objects.filter(id=post_id).last()
            if not post:
                self.queryset = {}
            else:
                self.queryset = self.queryset.filter(post=post)
        else:
            self.queryset = {}
        return super(PostCommentModelViewSet, self).list(request, *args, **kwargs)



class SkeletonPostCommentModelViewSet(ModelViewSet):
    queryset = SkeletonPostComment.objects.all()
    serializer_class = PostCommentSerilizer
    allowed_methods = ('GET', 'POST', 'HEAD', 'OPTIONS')
    authentication_classes = (CsrfExemptSessionAuthentication,)

    # pagination_class = MessagePagination
    def list(self, request, *args, **kwargs):
        post_id = self.request.query_params.get('post_id', None)
        if post_id:
            post = SkeletonPost.objects.filter(id=post_id).last()
            if not post:
                self.queryset = {}
            else:
                self.queryset = self.queryset.filter(post=post)
        else:
            self.queryset = {}
        return super(SkeletonPostCommentModelViewSet, self).list(request, *args, **kwargs)
