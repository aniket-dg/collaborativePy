from push_notifications.models import GCMDevice
from django.templatetags.static import static
from django.shortcuts import redirect, render
from django.views import View
from push_notifications.api.rest_framework import GCMDeviceAuthorizedViewSet

# WEBPUSH
class NotificationPermission(View):
    def get(self, *args, **kwargs):
        return render(self.request, 'users/notification-permission.html')

class FCMDeviceAuthorizedViewSet(GCMDeviceAuthorizedViewSet):
    def perform_create(self, serializer):
        return serializer.save(user=self.request.user, cloud_message_type="FCM")

def create_FCM_device():
    # Create a FCM device
    fcm_device = GCMDevice.objects.create(registration_id="token", cloud_message_type="FCM", user=the_user)

    # Send a notification message
    fcm_device.send_message("This is a message")

    # Send a notification message with additionnal payload
    fcm_device.send_message("This is a enriched message", extra={"title": "Notification title", "icon": "icon_ressource"})

    # Send a notification message with additionnal payload (alternative syntax)
    fcm_device.send_message("This is a enriched message", title="Notification title", badge=6)

    # Send a notification message with extra data
    fcm_device.send_message("This is a message with data", extra={"other": "content", "misc": "data"})

    # Send a notification message with options
    fcm_device.send_message("This is a message", time_to_live=3600)

    # Send a data message only
    fcm_device.send_message(None, extra={"other": "content", "misc": "data"})

    # from push_notifications.gcm import send_message
    # First param is "None" because no Registration_id is needed, the message will be sent to all devices subscribed to the topic.
    send_message(None, {"body": "Hello members of my_topic!"}, to="/topics/my_topic")
def send_message(user_ids, title, message, data):
    device = GCMDevice.objects.get(registration_id=gcm_reg_id)
    # The first argument will be sent as "message" to the intent extras Bundle
    # Retrieve it with intent.getExtras().getString("message")
    device.send_message(
            "You've got mail",
            badge=lambda token: GCMDevice.objects.get(registration_id=token).user.get_badge()
        )
    # If you want to customize, send an extra dict and a None message.
    # the extras dict will be mapped into the intent extras Bundle.
    # For dicts where all values are keys this will be sent as url parameters,
    # but for more complex nested collections the extras dict will be sent via
    # the bulk message api.
    device.send_message(None, extra={"foo": "bar"})

def send_bulk_message():
    devices = GCMDevice.objects.filter(user__first_name="James")
    devices.send_message("Happy name day!")