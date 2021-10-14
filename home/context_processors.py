import datetime


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
