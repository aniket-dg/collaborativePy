# chat/routing.py
from django.urls import re_path, path

from . import consumers

websocket_urlpatterns = [

    # re_path(r'ws/chat/(?P<room_name>\w+)/$', consumers.ChatConsumer.as_asgi()),
    # re_path(r'ws/chat/p/<str:sender>/<str:receiver>/', consumers.P2pConsumer.as_asgi()),
    path('ws/chat/p/<str:sender>/<str:receiver>/', consumers.P2pConsumer.as_asgi()),
    path('ws/chat/group/<str:group_name>/<str:sender>/', consumers.GroupConsumer.as_asgi()),
    # path('ws/chat/personal/<str:sender>/', consumers.PersonalConsumer.as_asgi()),
]