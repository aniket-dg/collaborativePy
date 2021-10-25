from django.views import View
from django.contrib.auth import get_user_model
from django.contrib.auth.decorators import login_required
from django.shortcuts import render
from django.utils.safestring import mark_safe
import json

User = get_user_model()


@login_required
def room(request, room_name):
    return render(request, 'chat/room.html', {
        'room_name_json': mark_safe(json.dumps(room_name)),
        'username': mark_safe(json.dumps(request.user.username)),
    })


class ChatView(View):
    def get(self, *args, **kwargs):
        context = {}
        return render(self.request, 'chat/main.html', context)


