from django.urls import path, include
from django.contrib.auth import views as auth_views
from django.conf.urls.static import static
from django.conf import settings

from . import views


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
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)