from django.contrib import messages
from django.contrib.auth.mixins import LoginRequiredMixin
from django.http import HttpResponse
from django.shortcuts import render, redirect
from django.urls import reverse, reverse_lazy
from django.views import View
from django.views.generic import ListView, DetailView, UpdateView

from order.models import Plan
from users.models import User
from .forms import CompanyForm
from .models import Company
from .utils import encrypt_string, decrypt_string

# Create your views here.

class IsCompanyPresent(View):
    def dispatch(self, *args, **kwargs):
        if not self.request.user.company:
            return redirect('company:company-create')
        return super().dispatch(self.request, *args, **kwargs)

class IsNormalCompanyUser(View):
    def dispatch(self, request, *args, **kwargs):
        if not self.request.user.is_company_admin:
            return redirect('chat:chat')
        return super(IsNormalCompanyUser, self).dispatch(self.request, *args, **kwargs)
class IsCompanyUser(View):
    def dispatch(self, request, *args, **kwargs):
        company_user = User.objects.filter(id=self.kwargs.get('pk')).last()
        if not company_user or not company_user.company == self.request.user.company:
            messages.warning(self.request, "User does not exist!")
            return redirect('company:home')
        return super().dispatch(self.request, *args, **kwargs)

class IsPlanPurchase(View):
    def dispatch(self, request, *args, **kwargs):
        company_user = self.request.user
        if not company_user.payment:
            return redirect('company:plan')
        return super().dispatch(self.request, *args, **kwargs)

class HomeView(LoginRequiredMixin,IsNormalCompanyUser,IsCompanyPresent, IsPlanPurchase):
    def get(self, *args, **kwargs):
        context = {}
        user = self.request.user
        plans = Plan.objects.filter(is_company_plan=True)
        context['plans'] = plans
        if user.is_company_plan_valid():
            unique_link = f"CompanySignupLink_{user.id}"
            enc_unique_link = encrypt_string(unique_link)
            redirect_url = self.request.build_absolute_uri(reverse('user:company-register')) + f"?code={enc_unique_link}"
            context['redirect_url'] = redirect_url
            company = user.company
            if not company.share_link:
                company.share_link = redirect_url
                company.save()
            context['object'] = company
        return render(self.request, 'company/company.html', context)


class CompanyCreateView(IsNormalCompanyUser,View):
    def get(self, *args, **kwargs):
        user = self.request.user
        if user.company:
            return redirect('company:home')
        context = {}
        company_form = CompanyForm(data=None)
        context['form'] = company_form
        return render(self.request, 'company/company_info.html', context)
    def post(self, *args, **kwargs):
        company = CompanyForm(self.request.POST, self.request.FILES)
        if not company.is_valid():
            messages.warning(self.request, "Company form not valid")
            return redirect('company:company-create')
        company = company.instance
        company.superuser = self.request.user
        company.save()
        user = self.request.user
        user.company = company
        user.save()
        messages.success(self.request, "Company Info saved successfully!")
        return redirect('company:home')

class CompanyUpdateView(LoginRequiredMixin,IsNormalCompanyUser ,UpdateView):
    model = Company
    form_class = CompanyForm
    template_name = 'company/company_info.html'

    def get_success_url(self):
        return reverse_lazy('company:home')

class CompanyUserView(View):
    def get(self, *args, **kwargs):
        return HttpResponse("Company User view")


class UserListView(LoginRequiredMixin, IsNormalCompanyUser, ListView):
    model = User
    paginate_by = 30
    template_name = 'company/user_list.html'
    def get_queryset(self):
        if self.request.user.company:
            return User.objects.filter(user_type='Company_User', company=self.request.user.company).exclude(email=self.request.user.email)
        return User.objects.none()
class UserDetailView(LoginRequiredMixin, IsNormalCompanyUser, View):
    def get(self, *args, **kwargs):
        context = {}
        user = self.request.user
        company_user = User.objects.filter(id=self.kwargs.get('pk')).last()
        if not company_user or not company_user.company == user.company:
            messages.warning(self.request, "User does not exist!")
            return redirect('company:home')

        context['object'] = company_user
        return render(self.request, 'company/user_detail.html', context)

class ApproveUserView(LoginRequiredMixin,IsNormalCompanyUser, IsCompanyUser,View):
    def get(self, *args, **kwargs):
        context = {}
        user = self.request.user
        company_user = User.objects.filter(id=self.kwargs.get('pk')).last()
        company_user.is_verified = True
        company_user.save()
        messages.success(self.request, "Company user approved!")
        return redirect('company:user-list')

class DisapproveUserView(LoginRequiredMixin,IsNormalCompanyUser, IsCompanyUser,View):
    def get(self, *args, **kwargs):
        context = {}
        user = self.request.user
        company_user = User.objects.filter(id=self.kwargs.get('pk')).last()
        company_user.is_verified = False
        company_user.save()
        messages.warning(self.request, "Company user verification revoked!")
        return redirect('company:user-list')



class CompanyPlanView(LoginRequiredMixin, IsNormalCompanyUser,ListView):
    model = Plan
    template_name = 'company/plan.html'

    def get_queryset(self):
        return Plan.objects.filter(is_company_plan=True, is_visible=True)
    def get_context_data(self, *, object_list=None, **kwargs):
        context = super(CompanyPlanView, self).get_context_data(**kwargs)
        plan_list = self.get_queryset()
        plan_list_zip = zip(plan_list)
        titles = []
        type_of_coderoom = []
        no_of_coderoom = []
        max_storage = []
        ram = []
        cpus = []
        max_members = []
        cost = []
        admin = []
        for item in plan_list_zip:
            titles.append(item[0].title)
            type_of_coderoom.append(item[0].type_of_coderoom)
            no_of_coderoom.append(item[0].total_group_create_size)
            max_storage.append(item[0].storage)
            ram.append(item[0].ram)
            cpus.append(item[0].vCPUs)
            max_members.append(item[0].group_size)
            cost.append(item[0].cost)
            admin.append(item[0].admin)
        context['type_of_coderoom'] = type_of_coderoom
        context['titles'] = titles
        context['no_of_coderoom'] = no_of_coderoom
        context['max_storage'] = max_storage
        context['ram'] = ram
        context['cpus'] = cpus
        context['max_members'] = max_members
        context['cost'] = cost
        context['admin'] = admin
        return context