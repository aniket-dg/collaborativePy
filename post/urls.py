from django.urls import path, include
from rest_framework.routers import DefaultRouter

from . import views
from . import api

app_name = 'post'


router = DefaultRouter()
router.register(r'cmt', api.PostCommentModelViewSet, basename='api-comment')



postcomment_list = api.PostCommentModelViewSet.as_view({
    'get': 'list',
})
skeleton_postcomment_list = api.SkeletonPostCommentModelViewSet.as_view({
    'get': 'list',
})


urlpatterns = [
    path('', views.PostIndex.as_view(), name='post'),
    path('like/', views.PostLike.as_view(), name='like'),
    path('comment/', views.PostComments.as_view(), name='comment'),
    path('loadMore/', views.LoadMore.as_view(), name='load-more'),
    path('bookmark/', views.BookMarkPost.as_view(), name='book-mark'),
    path('flag_post/', views.FlagInappropriatePost.as_view(), name='flag-post'),
    path('skeleton/post/', views.SkeletonPostListView.as_view(), name='skeleton-post'),
    path('loadMore/skeleton/', views.LoadMoreSkeletonPost.as_view(), name='load-more-skeleton'),
    path('loadmore/post/', views.LoadMorePost.as_view(), name='load-more-post'),
    path('loadmore/bookmark/post/', views.LoadMoreBookmarkPost.as_view(), name='load-more-bookmark-post'),
    path('skeleton/comment/', views.SkeletonPostCommentView.as_view(), name='skeleton-post-comment'),

    path('loadMore/comments/', views.LoadMoreComments.as_view(), name='load-more-comments'),
    path('loadMore/skeleton/comments/', views.LoadMoreSkeletonComments.as_view(), name='load-more-skeleton-comments'),
    path('get/comment/', views.GetComment.as_view(), name='get-single-comment'),
    path('get/skeleton/comment/', views.GetSkeletonComment.as_view(), name='get-single-skeleton-comment'),
    path(r'api/', include(router.urls)),

    path('apiV1/comment/list/', postcomment_list, name='api-comment-list'),
    path('apiV1/skeleton/post/comment/list/', skeleton_postcomment_list, name='api-skeleton-post-comment-list'),
    # API
    # path('api/comment/', api.PostCommentModelViewSet, name='api-post-comment'),
    path('delete/post/<int:pk>/', views.DeletePost.as_view(), name='delete-post'),

]