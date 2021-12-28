from django.conf import settings
from django.conf.urls import static
from django.urls import path
from django.views.generic import TemplateView

from . import views

app_name = 'home'

urlpatterns = [
    path('', views.Home.as_view(), name='home'),
    path('contact/', views.ContactView.as_view(), name='contact'),
    path('newsletter/', views.NewsLetterCreateView.as_view(), name='news-letter'),

    path('about/', TemplateView.as_view(template_name="home/about.html"), name='about'),
    path('contact/', TemplateView.as_view(template_name="home/contact.html"), name='contact'),
    path('social/', TemplateView.as_view(template_name="home/social_base.html"), name='social'),

    path('tdashboard/', TemplateView.as_view(template_name="users/dashboard.html"), name='db'),
    path('tchat/', TemplateView.as_view(template_name="chat/chat-direct.html"), name='ct'),
    path('tfeed/', TemplateView.as_view(template_name="home/feeds.html"), name='tfeeds'),
    path('tbookmark/', TemplateView.as_view(template_name="home/bookmark.html"), name='tbook'),
    path('tprofile/', TemplateView.as_view(template_name="users/profile.html"), name='tprof'),

    path('policy/<str:page_name>/', views.Terms.as_view(), name='terms'),
    path('sitemap.xml/', TemplateView.as_view(template_name='home/sitemap.html'), name='sitemap'),
    path('robots.txt/', TemplateView.as_view(template_name='home/robots.html'), name='robots'),

    path('popUp_questions/', views.PopUp.as_view(), name='pop-up'),

    path('plan/', views.PlanListView.as_view(), name='plan-list'),
]
if settings.DEBUG:
    urlpatterns += static.static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    urlpatterns += static.static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)