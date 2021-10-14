from django.contrib import admin
from django.urls import path, include
from django.conf.urls.static import static
from django.conf import settings
import debug_toolbar

from home import views


urlpatterns = [
    path('admin/', admin.site.urls),
    path('user/', include('users.urls')),
    path('chat/', include('chat.urls')),
    path('', include('home.urls')),

    path('', views.handler403),
    path('', views.handler404),
    path('', views.handler500),
    path('__debug__/', include(debug_toolbar.urls)),
]

handler403 = 'home.views.handler403'
handler404 = 'home.views.handler404'
handler500 = 'home.views.handler500'

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

