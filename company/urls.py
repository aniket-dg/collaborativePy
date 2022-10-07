from django.urls import path
from . import views
app_name = 'company'

urlpatterns = [
    path('home/', views.HomeView.as_view(), name='home'),
    path('info/', views.CompanyCreateView.as_view(), name='company-create'),
    path('user/view/', views.CompanyUserView.as_view(), name='company-user-view'),
    path('user/list/', views.UserListView.as_view(), name='user-list'),
    path('user/detail/<int:pk>/', views.UserDetailView.as_view(), name='user-detail'),
    path('user/approve/<int:pk>/', views.ApproveUserView.as_view(), name='user-approve'),
    path('user/disapprove/<int:pk>/', views.DisapproveUserView.as_view(), name='user-disapprove'),
    path('update/<int:pk>/', views.CompanyUpdateView.as_view(), name='info-update'),
]