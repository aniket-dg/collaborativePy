from django.urls import path, include, reverse_lazy
from django.contrib.auth import views as auth_views
from django.conf.urls.static import static
from django.conf import settings

from . import views
from . import api
from push_notifications.api.rest_framework import GCMDeviceAuthorizedViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'device/gcm', GCMDeviceAuthorizedViewSet)

app_name='user'

urlpatterns = [

    # Login and Register
    path('login/', views.LoginView.as_view(), name='login'),
    path('register/', views.SignUpView.as_view(), name='register'),
    path('activate/<uidb64>/<token>/', views.UserAccountActivateView.as_view(), name='activate'),
    path('logout/', views.LogoutView.as_view(), name='logout'),

    # Update User profile
    path('update/<int:pk>/', views.UserUpdateView.as_view(), name='update'),
    path('update/profile-image/<int:pk>', views.UserProfileImageUpdateView.as_view(), name='update-profile-image'),

    # Password
    # Password Change
    path('change-password/', auth_views.PasswordChangeView.as_view(template_name='users/password_change.html'),
         name='password_change'),
    path('change-password-done/',
         auth_views.PasswordChangeDoneView.as_view(template_name='users/password_change_done.html'),
         name='password_change_done'),

    # Forgot Password
    path('password-reset/', auth_views.PasswordResetView.as_view(template_name='users/password_reset.html',
                                                                 email_template_name='users/password_reset_email.html',
                                                                 success_url=reverse_lazy('user:password_reset_done'),
                                                                 from_email='info@stellar-ai.in'),
         name='password_reset'),
    path('password-reset/done/',
         auth_views.PasswordResetDoneView.as_view(template_name='users/password_reset_done.html'),
         name='password_reset_done'),
    path('password-reset-confirm/<uidb64>/<token>/',
         auth_views.PasswordResetConfirmView.as_view(template_name='users/password_reset_confirm.html',
                                                     success_url=reverse_lazy('user:password_reset_complete')),
         name='password_reset_confirm'),
    path('password-reset-complete/',
         auth_views.PasswordResetCompleteView.as_view(template_name='users/password_reset_complete.html'),
         name='password_reset_complete'),

    path('bookmark/list/', views.BookMarkListView.as_view(), name='bookmark-list'),
    path('profile/', views.UserProfileView.as_view(), name='profile'),
    path('connections/', views.UserConnection.as_view(), name='connections'),

    # AJAX    
    path('accept/request/', views.AcceptUserRequest.as_view(), name='accept-user'),
    path('send/request/', views.SendUserRequest.as_view(), name='send-request'),
    path('unfriend/', views.UnfriendUserAJAX.as_view(), name='unfriend-ajax'),


    path('profile/<int:pk>/', views.UserFriendProfileView.as_view(), name='friend-profile'),


    # Userdate urls
    path('userdata/', views.UserData.as_view(), name='userdata'),
    path('search/', views.UsersAndPostsSearchView.as_view(), name='search-user-post'),

     #path('send/user/request/<int:user_id>/', views.SendRequest.as_view(), name='send-user-request'),
     #path('accept/user/request/<int:id>/', views.AcceptRequest.as_view(), name='accept-user-request'),
     path('unfriend/user/<int:pk>/', views.UnfriendUser.as_view(), name='unfriend-user'),

    path('load/more/friends/', views.LoadMoreFriends.as_view(), name='load-more-friends'),
    path('open/notebook/', views.OpenNotebook.as_view(), name='open-notebook'),
    path('open/chat/notebook/', views.OpenChatNotebook.as_view(), name='open-peer-notebook'),
    path('redirect/notebook/', views.SaveSessionForNotebook.as_view(), name='redirect-notebook'),

    # Social Login
    path('oauth/', include('social_django.urls', namespace='social')),
    path('oauth/register/', views.GoogleOAuthSignUpView.as_view(), name='oauth-register'),

    # Webpush
    path('notification/', api.NotificationPermission.as_view(), name='notification'),  # only for testing
    path('device/fcm/', api.FCMDeviceAuthorizedViewSet.as_view({'post': 'create'}), name='create_fcm_device'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
