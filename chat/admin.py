from django.contrib import admin
from .models import Message, P2pChatModel, GroupChatModel, GroupChat, GroupChatUnreadMessage, UploadedMedia, UserMedia
# Register your models here.
from .models import GroupCallHistory
class P2pChatModelAdmin(admin.ModelAdmin):
    list_display = ['id', 'user', 'recipient','body', 'timestamp','read',]

class GroupChatModelAdmin(admin.ModelAdmin):
    list_display = ['id', 'user', 'group', 'body', 'timestamp']

admin.site.register(Message)
admin.site.register(GroupChatUnreadMessage)
admin.site.register(GroupChatModel)
admin.site.register(GroupChat, GroupChatModelAdmin)
admin.site.register(P2pChatModel, P2pChatModelAdmin)
admin.site.register(UploadedMedia)
admin.site.register(UserMedia)
admin.site.register(GroupCallHistory)
