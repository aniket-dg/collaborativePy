from django.contrib import admin
from .models import Plan, Payment, Coupon
# Register your models here.
admin.site.register(Plan)
admin.site.register(Payment)
admin.site.register(Coupon)