# chat/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter

from . import views
from . import api

app_name = 'chat'

router = DefaultRouter()
router.register(r'msg', api.P2pChatModelViewSet, basename='message-api')
router.register(r'group/msg', api.GroupChatModelViewSet, basename='group-message-api')
# router.register(r'user/', api.UserModelSerializer, basename='user-api')

urlpatterns = [
    #  path('sample/', views.SampleView.as_view(), name='sample'),

    path('', views.ChatRoom.as_view(), name='chat'),
    path('update/session/', views.update_session, name='update-session'),
    path(r'api/chat/', include(router.urls)),

    path('grp/create/', views.GroupCreateView.as_view(), name='group-create'),
    path('grp/update/', views.GroupUpdateView.as_view(), name='group-update'),

    # Features
    path('api/msg/read/<int:pk>/', views.ReadUnReadMessage.as_view(), name='read-private-unread-msg'),
    path('api/group/msg/read/<int:pk>/', views.ReadGroupUnReadMessage.as_view(), name='read-group-unread-msg'),
    path('api/unread/msg/<int:pk>/', api.UnSeenMessageViewAPI.as_view(), name='api-unseen-private-msg'),
    path('api/unread/group/msg/<int:pk>/', api.GroupUnSeenMessageViewAPI.as_view(), name='api-unseen-group-msg'),

    # Delete Chat Message
    path('api/sender/msg/delete/<int:pk>/', views.DeleteSenderChatMessage.as_view(), name='api-delete-msg-sender'),
    path('api/sender/msg/delete/self/<int:pk>/', views.DeleteSenderChatMessageSelf.as_view(), name='api-delete-msg'
                                                                                                   '-sender-self'),
    path('api/receiver/msg/delete/<int:pk>/', views.DeleteReceiveChatMessage.as_view(), name='api-delete-msg-receiver'),

    path('api/chat/delete/combine/msg/<int:pk>/', views.DeleteCombineMessage.as_view(), name='api-delete-combine-msg'),
    path('api/chat/clear/all/chat/<int:pk>/', views.ClearAllChat.as_view(), name='api-clear-all-chat'),

    path('api/group/sender/msg/delete/<int:pk>/', views.DeleteSenderGroupChatMessage.as_view(), name='api-group'
                                                                                                     '-delete-msg'
                                                                                                     '-sender'),
    path('api/group/sender/msg/delete/self/<int:pk>/', views.DeleteSenderGroupChatMessageSelf.as_view(), name='api'
                                                                                                              '-group'
                                                                                                              '-delete-msg-sender-self'),
    path('api/group/receiver/msg/delete/<int:pk>/', views.DeleteReceiveGroupChatMessage.as_view(), name='api-group'
                                                                                                        '-delete-msg'
                                                                                                        '-receiver'),
    path('api/group/clear/all/chat/<int:pk>/', views.ClearAllGroupChat.as_view(), name='api-clear-all-group-chat'),
    path('api/group/combine/delete/<int:pk>/', views.DeleteCombineGroupMessage.as_view(),
        name='api-combine-group-chat'),

    path('upload/', views.Upload.as_view(), name='upload-data'),

    path('group/member/list/<int:pk>/', views.GroupMemberListView.as_view(), name='group-member-list'),

    path('remove/from/group/<int:group_id>/<int:user_id>/', views.RemoveFromGroupView.as_view(), name='remove-from'
                                                                                                      '-group'),
    path('leave/from/group/<int:group_id>/<int:user_id>/', views.LeaveFromGroup.as_view(), name='leave-group'),
    path('delete/group/', views.DeleteGroupView.as_view(), name='delete-group'),
    path('add/member/group/', views.AddMemberToGroupView.as_view(), name='add-member-group'),

    path('video/call/', views.VideoCallView.as_view(), name='video-call1'),

    path('call/video/', views.StartVideoCall.as_view(), name='video-call'),
    path('video/<str:app_name>/<str:encrypt_group_name>/', views.VideoCallReceiver.as_view(), name='video-receiver'),

    path('call/audio/', views.StartAudioCall.as_view(), name='audio-call'),
    path('audio/<str:encrypt_group_name>/', views.AudioCallReceiver.as_view(), name='audio-receiver'),
    path('video/end/<str:encrypt_group_name>/', views.EndCall.as_view(), name='video-end'),
    path('audio/end/<str:encrypt_group_name>/', views.EndCall.as_view(), name='audio-end'),
    path('call/participant/<int:pk>/', views.CallParticpantInfo.as_view(), name='call-participant'),
    path('loadmore/remaining_users/', views.LoadMoreRemainingUsers.as_view(), name='load-more-remaining-users'),

    path('get/user/notification/', views.GetNewNotification.as_view(), name='user-new-notification'),
    path('delete/user/notification/', views.DeleteNotification.as_view(), name='user-delete-notification'),
]
