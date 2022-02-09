from django.urls import path
from . import views

app_name = 'order'

urlpatterns = [
    path('payment/request/', views.payu_view,name='payment-request'),
    path('payment/response/', views.PaymentResponseView.as_view(),name='payment-response'),

]