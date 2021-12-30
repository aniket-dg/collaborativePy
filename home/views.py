from django.shortcuts import render, redirect
from django.views import View
from django.http import HttpResponseRedirect, JsonResponse
from django.contrib import messages
from django.views.generic import ListView
from django.views.generic.edit import CreateView

from order.models import Plan
from .forms import NewsLetterForm, PopUpQuestionsForm
from .models import Contact, TPP


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
            'form':form
        }
        # context['parent_category_list'] = ParentCategory.objects.all()
        return render(self.request, 'home/home.html', context)


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
        return render(self.request, 'home/terms_and_condition.html', {'tpp': tpp, 'page': page_name})


class PlanListView(ListView):
    model = Plan
    template_name = 'home/plan.html'


class PopUp(View):
    def post(self, *args, **kwargs):
        print(self.request.POST)
        form = PopUpQuestionsForm(self.request.POST)
        if not form.is_valid():
            return JsonResponse({
                "Status": False,
                'Message': "Required fields are empty!..."
            })
        popup = form.save(commit = False)
        popup.save()
        return JsonResponse({
            "Status": True,
            'Message': "Success..."
        })
