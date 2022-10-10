from urllib.parse import urlparse

from django.shortcuts import redirect
from django.utils.deprecation import MiddlewareMixin


class MyMiddleware(MiddlewareMixin):

    def process_request(self, request):
        unauthorized_urls = [
            '/analytics/','/competition/', '/post/'
        ]

        if request.user.is_authenticated and request.user.is_company_user():
            # if '/chat/' in request.path or '/media/' in request.path or '/order/' in request.path or 'user/' in request.path or 'jupyter' in request.path:
            #     return None
            # elif '/company/' not in request.path:
            #     return redirect('company:home')

            if request.path == '/plan/':
                return redirect('company:plan')
            for item in unauthorized_urls:
                if item in request.path:
                    return redirect('company:home')
        return None
