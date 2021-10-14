from django.conf import settings
from django.conf.urls import static
from django.urls import path
from django.views.generic import TemplateView

from . import views

app_name = 'home'

urlpatterns = [
    path('', views.Home.as_view(), name='home'),
    path('contact/', views.ContactView.as_view(), name='contact'),
    path('newsletter', views.NewsLetterCreateView.as_view(), name='news-letter'),

    path('about/', TemplateView.as_view(template_name="home/about.html"), name='about'),
    path('contact/', TemplateView.as_view(template_name="home/contact.html"), name='contact'),

    path('policy/<str:page_name>/', views.Terms.as_view(), name='terms'),
    path('sitemap.xml/', TemplateView.as_view(template_name='home/sitemap.html'), name='sitemap'),
    path('robots.txt/', TemplateView.as_view(template_name='home/robots.html'), name='robots'),
]
if settings.DEBUG:
    urlpatterns += static.static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    urlpatterns += static.static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)