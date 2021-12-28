# mysite/asgi.py
import os

from channels.auth import AuthMiddlewareStack
from channels.routing import ProtocolTypeRouter, URLRouter
from django.core.asgi import get_asgi_application
import chat.routing

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "mysite.settings")

application = ProtocolTypeRouter({
  "http": get_asgi_application(),
  "websocket": AuthMiddlewareStack(
        URLRouter(
            chat.routing.websocket_urlpatterns
        )
    ),
})

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