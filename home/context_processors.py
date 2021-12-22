import datetime
from chat.models import P2pChatModel, GroupChatModel, GroupChatUnreadMessage


def get_current_year_to_context(request):
    current_datetime = datetime.datetime.now()
    context = {}
    if 'offer' in request.session or request.user.is_authenticated:
        context['offer'] = 'offer'
    context['current_year'] = current_datetime.year
    return context


def get_email(request):
    context = {'info_mail': 'info@stellar.ai'}
    return context


# Website url (sitemap)
def get_website_url(request):
    context = {'website_url': 'stellar.ai'}
    return context

def get_friend_requests(request):
    users = []
    if not request.user.is_anonymous:
        users = request.user.get_user_received_users()
    context = {
        'all_friend_requests': users,
    }
    return context

def get_new_messages(request):
    p2p_unread_messages = []
    group_unread_messages = []
    total_count = 0
    if not request.user.is_anonymous:
        current_user = request.user
        p2p_unread_messages_temp = P2pChatModel.objects.filter(recipient=current_user, read=False).select_related('user')
        
        # showing only the newest msg from a particular user
        id_list = []
        for msg in p2p_unread_messages_temp:
            if msg.user.id not in id_list:
                id_list.append(msg.user.id)
                p2p_unread_messages.append(msg)
            else:
                pass

        for group in current_user.groups.all():
            grp_msg = group.from_group.exclude(user_read=current_user).first()
            if grp_msg:
                group_unread_messages.append(grp_msg)
        
        total_count = len(p2p_unread_messages) + len(group_unread_messages)  # One message per user count

    context = {
        'p2p_unread_messages': p2p_unread_messages,
        'group_unread_messages': group_unread_messages,
        'total_message_count': total_count
    }
    return context