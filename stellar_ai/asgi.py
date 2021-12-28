import os

from django.core.asgi import get_asgi_application
from channels.auth import AuthMiddlewareStack
from channels.routing import ProtocolTypeRouter, URLRouter
from django.urls import path

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "stellar_ai.settings")
django_asgi_app = get_asgi_application()

from chat import consumers

application = ProtocolTypeRouter({
    "http": django_asgi_app,

    "websocket": AuthMiddlewareStack(
        URLRouter([
            path('ws/chat/p/<str:sender>/<str:receiver>/', consumers.P2pConsumer.as_asgi()),
            path('ws/chat/group/<str:group_name>/<str:sender>/', consumers.GroupConsumer.as_asgi()),
            path('ws/video/meet/<str:group_name>/', consumers.VideoCallConsumer.as_asgi()),
        ])
    ),
})
<<<<<<< HEAD
=======

import os

from channels.auth import AuthMiddlewareStack
from channels.routing import ProtocolTypeRouter, URLRouter
from django.urls import path
from django.core.asgi import get_asgi_application

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "stellar_ai.settings")
django_asgi_app = get_asgi_application()

from chat import consumers

application = ProtocolTypeRouter({
    "http": django_asgi_app,

    "websocket": AuthMiddlewareStack(
        URLRouter([
            path('ws/chat/p/<str:sender>/<str:receiver>/', consumers.P2pConsumer.as_asgi()),
            path('ws/chat/group/<str:group_name>/<str:sender>/', consumers.GroupConsumer.as_asgi()),
            path('ws/video/meet/<str:group_name>/', consumers.VideoCallConsumer.as_asgi()),
        ])
    ),
})
>>>>>>> f4e418d3419e2f9f60344a6d77a009508778999a
