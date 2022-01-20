from push_notifications.models import GCMDevice
from django.contrib.auth.mixins import LoginRequiredMixin
from django.templatetags.static import static
from django.shortcuts import redirect, render
from django.views import View
from push_notifications.api.rest_framework import GCMDeviceAuthorizedViewSet

# WEBPUSH
class NotificationPermission(View):
    def get(self, *args, **kwargs):
        extra = {
            'title': 'Test title',
            'icon': 'https://picsum.photos/200',
            'image': 'https://picsum.photos/200',
            'url': '/',
            'time_to_live':3600,
            'other': 'content',
            'misc': 'some data',
        }
        send_notification([self.request.user.id], 'Hello world', extra)
        return render(self.request, 'users/notification_permission.html')

class FCMDeviceAuthorizedViewSet(GCMDeviceAuthorizedViewSet):
    def perform_create(self, serializer):
        return serializer.save(user=self.request.user, cloud_message_type="FCM")

# def create_FCM_device():
#     # Create a FCM device
#     # fcm_device = GCMDevice.objects.create(registration_id="token", cloud_message_type="FCM", user=the_user)

#     # Send a notification message
#     fcm_device.send_message("This is a message")
#     # Send a notification message with additional payload
#     fcm_device.send_message("This is a enriched message", extra={"title": "Notification title", "icon": "icon_ressource"})
#     # Send a notification message with additional payload (alternative syntax)
#     fcm_device.send_message("This is a enriched message", title="Notification title", badge=6)
#     # Send a notification message with options
#     fcm_device.send_message("This is a message", time_to_live=3600)
#     # Send a data message only
#     fcm_device.send_message(None, extra={"other": "content", "misc": "data"})
#     # from push_notifications.gcm import send_message
#     # First param is "None" because no Registration_id is needed, the message will be sent to all devices subscribed to the topic.
#     send_message(None, {"body": "Hello members of my_topic!"}, to="/topics/my_topic")

def send_notification(user_ids, message=None, extra={}):
    """Sends message to passed user_ids"""
    """ extra = {
        'title': 'Test Title',
        'icon': 'absolute_icon_resource_url',
        'image': 'absolute_image_resource_url',
        'badge': 'absolute_badge_url',
        'other': 'content',
        'misc': 'some data',
        'url': 'absolute or relative opened opened after clicking notification',
        'time_to_live':3600,
    }
    For topic messages
    # from push_notifications.gcm import send_message
    # First param is "None" because no Registration_id is needed, the message will be sent to all devices subscribed to the topic.
    send_message(None, {"body": "Hello members of my_topic!"}, to="/topics/my_topic")
    """
    defaults = {
        'icon': 'https://stellar-ai.in/static/images/logo/color-logo.png',
    }
    defaults.update(extra)
    print(defaults)
    try:
        fcm_devices = GCMDevice.objects.filter(user__id__in=user_ids)
        print(fcm_devices)
        fcm_devices.send_message(message, extra=defaults)
    except Exception as e:
        print(e)
        pass
    # The first argument will be sent as "message" to the intent extras Bundle
    # Retrieve it with intent.getExtras().getString("message")
    # fcm_device.send_message(None, extra={"other": "content", "misc": "data"})
    # badge=lambda token: GCMDevice.objects.get(registration_id=token).user.get_badge()
    # If you want to customize, send an extra dict and a None message.
    # the extras dict will be mapped into the intent extras Bundle.
    # For dicts where all values are keys this will be sent as url parameters,
    # but for more complex nested collections the extras dict will be sent via
    # the bulk message api.
    # fcm_device.send_message(None, extra={"foo": "bar"})