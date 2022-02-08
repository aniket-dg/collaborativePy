from django.contrib import messages
from django.shortcuts import render, redirect

# Create your views here.
from django.utils.decorators import method_decorator
from django.views import View
from datetime import datetime, timedelta

from django.views.decorators.csrf import csrf_exempt

from order.models import Plan, Payment, Coupon
from django.contrib.auth.mixins import LoginRequiredMixin
from django.conf import settings

from paywix.payu import Payu


payu_config = settings.PAYU_CONFIG
merchant_key = payu_config.get('merchant_key')
merchant_salt = payu_config.get('merchant_salt')
surl = payu_config.get('success_url')
furl = payu_config.get('failure_url')
mode = payu_config.get('mode')

payu = Payu(merchant_key, merchant_salt, surl, furl, mode)

class PaymentRequestView(LoginRequiredMixin, View):
    def get(self, *args, **kwargs):
        user = self.request.user
        plan_id = self.kwargs.get('plan_id')
        coupon_code = self.request.GET.get('coupon_code')
        plan = Plan.objects.filter(id=plan_id).last()
        if not plan:
            return redirect('/')
        order_id = f"{datetime.now()}_{user.id}"
        
        coupon = Coupon.objects.filter(code=coupon_code, is_active=True).last()
        if coupon:
            if user in coupon.used_by.all():
                messages.warning(self.request, 'Coupon already used.')
                coupon = None
            else:
                messages.success(self.request, 'Coupon applied.')
                coupon.used_by.add(user)

        payment = Payment(plan=plan, order_id=order_id, coupon=coupon)
        payment.amt_paid = 0

        # valid till
        today = datetime.now().date()
        valid_till = today + timedelta(int(plan.duration))
        payment.valid_till = valid_till
        payment.save()

        import uuid
        payload = {
            "amount": plan.cost,
            "firstname": self.request.user.first_name,
            "email": self.request.user.email,
            "phone": self.request.user.phone_number,
            "lastname": self.request.user.last_name,
            "productinfo": plan.title,
            # "address1": "",
            # "address2": "Test Address 2",
            # "city": "Test city",
            # "state": "Test state",
            # "country": "Test country",
            # "zipcode": 673576,
            "txnid": uuid.uuid1()
        }
        payu_data = payu.transaction(**payload)
        context = {'payment_id': payment.id, 'posted': payu_data}
        return render(self.request, 'order/payment_redirect.html', context=context)


@method_decorator(csrf_exempt, name='dispatch')
class PaymentResponseView(LoginRequiredMixin, View):
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
                # remaining_days = user.remaining_days() - 1
                # valid_till = payment.valid_till + timedelta(int(remaining_days))
                # payment.valid_till = valid_till
                payment.save()
                payment.total_group_create_size = old_payment.total_group_create_size + payment.plan.total_group_create_size
                # payment.group_size = max(old_payment.group_size, payment.plan.group_size)
                payment.save()
                old_plans = old_payment.plans.all()
                for item in old_plans:
                    payment.plans.add(item)
                    payment.save()
                payment.plans.add(payment.plan)
                payment.save()
                user.payment = payment
                user.save()
            else:
                user.payment = payment
                payment = user.payment
                payment.save()
                payment.plans.add(payment.plan)
                payment.save()
                user.save()
            messages.success(self.request, "Payment Success!")
            return redirect('home:home')
        else:
            print("Payment Fail!")
            messages.warning(self.request, "Payment Fail!")
            return redirect('home:home')


