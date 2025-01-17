from django.contrib import messages
from django.http import HttpResponse
from django.shortcuts import render, redirect

# Create your views here.
from django.utils.decorators import method_decorator
from django.views import View
from datetime import datetime, timedelta
import uuid
from django.views.decorators.csrf import csrf_exempt
import hashlib
from order.models import Plan, Payment, Coupon, PlanWithQty, MoreStorage
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

# from payu.gateway import get_hash
# from uuid import uuid4


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

        coupon = Coupon.objects.filter(code=coupon_code, is_active=True, plan_type=plan).last()
        if coupon:
            if user in coupon.used_by.all():
                messages.warning(self.request, 'Coupon already used.')
                coupon = None
            elif coupon.max_limit == 0:
                messages.warning(self.request, "Coupon expired!")
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

        if float(payment.get_calculated_price()) <= float(0):
            payment_id = payment.id
            user_id = self.request.user.id
            coupon_id = coupon_applied
            is_upgradable_plan = plan_with_qty
            payment.paid = True 
            payment.amt_paid = 0
            if coupon_applied:
                coupon.used_by.add(user)
                coupon.max_limit -= 1
                coupon.save()
            user = self.request.user 
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

        payload = {
            "amount": payment.get_calculated_price(),
            "firstname": self.request.user.first_name,
            "email": self.request.user.email,
            "phone": self.request.user.phone_number,
            "lastname": self.request.user.last_name,
            "productinfo": plan.title,
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
        print(str(f"{merchant_key}|{payload['txnid']}|{payment.get_calculated_price()}|{plan.title}|{self.request.user.first_name}|{self.request.user.email}|{payment.id}|{self.request.user.id}|{coupon_applied}|{plan_with_qty}|||||||{merchant_salt}").encode(
                "utf-8"),"hash value")
        context = {'payment_id': payment.id, 'posted': payu_data}
        context['hashh'] = hash
        context['plan_with_qty'] = plan_with_qty
        context['payment'] = payment
        context['coupon_applied'] = coupon_applied
        return render(self.request, 'order/payment_redirect.html', context=context)



class RecurringPaymentRequestView(LoginRequiredMixin, View):
    def get(self, *args, **kwargs):
        si_details = {
            "billingCycle": "ADHOC",
            "billingInterval": "1",
            "billingAmount": "1",
            "billingCurrency": "INR",
            "paymentStartDate": "2022-11-18",
            "paymentEndDate": "2023-11-19",
            "action": "modify"
        }
        context = {}
        payload = {
            "amount": "1",
            "firstname": "Aniket",
            "email": "aniket.dg25@gmail.com",
            "phone": "9322861739",
            "lastname": "Gavali",
            "productinfo": "Sample Product Info",
            "txnid": str(uuid.uuid1())
        }
        payu_data = payu.transaction(**payload)

        hash = hashlib.sha512(
            str(f"{merchant_key}|{payload['txnid']}|{payload['amount']}|{payload['productinfo']}|{payload['firstname']}|"
                f"{payload['email']}|||||||||||{si_details}|{merchant_salt}").encode(
                "utf-8")).hexdigest()
        context['key'] = merchant_key
        context['salt'] = merchant_salt
        context['hash'] = hash
        context['si_details'] = si_details
        context['payload'] = payload
        return render(self.request, 'order/recurring_payment.html', context)

@method_decorator(csrf_exempt, name='dispatch')
class RecurringPaymentResponseView(View):
    def get(self, *args, **kwargs):
        print(self.request.GET)
        return HttpResponse("GET Method")
    def post(self, *args, **kwargs):
        print(self.request.POST, "Aniket")
        return HttpResponse(self.request.POST)

@method_decorator(csrf_exempt, name='dispatch')
class PreDebitNotificationView(View):
    def get(self, *args, **kwargs):

        import requests
        url = "https://test.payu.in/merchant/"
        var1 = {
            "authPayuId": "403993715527779800",
            "requestId": "231sdfasdf4323abut12123osd14",
            "debitDate": "2022-12-28",
            "invoiceDisplayNumber": "1073sfgds1087875",
            "amount": 10,
            "action": "retreive"
        }
        data = {
            "key": "gtKFFx",
            "command": "pre_debit_SI",
            "var1": var1,
        }
        hashh = hashlib.sha512(
            str(f"{merchant_key}|{data['command']}|{data['var1']}|{merchant_salt}").encode(
                "utf-8")).hexdigest()
        data['hash'] = hashh

        # res = requests.post(url, data)
        # print(res.text)
        context = {}
        context['data'] = data
        context['key'] = merchant_key
        context['var1'] = var1
        context['hash'] = hashh
        return render(self.request, 'order/notify.html', context)

# {
# 'mihpayid': ['403993715527732067'], 'mode': ['CC'], 'status': ['success'], 'unmappedstatus': ['captured'],
# 'key': ['gtKFFx'], 'txnid': ['19b11d18-674a-11ed-b42c-00155de45f 4b'], 'amount': ['1.00'], 'cardCategory': [
# 'domestic'], 'discount': ['0.00'], 'net_amount_debit': ['1'], 'addedon': ['2022-11-18 19:35:48'], 'productinfo': [
# 'Sample Product Info'], 'fi rstname': ['Aniket'], 'lastname': ['Gavali'], 'address1': [''], 'address2': [''],
# 'city': [''], 'state': [''], 'country': [''], 'zipcode': [''], 'email': ['aniket.dg25@gmail.com'], 'ph one': [
# '9322861739'], 'udf1': [''], 'udf2': [''], 'udf3': [''], 'udf4': [''], 'udf5': [''], 'udf6': [''], 'udf7': [''],
# 'udf8': [''], 'udf9': [''], 'udf10': [''], 'hash': ['1eb787be29b74f3ad178542a'],
# 'field1': ['229853'], 'field2': ['582217'], 'field3': ['2051'], 'field4': ['0'],
# 'field5': ['587582782201'], 'field6': ['00'], 'field7': ['AUTHPOSITIVE'],
# 'field8': ['Approved or completed successfully'], 'field9': ['No Error'], 'payment_source': ['payu'],
# 'PG_TYPE': ['AXISPG'], 'bank_ref_num': ['229853'], 'bankcode': ['MASTCC'], 'error': ['E000'],
# 'error_Message': ['No Error'], 'cardnum': ['XXXXXXXXXXXX0603'],
# 'cardhash': ['This field is no longer supported in postback params.'], 'issuing_bank': ['UNKNOWN'],
# 'card_type': ['UNKNOWN']}

class MoreStoragePaymentRequestView(LoginRequiredMixin, View):
    def get(self, *args, **kwargs):
        user = self.request.user
        more_storage_id = self.kwargs.get('pk')
        more_storage = MoreStorage.objects.filter(id=int(more_storage_id)).last()

        coupon_code = self.request.GET.get('coupon_code')
        plan_with_qty = None
        plan_with_qty_id = None
        if not more_storage:
            messages.warning(self.request, "Bad request")
            return redirect('/')
        order_id = f"{datetime.now()}_{user.id}"
        payment = Payment(more_storage=more_storage, order_id=order_id)
        payment.amt_paid = 0
        today = datetime.now().date()
        valid_till = today + timedelta(int(365))
        payment.valid_till = valid_till
        payment.save()
        import uuid


        payload = {
            "amount": payment.get_calculated_price(),
            "firstname": self.request.user.first_name,
            "email": self.request.user.email,
            "phone": f"self.request.user.phone_number{user.id}",
            "lastname": self.request.user.last_name,
            "productinfo": f"MoreStorage{more_storage.group.id}",
            # "address1": "",
            # "address2": "Test Address 2",
            # "city": "Test city",
            # "state": "Test state",
            # "country": "Test country",
            # "zipcode": 673576,
            "txnid": str(uuid.uuid1())
        }
        plan_title = f"MoreStorage{more_storage.group.id}"
        coupon_applied = False
        payu_data = payu.transaction(**payload)
        if plan_with_qty:
            plan_with_qty = plan_with_qty_id
        else:
            plan_with_qty = 0
        import hashlib
        hash = hashlib.sha512(
            str(f"{merchant_key}|{payload['txnid']}|{payment.get_calculated_price()}|{plan_title}|{self.request.user.first_name}|{self.request.user.email}|{payment.id}|{self.request.user.id}|{coupon_applied}|{plan_with_qty}|||||||{merchant_salt}").encode(
                "utf-8")).hexdigest()
        print(str(f"{merchant_key}|{payload['txnid']}|{payment.get_calculated_price()}|{plan_title}|{self.request.user.first_name}|{self.request.user.email}|{payment.id}|{self.request.user.id}|{coupon_applied}|{plan_with_qty}|||||||{merchant_salt}").encode(
                "utf-8"),"hash value")
        context = {'payment_id': payment.id, 'posted': payu_data}
        context['hashh'] = hash
        context['plan_with_qty'] = plan_with_qty
        context['payment'] = payment
        context['coupon_applied'] = False
        return render(self.request, 'order/payment_redirect_more.html', context=context)


@method_decorator(csrf_exempt, name='dispatch')
class PaymentResponseView(View):
    def post(self, *args, **kwargs):
        print(self.request.POST)
        redirect_url = self.request.META.get('HTTP_REFERER')
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
                if redirect_url:
                    return redirect(redirect_url)
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
                    coupon.max_limit -= 1
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
            if payment.plan.is_company_plan:
                return redirect('company:home')
            return redirect('chat:chat')
        else:
            print("Payment Fail!")
            messages.warning(self.request, "Payment Fail!")
            return redirect('chat:chat')

    # def get(self, *args, **kwargs):
    #     return redirect('chat:chat')



class MoreStoragePaymentRequestView(LoginRequiredMixin, View):
    def get(self, *args, **kwargs):
        user = self.request.user
        more_storage_id = self.kwargs.get('pk')
        more_storage = MoreStorage.objects.filter(id=int(more_storage_id)).last()

        coupon_code = self.request.GET.get('coupon_code')
        plan_with_qty = None
        plan_with_qty_id = None
        if not more_storage:
            messages.warning(self.request, "Bad request")
            return redirect('/')
        order_id = f"{datetime.now()}_{user.id}"
        payment = Payment(more_storage=more_storage, order_id=order_id)
        payment.amt_paid = 0
        today = datetime.now().date()
        valid_till = today + timedelta(int(365))
        payment.valid_till = valid_till
        payment.save()
        import uuid


        payload = {
            "amount": payment.get_calculated_price(),
            "firstname": self.request.user.first_name,
            "email": self.request.user.email,
            "phone": self.request.user.phone_number,
            "lastname": self.request.user.last_name,
            "productinfo": f"MoreStorage{more_storage.group.id}",
            # "address1": "",
            # "address2": "Test Address 2",
            # "city": "Test city",
            # "state": "Test state",
            # "country": "Test country",
            # "zipcode": 673576,
            "txnid": str(uuid.uuid1())
        }
        plan_title = f"MoreStorage{more_storage.group.id}"
        coupon_applied = False
        payu_data = payu.transaction(**payload)
        if plan_with_qty:
            plan_with_qty = plan_with_qty_id
        else:
            plan_with_qty = 0
        import hashlib
        hash = hashlib.sha512(
            str(f"{merchant_key}|{payload['txnid']}|{payment.get_calculated_price()}|{plan_title}|{self.request.user.first_name}|{self.request.user.email}|{payment.id}|{self.request.user.id}|{coupon_applied}|{plan_with_qty}|||||||{merchant_salt}").encode(
                "utf-8")).hexdigest()
        print(str(f"{merchant_key}|{payload['txnid']}|{payment.get_calculated_price()}|{plan_title}|{self.request.user.first_name}|{self.request.user.email}|{payment.id}|{self.request.user.id}|{coupon_applied}|{plan_with_qty}|||||||{merchant_salt}").encode(
                "utf-8"),"hash value")
        context = {'payment_id': payment.id, 'posted': payu_data}
        context['hashh'] = hash
        context['plan_with_qty'] = plan_with_qty
        context['payment'] = payment
        context['coupon_applied'] = False
        return render(self.request, 'order/payment_redirect_more.html', context=context)


@method_decorator(csrf_exempt, name='dispatch')
class MoreStoragePaymentResponseView(View):
    def post(self, *args, **kwargs):
        print(self.request.POST)
        redirect_url = self.request.META.get('HTTP_REFERER')
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
                if redirect_url:
                    return redirect(redirect_url)
                return redirect('chat:chat')
            payment.paid = True
            payment.amt_paid = self.request.POST.get('amount')
            payment.payu_dict = self.request.POST
            payment.save()
            user = User.objects.filter(id=int(user_id)).last()
            group = payment.more_storage.group
            group.room_size += payment.more_storage.storage
            group.save()
            messages.success(self.request, f"Code Room Storage sized increased to {group.room_size} GB!")
            return redirect('chat:chat')
        else:
            messages.warning(self.request, "Payment Fail!")
            return redirect('chat:chat')

    def get(self, *args, **kwargs):
        return redirect('chat:chat')


