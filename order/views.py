from django.contrib import messages
from django.http import HttpResponse
from django.shortcuts import render, redirect

# Create your views here.
from django.utils.decorators import method_decorator
from django.views import View
from datetime import datetime, timedelta

from django.views.decorators.csrf import csrf_exempt

from order.models import Plan, Payment, Coupon, PlanWithQty
from django.contrib.auth.mixins import LoginRequiredMixin
from django.conf import settings

from paywix.payu import Payu

from users.models import User

payu_config = settings.PAYU_CONFIG
merchant_key = payu_config.get('merchant_key')
merchant_salt = payu_config.get('merchant_salt')
surl = payu_config.get('success_url')
furl = payu_config.get('failure_url')
mode = payu_config.get('mode')

payu = Payu(merchant_key, merchant_salt, surl, furl, mode)

from payu.gateway import get_hash
from uuid import uuid4


class PaymentRequestView(LoginRequiredMixin, View):
    def get(self, *args, **kwargs):
        user = self.request.user
        plan_id = self.kwargs.get('plan_id')
        coupon_code = self.request.GET.get('coupon_code')
        plan_with_qty = self.request.GET.get('renew')
        plan_with_qty_id = self.request.GET.get('upgrade_id')
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
                pass
                # messages.success(self.request, 'Coupon applied.')
                # coupon.used_by.add(user)
        else:
            coupon = None
        payment = Payment(plan=plan, order_id=order_id, coupon=coupon)
        payment.amt_paid = 0
        if coupon:
            payment.coupon_discount = coupon.discount_percent
        # valid till
        today = datetime.now().date()
        valid_till = today + timedelta(int(plan.duration))
        payment.valid_till = valid_till
        payment.save()
        coupon_applied = 0
        if coupon:
            coupon_applied = coupon.id
        import uuid
        payload = {
            "amount": payment.get_calculated_price(),
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
            "txnid": str(uuid.uuid1())
        }
        payu_data = payu.transaction(**payload)
        if plan_with_qty:
            plan_with_qty = plan_with_qty_id
        else:
            plan_with_qty = 0
        import hashlib
        hash = hashlib.sha512(
            str(f"{merchant_key}|{payload['txnid']}|{payment.get_calculated_price()}|{plan.title}|{self.request.user.first_name}|{self.request.user.email}|{payment.id}|{self.request.user.id}|{coupon_applied}|{plan_with_qty}|||||||{merchant_salt}").encode(
                "utf-8")).hexdigest()

        context = {'payment_id': payment.id, 'posted': payu_data}
        context['hashh'] = hash
        context['plan_with_qty'] = plan_with_qty
        context['payment'] = payment
        context['coupon_applied'] = coupon_applied
        return render(self.request, 'order/payment_redirect.html', context=context)


@method_decorator(csrf_exempt, name='dispatch')
class PaymentResponseView(View):
    def post(self, *args, **kwargs):
        print(self.request.POST)
        payment_id = self.request.POST.get('udf1')
        user_id = self.request.POST.get('udf2')
        coupon_id = self.request.POST.get('udf3')
        is_upgradable_plan = self.request.POST.get('udf4')

        payment = Payment.objects.filter(id=int(payment_id)).last()
        print("Payment")
        print(self.request.POST)
        print(self.request.GET)

        if payment:
            if not self.request.POST.get('status') == "success":
                payment.payu_dict = self.request.POST
                payment.save()
                messages.warning(self.request, self.request.POST.get('error_Message'))
                return redirect('home:plan-list')
            payment.paid = True
            payment.amt_paid = self.request.POST.get('amount')
            payment.payu_dict = self.request.POST
            payment.save()
            user = User.objects.filter(id=int(user_id)).last()
            if coupon_id != 0:
                coupon = Coupon.objects.filter(id=coupon_id).last()
                if coupon:
                    coupon.used_by.add(user)
                    coupon.save()
            if user and user.payment:
                old_payment = user.payment
                new_plan = payment.plan
                if is_upgradable_plan != 0:
                    plan_with_qty = user.payment.plans.filter(id=is_upgradable_plan).last()
                    if plan_with_qty:
                        plan_with_qty.save()
                        remaining_days = plan_with_qty.remaining_days() - 1
                        valid_till = payment.valid_till + timedelta(int(remaining_days))
                        plan_with_qty.valid_till = valid_till
                        plan_with_qty.save()
                    else:
                        plan_with_qty = PlanWithQty(plan=payment.plan)
                        plan_with_qty.save()
                        today = datetime.now().date()
                        valid_till = today + timedelta(int(payment.plan.duration))
                        plan_with_qty.valid_till = valid_till
                        plan_with_qty.save()
                else:
                    plan_with_qty = PlanWithQty(plan=payment.plan)
                    plan_with_qty.save()
                    today = datetime.now().date()
                    valid_till = today + timedelta(int(payment.plan.duration))
                    plan_with_qty.valid_till = valid_till
                    plan_with_qty.save()
                payment.save()
                payment.total_group_create_size = old_payment.total_group_create_size + payment.plan.total_group_create_size
                # payment.group_size = max(old_payment.group_size, payment.plan.group_size)
                payment.save()
                old_plans = old_payment.plans.all()
                for item in old_plans:
                    payment.plans.add(item)
                    payment.save()
                payment.plans.add(plan_with_qty)
                payment.save()
                user.payment = payment
                user.save()
            else:
                user.payment = payment
                payment = user.payment
                payment.save()
                plan_with_qty = PlanWithQty(plan=payment.plan)
                plan_with_qty.save()
                today = datetime.now().date()
                valid_till = today + timedelta(int(payment.plan.duration))
                plan_with_qty.valid_till = valid_till
                plan_with_qty.save()
                payment.plans.add(plan_with_qty)
                payment.save()
                user.save()
            messages.success(self.request, "Payment Success!")
            return redirect('chat:chat')
        else:
            print("Payment Fail!")
            messages.warning(self.request, "Payment Fail!")
            return redirect('chat:chat')

    def get(self, *args, **kwargs):
        return HttpResponse(self.request.GET)
