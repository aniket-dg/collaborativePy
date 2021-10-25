from django.urls import path, re_path
from django.conf.urls.static import static
from django.conf import settings
from . import views

app_name = 'chat'

urlpatterns = [
    path('', views.ChatView.as_view(), name='home'),
    re_path(r'^(?P<room_name>[^/]+)/$', views.room, name='room'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)