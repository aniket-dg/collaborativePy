from django.contrib import admin
from .models import Contact, NewsLetter, TPP, PopUpQuestions, Faq, Ad

admin.site.register(Contact)
admin.site.register(NewsLetter)
admin.site.register(TPP)
admin.site.register(PopUpQuestions)
admin.site.register(Faq)
admin.site.register(Ad)