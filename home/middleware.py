from urllib.parse import urlparse

from django.shortcuts import redirect
from django.utils.deprecation import MiddlewareMixin


class MyMiddleware(MiddlewareMixin):

    def process_request(self, request):
        if request.user.is_authenticated and request.user.is_company_user():
            if '/chat/' in request.path or '/media/' in request.path:
                return None
            elif '/company/' not in request.path:
                return redirect('company:home')
        return None
