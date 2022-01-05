from django.conf import settings
from django.conf.urls import static
from django.urls import path
from django.views import View

from . import views

app_name = 'Competion'

urlpatterns = [
    path('list/', views.CompetionList.as_view(), name='competionlist'),
    path('detail/<int:pk>/', views.CompetionDetail.as_view(), name='detail'),
    path('submissions/<int:pk>/', views.UserSubmissionView.as_view(), name='user-submissions'),
    path('participate/', views.ParticipateView.as_view(), name='participate'),
]
if settings.DEBUG:
    urlpatterns += static.static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    urlpatterns += static.static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)