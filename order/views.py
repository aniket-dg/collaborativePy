from django.contrib import messages
from django.shortcuts import render, redirect

# Create your views here.
from django.utils.decorators import method_decorator
from django.views import View
from datetime import datetime, timedelta

from django.views.decorators.csrf import csrf_exempt

from order.models import Plan, Payment



class PaymentRequestView(View):
    def get(self, *args, **kwargs):
        user = self.request.user
        plan_id = self.kwargs.get('plan_id')
        plan = Plan.objects.filter(id=plan_id).last()
        if not plan:
            return redirect('/')
        order_id = f"{datetime.now()}_{user.id}"
        payment = Payment(plan=plan, order_id=order_id)
        payment.amt_paid = 0

        # valid till
        today = datetime.now().date()
        valid_till = today + timedelta(int(plan.duration))
        payment.valid_till = valid_till
        payment.save()
        context = {'payment_id': payment.id}
        return render(self.request, 'order/payment_redirect.html', context=context)


@method_decorator(csrf_exempt, name='dispatch')
class PaymentResponseView(View):
    def post(self, *args, **kwargs):
        payment_id = self.request.POST.get('payment_id')
        payment = Payment.objects.filter(id=int(payment_id)).last()
        print("Payment")
        if payment:
            payment.paid = True
            payment.save()
            user = self.request.user
            if user.payment:
                old_payment = user.payment
                remaining_days = user.remaining_days() - 1
                valid_till = payment.valid_till + timedelta(int(remaining_days))
                payment.valid_till = valid_till
                payment.save()
                user.payment = payment
                user.save()
            else:
                user.payment = payment
                user.save()
            messages.success(self.request, "Payment Success!")
            return redirect('home:home')
        else:
            print("Payment Fail!")
            messages.warning(self.request, "Payment Fail!")
            return redirect('home:home')


