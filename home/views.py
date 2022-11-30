from django.shortcuts import render, redirect
from django.views import View
from django.http import HttpResponseRedirect, JsonResponse
from django.contrib import messages
from django.views.generic import ListView
from django.views.generic.edit import CreateView

from order.models import Plan
from .forms import NewsLetterForm, PopUpQuestionsForm
from .models import Contact, TPP, Faq, PopUpQuestions


def handler403(request, *args, **kwargs):
    return render(request, 'home/error.html')


def handler404(request, *args, **kwargs):
    return render(request, 'home/error.html')


def handler500(request, *args, **kwargs):
    return render(request, 'home/error.html')


class Home(View):
    def get(self, *args, **kwargs):
        form = PopUpQuestionsForm()
        if self.request.user.is_authenticated:
            return redirect('post:post')

        context = {
            'form':form,
            'faq': Faq.objects.filter(is_active=True),
        }
        # context['parent_category_list'] = ParentCategory.objects.all()
        return render(self.request, 'home/home.html', context)

class Workspace(View):
    def get(self, *args, **kwargs):
        context = {
            'faq': Faq.objects.filter(is_active=True),
        }
        return render(self.request, 'home/temp.html', context)

class NewsLetterCreateView(View):
    def get(self, *args, **kwargs):
        form = NewsLetterForm()
        return render(self.request, 'home/home.html', {'form2': form})

    def post(self, *args, **kwargs):
        if self.request.method == 'POST':
            form = NewsLetterForm(self.request.POST)
            if form.is_valid():
                form.save()
                messages.success(self.request, 'Subscribed!')
        return HttpResponseRedirect(self.request.META.get('HTTP_REFERER'))


class ContactView(CreateView):
    model = Contact
    fields = ['name', 'email', 'mobile', 'description']
    template_name = "home/contact.html"
    success_url = '/contact/'

    def form_valid(self, form):
        phone_number = form.cleaned_data['mobile']
        if len(str(phone_number)) != 10:
            messages.warning(self.request, 'Invalid mobile number')
            return redirect('home:contact')
        messages.success(self.request, "Message submitted, We will get back to you soon!")
        return super().form_valid(form)


class Terms(View):
    def get(self, *args, **kwargs):
        page_name = self.kwargs.get('page_name')
        tpp = TPP.objects.all().first()
        if page_name == 'terms-and-condition':
            tpp = tpp.terms_and_condition
        elif page_name == 'privacy-policy':
            tpp = tpp.privacy_policy
        elif page_name == 'refund_policy':
            tpp = tpp.refund_policy
        elif page_name == 'cancellation_policy':
            tpp = tpp.cancellation_policy
        return render(self.request, 'home/terms_and_condition.html', {'tpp': tpp, 'page': page_name})


class PlanListView(ListView):
    model = Plan
    template_name = 'home/plan.html'

    def get_queryset(self):
        return Plan.objects.filter(is_company_plan=False, is_visible=True)
    def get_context_data(self, *, object_list=None, **kwargs):
        context = super(PlanListView, self).get_context_data(**kwargs)
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


class PopUp(View):
    def post(self, *args, **kwargs):
        print(self.request.POST)
        form = PopUpQuestionsForm(self.request.POST)
        if not form.is_valid():
            return JsonResponse({
                "Status": False,
                'Message': "Required fields are empty!..."
            })
        popup = form.instance
        popup.session_key = self.request.session.session_key
        popup.save()
        return JsonResponse({
            "Status": True,
            'Message': "Success..."
        })

class Sample(View):
    def get(self,*args, **kwargs):
        context = {}

        return render(self.request, 'home/sample.html',context)