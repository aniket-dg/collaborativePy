from django.urls import path
from . import views

app_name = 'order'

urlpatterns = [
    path('payment/request/<int:plan_id>/', views.PaymentRequestView.as_view(),name='payment-request'),
    path('payment/response/', views.PaymentResponseView.as_view(),name='payment-response'),

    path('more/storage/payment/request/<int:pk>/', views.MoreStoragePaymentRequestView.as_view(),name='more-storage-payment-request'),
    path('more/storage/payment/response/', views.MoreStoragePaymentResponseView.as_view(),name='more-storage-payment-response'),

    path('recur/', views.RecurringPaymentRequestView.as_view(), name='recurring-payment-request'),
    path('recur/notify/', views.PreDebitNotificationView.as_view(), name='predebit-notification'),
    path('payment/recurring/response/', views.RecurringPaymentResponseView.as_view(), name='recurring-payment-response'),
]