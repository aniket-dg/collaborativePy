from django.contrib import admin
from .models import Plan, Payment, Coupon, PlanWithQty, MoreStorage

# Register your models here.
admin.site.register(Plan)
admin.site.register(Payment)
admin.site.register(Coupon)
admin.site.register(PlanWithQty)
admin.site.register(MoreStorage)
