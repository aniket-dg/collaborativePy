from django.contrib import admin
from django.urls import path, include
from django.conf.urls.static import static
from django.conf import settings
import debug_toolbar
from django.views.generic import TemplateView
from home import views


urlpatterns = [
    path('admin/', admin.site.urls),
    path('user/', include('users.urls')),
    path('chat/', include('chat.urls')),
    path('order/', include('order.urls')),
    path('post/', include('post.urls')),
    path('competition/', include('competition.urls')),
    path('analytics/', include('analytics.urls')),
    path('', include('home.urls')),

    # Oauth
    path('o/', include('oauth2_provider.urls', namespace='oauth2_provider')),
    # Webpush
    path('messaging-sw.js', TemplateView.as_view(
                                                template_name='users/sw/messaging-sw.js',
                                                content_type='application/javascript',
                                ), name='messaging-sw.js'),

    path('', views.handler403),
    path('', views.handler404),
    path('', views.handler500),
    path('__debug__/', include(debug_toolbar.urls)),
    path(r'', include('user_sessions.urls', 'user_sessions')),
]

handler403 = 'home.views.handler403'
handler404 = 'home.views.handler404'
handler500 = 'home.views.handler500'

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

