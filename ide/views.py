from django.shortcuts import render

# Create your views here.
from django.views import View

class HomeView(View):
    def get(self, *args, **kwargs):
        return render(self.request, "ide/index.html")