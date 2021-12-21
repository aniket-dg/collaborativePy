from django.urls import path, include
from django.contrib.auth import views as auth_views
from django.conf.urls.static import static
from django.conf import settings

from . import views

app_name='user'

urlpatterns = [
    # Social Login
    path('oauth/', include('social_django.urls', namespace='social')),

    # Login and Register
    path('login/', views.LoginView.as_view(), name='login'),
    path('register/', views.SignUpView.as_view(), name='register'),
    path('logout/', views.LogoutView.as_view(), name='logout'),

    # Update User profile
    path('update/<int:pk>/', views.UserUpdateView.as_view(), name='update'),

    # Password
    path('change-password/', auth_views.PasswordChangeView.as_view(template_name='users/password_change.html'),
         name='password_change'),
    path('change-password-done/',
         auth_views.PasswordChangeDoneView.as_view(template_name='users/password_change_done.html'),
         name='password_change_done'),
    path('password-reset/', auth_views.PasswordResetView.as_view(template_name='users/password_reset.html'),
         name='password_reset'),
    path('password-reset/done/',
         auth_views.PasswordResetDoneView.as_view(template_name='users/password_reset_done.html'),
         name='password_reset_done'),
    path('password-reset-confirm/<uidb64>/<token>/',
         auth_views.PasswordResetConfirmView.as_view(template_name='users/password_reset_confirm.html'),
         name='password_reset_confirm'),
    path('password-reset-complete/',
         auth_views.PasswordResetCompleteView.as_view(template_name='users/password_reset_complete.html'),
         name='password_reset_complete'),

    path('bookmark/list/', views.BookMarkListView.as_view(), name='bookmark-list'),
    path('profile/', views.UserProfileView.as_view(), name='profile'),
    path('connections/', views.UserConnection.as_view(), name='connections'),
    path('accept/request/', views.AcceptUserRequest.as_view(), name='accept-user'),
    path('send/request/', views.SendUserRequest.as_view(), name='send-request'),

    path('profile/<int:pk>/', views.UserFriendProfileView.as_view(), name='friend-profile'),


    # Userdate urls
    path('userdata/', views.UserData.as_view(), name='userdata'),

    path('send/user/request/<int:user_id>/', views.SendRequest.as_view(), name='send-user-request'),
    path('accept/user/request/<int:id>/', views.AcceptRequest.as_view(), name='accept-user-request'),

]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)