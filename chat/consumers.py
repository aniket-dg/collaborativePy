# chat/consumers.py
import json
from asgiref.sync import async_to_sync
from channels.consumer import SyncConsumer
from channels.generic.websocket import WebsocketConsumer
import json

# from django.contrib.auth import get_user_model
from django.shortcuts import get_object_or_404

from users.models import User
from .models import Message, P2pChatModel, GroupChatModel, GroupChat, GroupChatUnreadMessage, UserMedia
from channels.layers import get_channel_layer
from channels.generic.websocket import AsyncWebsocketConsumer


class P2pConsumer(WebsocketConsumer):

    def fetch_messages(self, data):
        a = Message()
        messages = Message.last_10_messages(a)
        content = {
            'command': 'messages',
            'messages': self.messages_to_json(messages)
        }
        self.send_message(content)

    def new_message(self, data):
        # author = data['from']
        # author_user = User.objects.filter(username=author)[0]
        # message = Message.objects.create(
        #     author=author_user,
        #     content=data['message'])
        content = {
            'command': 'new_message',
            'message': data
        }
        return self.send_chat_message(content)

    def messages_to_json(self, messages):
        result = []
        for message in messages:
            result.append(self.message_to_json(message))
        return result

    def message_to_json(self, message):
        return {
            'author': message.author.username,
            'content': message.content,
            'timestamp': str(message.timestamp)
        }

    commands = {
        'fetch_messages': fetch_messages,
        'new_message': new_message,
    }

    def connect(self):
        try:
            sender = self.scope['url_route']['kwargs']['sender']
            receiver = self.scope['url_route']['kwargs']['receiver']
            a = int(sender)
            b = int(receiver)
            a, b = min(a, b), max(a, b)
            self.sender = User.objects.filter(id=sender).last()
            self.room_group_name = f"chat_{a}-{b}"
            # self.room_group_name = 'chat_%s' % self.group_name
            # Join room group
            async_to_sync(self.channel_layer.group_add)(
                self.room_group_name,
                self.channel_name
            )
            self.accept()
        except Exception as e:
            pass

    def disconnect(self, close_code):
        async_to_sync(self.channel_layer.group_discard)(
            self.room_group_name,
            self.channel_name
        )

    def save_single_message(self, data):
        try:
            user = self.sender
            recipient = get_object_or_404(
                User, email=data['receiver_id'])
            msg = P2pChatModel(recipient=recipient, body=data['message'], user=user)
            msg.save()

            # code to attach media to chat
            is_media_present = data['bucket_id']
            if is_media_present and int(is_media_present) != 0:
                bucket = UserMedia.objects.filter(id=is_media_present).last()
                if bucket:
                    for item in bucket.files.all():
                        item.is_valid = True
                        item.save()
                    bucket.access_by.add(msg.recipient)
                    bucket.save()
                    msg.bucket = bucket
                    msg.is_media_present = True
                    msg.save()
            # end
            return msg.id, recipient.id
        except Exception as e:
            print(e)

    def receive(self, text_data):
        data = json.loads(text_data)
        print(data, "Anu")
        msg_id, receiver_id = self.save_single_message(data)
        async_to_sync(self.channel_layer.group_send)(
            self.room_group_name,
            {
                'type': 'chat_message',
                'message': {'id': msg_id, 'sender_id': self.sender.id, 'receiver_id': receiver_id,
                            'type': 'new_message'}
            }
        )

    def send_chat_message(self, message):
        async_to_sync(self.channel_layer.group_send)(
            self.room_group_name,
            {
                'type': 'chat_message',
                'message': message
            }
        )

    def send_message(self, message):
        self.send(text_data=json.dumps(message))

    def chat_message(self, event):
        message = event['message']
        self.send(text_data=json.dumps(message))


class GroupConsumer(WebsocketConsumer):

    def new_message(self, data):
        content = {
            'command': 'new_message',
            'message': data
        }
        return self.send_chat_message(content)

    def messages_to_json(self, messages):
        result = []
        for message in messages:
            result.append(self.message_to_json(message))
        return result

    def message_to_json(self, message):
        return {
            'author': message.author.username,
            'content': message.content,
            'timestamp': str(message.timestamp)
        }

    commands = {
        'new_message': new_message,
    }

    def connect(self):
        try:
            grp_name = self.scope['url_route']['kwargs']['group_name']
            sender = self.scope['url_route']['kwargs']['sender']
            self.group = GroupChatModel.objects.filter(name=grp_name).last()
            self.room_group_name = f"chat_group_{grp_name}"
            self.sender = User.objects.filter(id=sender).last()
            async_to_sync(self.channel_layer.group_add)(
                self.room_group_name,
                self.channel_name
            )
            self.accept()
        except Exception as e:
            pass

    def disconnect(self, close_code):
        async_to_sync(self.channel_layer.group_discard)(
            self.room_group_name,
            self.channel_name
        )

    def save_single_message(self, data):
        try:
            user = self.sender
            group = self.group
            msg = GroupChat(user=user, body=data['message'], group=group)
            msg.save()
            msg.user_read.add(self.sender)
            msg.save()

            # code to attach media to chat
            is_media_present = data['bucket_id']
            if is_media_present and int(is_media_present) != 0:
                bucket = UserMedia.objects.filter(id=is_media_present).last()
                if bucket:
                    for item in bucket.files.all():
                        item.is_valid = True
                        item.save()
                    bucket.save()
                    users = User.objects.filter(groups__in=[self.group])
                    for user in users:
                        bucket.access_by.add(user)
                    bucket.save()
                    msg.bucket = bucket
                    msg.is_media_present = True
                    msg.save()
            # end

            return msg.id, msg.group.id
        except Exception as e:
            pass

    def receive(self, text_data):
        data = json.loads(text_data)

        msg_id, group_id = self.save_single_message(data)
        async_to_sync(self.channel_layer.group_send)(
            self.room_group_name,
            {
                'type': 'chat_message',
                'message': {'id': msg_id, 'group_id': group_id}
            }
        )
        print(data, "Send from grp save")
        # self.commands[data['command']](self, data)

    def send_chat_message(self, message):
        print(message, "send_chat_message")
        async_to_sync(self.channel_layer.group_send)(
            self.room_group_name,
            {
                'type': 'chat_message',
                'message': message
            }
        )

    def send_message(self, message):
        self.send(text_data=json.dumps(message))

    def chat_message(self, event):
        message = event['message']
        self.send(text_data=json.dumps(message))


class VideoCallConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        grp_name = self.scope['url_route']['kwargs']['group_name']

        self.room_group_name = grp_name
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )

        await self.accept()

    async def disconnect(self, code):
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )
        print("Disconnected")

    async def receive(self, text_data=None, bytes_data=None):
        try:
            receive_dict = json.loads(text_data)
            print(receive_dict)
            message = receive_dict['message']
            action = receive_dict['action']
            print(message['receiver_channel_name'], action)
            if action == 'new-offer' or action == 'new-answer':
                receive_channel_name = receive_dict['message']['receiver_channel_name']
                receive_dict['message']['receiver_channel_name'] = self.channel_name
                await self.channel_layer.send(
                    receive_channel_name,
                    {
                        'type': 'send.sdp',
                        'receive_dict': receive_dict
                    }
                )
                return

            receive_dict['message']['receiver_channel_name'] = self.channel_name
            await self.channel_layer.group_send(
                self.room_group_name,
                {
                    'type': 'send.sdp',
                    'receive_dict': receive_dict
                }
            )
        except Exception as e:
            print(e)

    async def send_sdp(self, event):
        try:
            receive_dict = event['receive_dict']
            print(receive_dict)
            await self.send(text_data=json.dumps(receive_dict))
        except Exception as e:
            print("In send_sdp",e)