from django.contrib import admin

from .models import User, Connection, CodeRoomSize


class UserAdmin(admin.ModelAdmin):
    search_fields = ['username', 'email','first_name', 'last_name',
                    'phone_number']

admin.site.register(User, UserAdmin)
admin.site.register(Connection)
admin.site.register(CodeRoomSize)

