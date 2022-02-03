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

    path('newsletter/list/', views.NewsLetterList.as_view(), name='newsletter-list'),
    path('newsletter/status/update/<int:pk>', views.NewsLetterStatusUpdate.as_view(), name='newsletter-update'),

    path('skeleton/post/create/', views.SkeletonPostCreateView.as_view(), name='skeleton-post-create'),
    path('skeleton/post/list/', views.SkeletonPostListView.as_view(), name='skeleton-post-list'),
    path('skeleton/post/delete/<int:pk>/', views.SkeletonPostDeleteView.as_view(), name='skeleton-post-delete'),
    path('skeleton/post/update/<int:pk>/', views.SkeletonPostUpdateView.as_view(), name='skeleton-post-update'),

    path('category/first/level/create/', views.FirstLevelCategoryCreateView.as_view(), name='first-level-category-create'),
    path('category/second/level/create/', views.SecondLevelCategoryCreateView.as_view(), name='second-level-category-create'),
    path('category/third/level/create/', views.ThirdLevelCategoryCreateView.as_view(), name='third-level-category-create'),
    path('category/fourth/level/create/', views.FourthLevelCategoryCreateView.as_view(), name='fourth-level-category-create'),

    path('category/first/level/update/<int:pk>/', views.FirstLevelUpdateView.as_view(), name='first-level-category-update'),
    path('category/second/level/update/<int:pk>/', views.SecondLevelUpdateView.as_view(), name='second-level-category-update'),
    path('category/third/level/update/<int:pk>/', views.ThirdLevelUpdateView.as_view(), name='third-level-category-update'),
    path('category/fourth/level/update/<int:pk>/', views.FourthLevelUpdateView.as_view(), name='fourth-level-category-update'),

    path('category/first/level/list/', views.FirstLevelCategoryListView.as_view(), name='first-level-category-list'),
    path('category/second/level/list/', views.SecondLevelCategoryListView.as_view(), name='second-level-category-list'),
    path('category/third/level/list/', views.ThirdLevelCategoryListView.as_view(), name='third-level-category-list'),
    path('category/fourth/level/list/', views.FourthLevelCategoryListView.as_view(), name='fourth-level-category-list'),

    path('category/first/level/delete/<int:pk>/', views.FirstLevelCategoryDeleteView.as_view(), name='first-level-category-delete'),
    path('category/second/level/delete/<int:pk>/', views.SecondLevelCategoryDeleteView.as_view(), name='second-level-category-delete'),
    path('category/third/level/delete/<int:pk>/', views.ThirdLevelCategoryDeleteView.as_view(), name='third-level-category-delete'),
    path('category/fourth/level/delete/<int:pk>/', views.FourthLevelCategoryDeleteView.as_view(), name='fourth-level-category-delete'),

    path('terms/<int:pk>/', views.TPPUpdateView.as_view(), name="terms-update"),

    path('scope/create/', views.ScopeCreateView.as_view(), name='scope-create'),
    path('language/create/', views.LanguageCreateView.as_view(), name='language-create'),

    path('scope/list/', views.ScopeListView.as_view(), name='scope-list'),
    path('language/list/', views.LanguageListView.as_view(), name='language-list'),

    path('scope/update/<int:pk>/', views.ScopeUpdateView.as_view(), name='scope-update'),
    path('language/update/<int:pk>/', views.LanguageUpdateView.as_view(), name='language-update'),

    path('language/delete/<int:pk>/', views.LanguageDeleteView.as_view(), name='language-delete'),
    path('scope/delete/<int:pk>/', views.ScopeDeleteView.as_view(), name='scope-delete'),

    path('competition/create/', views.CompetitionCreateView.as_view(), name="competition-create"),
    path('competition/list/', views.CompetitionListView.as_view(), name="competition-list"),
    path('competition/update/<int:pk>/', views.CompetitionUpdateView.as_view(), name="competition-update"),
    path('competition/detail/<int:pk>/', views.CompetitionDetailView.as_view(), name="competition-detail"),
    path('competition/delete/<int:pk>/', views.CompetitionDeleteView.as_view(), name="competition-delete"),

    path('faq/list/', views.FaqListView.as_view(), name="faq-list"),
    path('faq/create/', views.FaqCreateView.as_view(), name="faq-create"),
    path('faq/update/<int:pk>/', views.FaqUpdateView.as_view(), name="faq-update"),
    path('faq/delete/<int:pk>/', views.FaqDeleteView.as_view(), name="faq-delete"),

    path('ad/list/', views.AdListView.as_view(), name="ad-list"),
    path('ad/create/', views.AdCreateView.as_view(), name="ad-create"),
    path('ad/update/<int:pk>/', views.AdUpdateView.as_view(), name="ad-update"),
    path('ad/detail/<int:pk>/', views.AdDetailView.as_view(), name="ad-detail"),
    path('ad/delete/<int:pk>/', views.AdDeleteView.as_view(), name="ad-delete"),
] 