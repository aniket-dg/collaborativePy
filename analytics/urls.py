from django.urls import path
from . import views

app_name = 'analytics'

urlpatterns = [
    path('plan/create/', views.PlanCreateView.as_view(), name='plan-create'),
    path('plan/list/', views.PlanListView.as_view(), name='plan-list'),
    path('plan/update/<int:pk>/', views.PlanUpdateView.as_view(), name='plan-update'),
    path('plan/detail/<int:pk>/', views.PlanDetailView.as_view(), name='plan-detail'),
    path('plan/delete/<int:pk>/', views.PlanDeleteView.as_view(), name='plan-delete'),

    path('post/create/', views.PostCreateView.as_view(), name='post-create'),
    path('post/list/', views.PostListView.as_view(), name='post-list'),
    path('post/update/<int:pk>/', views.PostUpdateView.as_view(), name='post-update'),
    path('post/detail/<int:pk>/', views.PostDetailView.as_view(), name='post-detail'),
    path('post/delete/<int:pk>/', views.PostDeleteView.as_view(), name='post-delete'),

    path('contact/list/', views.ContactListView.as_view(), name='contact-list'),
    path('contact/status/update/<int:pk>/', views.ContactStatusUpdateView.as_view(), name='contact-update'),
    path('contact/delete/<int:pk>/', views.ContactDeleteView.as_view(), name='contact-delete'),

    path('flag/inappropriate/list/', views.FlagInappropriateListView.as_view(), name='flag_inappropriate-list'),
    path('flag/inappropriate/delete/<int:pk>/', views.FlagInappropriateDeleteView.as_view(), name='flag_inappropriate'
                                                                                                  '-delete'),
    path('user/list/', views.UserListView.as_view(), name='user-list'),
    path('user/detail/<int:pk>/', views.UserDetailView.as_view(), name='user-detail'),
    path('user/plan/change/',  views.UserPlanUpdateView.as_view(), name='user-plan-update'),
]