from datetime import datetime, timedelta

from django.contrib import messages
from django.contrib.auth.mixins import LoginRequiredMixin, UserPassesTestMixin
from django.shortcuts import render, redirect

# Create your views here.
from django.views import View
from django.views.generic import CreateView, UpdateView, DetailView, ListView, DeleteView

from chat.forms import PostCreateForm
from chat.models import GroupChatModel
from company.models import Company
from post.forms import SkeletonPostCreateForm
from competition.forms import CompetitionCreateForm
from post.models import Post, FlagInappropriate, SkeletonPost, FirstLevelCategory, SecondLevelCategory, \
    ThirdLevelCategory, FourthLevelCategory, Language, Scope
from home.models import Contact, NewsLetter
from order.models import Plan
from users.models import User
from order.models import Coupon
from home.models import TPP, Faq, Ad
from competition.models import Competion, UserSubmission


class PlanCreateView(LoginRequiredMixin, UserPassesTestMixin, CreateView):
    model = Plan
    fields = ['title', 'cost', 'duration', 'description', 'discount_percentage', 'is_recommended', 'features',
              'total_group_create_size', 'group_size']

    template_name = 'analytics/plan_create.html'

    def form_valid(self, form):
        plan = form.instance
        if plan.discount_percentage:
            new_cost = ((float(plan.cost) * float(plan.discount_percentage)) / 100) + plan.cost
            plan.discount_cost = plan.cost
            plan.cost = new_cost
        plan.save()
        messages.success(self.request, "Plan created successfully!")
        return redirect('analytics:plan-list')

    def test_func(self):
        return self.request.user.is_staff


class PlanUpdateView(LoginRequiredMixin, UserPassesTestMixin, UpdateView):
    model = Plan
    fields = ['title', 'cost', 'duration', 'description', 'discount_percentage', 'is_recommended', 'features',
              'total_group_create_size', 'group_size']

    template_name = 'analytics/plan_create.html'

    def get_initial(self):
        return {'cost': self.get_object().get_discounted_price }

    def form_valid(self, form):
        plan = form.instance
        if plan.discount_percentage:
            new_cost = ((float(plan.cost) * float(plan.discount_percentage)) / 100) + plan.cost
            plan.discount_cost = plan.cost
            plan.cost = new_cost
        plan.save()
        messages.success(self.request, "Plan updated successfully!")
        return redirect('analytics:plan-detail', pk=self.kwargs.get('pk'))

    def test_func(self):
        return self.request.user.is_staff


class PlanDetailView(LoginRequiredMixin, UserPassesTestMixin, DetailView):
    model = Plan
    template_name = 'analytics/plan_detail.html'

    def test_func(self):
        return self.request.user.is_staff


class PlanListView(LoginRequiredMixin, UserPassesTestMixin, ListView):
    model = Plan
    template_name = 'analytics/plan_list.html'

    def get_queryset(self):
        return Plan.objects.filter(is_visible=True)

    def test_func(self):
        return self.request.user.is_staff


class PlanDeleteView(LoginRequiredMixin, UserPassesTestMixin, DeleteView):
    model = Plan
    template_name = 'analytics/delete.html'

    def delete(self, request, *args, **kwargs):
        plan = self.get_object()
        plan.delete()
        messages.success(self.request, "Plan deleted!")
        return redirect('analytics:plan-list')

    def test_func(self):
        return self.request.user.is_staff

    def get(self, *args, **kwargs):
        return self.post(*args, **kwargs)


class PostCreateView(LoginRequiredMixin, UserPassesTestMixin, CreateView):
    model = Post
    form_class = PostCreateForm
    template_name = 'analytics/post_create.html'

    def form_valid(self, form):
        post = form.instance
        post.save()
        messages.success(self.request, "Post created successfully!")
        return redirect('analytics:post-list')

    def test_func(self):
        return self.request.user.is_staff


class PostUpdateView(LoginRequiredMixin, UserPassesTestMixin, UpdateView):
    model = Post
    form_class = PostCreateForm
    template_name = 'analytics/post_create.html'

    def form_valid(self, form):
        post = form.instance
        post.save()
        messages.success(self.request, "Post updated successfully!")
        return redirect('analytics:post-detail', pk=self.kwargs.get('pk'))

    def test_func(self):
        return self.request.user.is_staff


class PostDetailView(LoginRequiredMixin, UserPassesTestMixin, DetailView):
    model = Post
    template_name = 'analytics/post_detail.html'

    def test_func(self):
        return self.request.user.is_staff


class PostListView(LoginRequiredMixin, UserPassesTestMixin, ListView):
    model = Post
    template_name = 'analytics/post_list.html'

    def test_func(self):
        return self.request.user.is_staff


class PostDeleteView(LoginRequiredMixin, UserPassesTestMixin, DeleteView):
    model = Post
    template_name = 'analytics/delete.html'

    def delete(self, request, *args, **kwargs):
        plan = self.get_object()
        plan.delete()
        messages.success(self.request, "Post deleted!")
        return redirect('analytics:post-list')

    def test_func(self):
        return self.request.user.is_staff

    def get(self, *args, **kwargs):
        return self.post(*args, **kwargs)


class ContactListView(LoginRequiredMixin, ListView):
    model = Contact
    template_name = 'analytics/contact_list.html'

    def test_func(self):
        return self.request.user.is_staff


class ContactStatusUpdateView(LoginRequiredMixin, UserPassesTestMixin, View):
    def get(self, *args, **kwargs):
        contact = Contact.objects.filter(id=self.kwargs.get('pk')).first()
        if contact:
            contact.seen = True
            contact.save()
            return redirect('analytics:contact-list')

    def test_func(self):
        return self.request.user.is_staff


class ContactDeleteView(LoginRequiredMixin, UserPassesTestMixin, DeleteView):
    model = Contact

    def delete(self, request, *args, **kwargs):
        contact = self.get_object()
        contact.delete()
        messages.success(self.request, "Contact Deleted!")
        return redirect('analytics:contact-list')

    def test_func(self):
        return self.request.user.is_staff

    def get(self, *args, **kwargs):
        return self.post(*args, **kwargs)


class FlagInappropriateListView(LoginRequiredMixin, UserPassesTestMixin, ListView):
    model = FlagInappropriate
    template_name = 'analytics/flaginappropriate_list.html'

    def test_func(self):
        return self.request.user.is_staff


class FlagInappropriateDeleteView(LoginRequiredMixin, UserPassesTestMixin, DeleteView):
    model = FlagInappropriate

    def delete(self, request, *args, **kwargs):
        flag = self.get_object()
        post = flag.post
        post.delete()
        messages.success(self.request, "Post Deleted!")
        return redirect('analytics:flag_inappropriate-list')

    def test_func(self):
        return self.request.user.is_staff

    def get(self, *args, **kwargs):
        return self.post(*args, **kwargs)


class UserListView(LoginRequiredMixin, UserPassesTestMixin, ListView):
    model = User
    template_name = 'analytics/user_list.html'

    def test_func(self):
        return self.request.user.is_staff


class UserDetailView(LoginRequiredMixin, UserPassesTestMixin, DetailView):
    model = User
    template_name = 'analytics/user_detail.html'

    def get_context_data(self, **kwargs):
        context = super(UserDetailView, self).get_context_data(**kwargs)
        user = self.get_object()
        context['plan_exist'] = user.is_plan_available()
        context['remaining_days'] = user.remaining_days()
        context['plans'] = Plan.objects.filter(is_visible=True)
        return context

    def test_func(self):
        return self.request.user.is_staff


class UserPlanUpdateView(LoginRequiredMixin, UserPassesTestMixin, View):

    def get(self, *args, **kwargs):
        return render(self.request, 'analytics/plan_update.html')

    def post(self, *args, **kwargs):
        pk = self.request.POST.get('user_id')
        user = User.objects.filter(id=int(pk)).last()
        if not user:
            messages.warning(self.request, "User not found")
            return redirect('analytics:user-list')
        if not user.payment:
            messages.warning(self.request, "User doesn't have any active plan")
            return redirect('analytics:user-list')

        plan_id = self.request.POST.get('plan_id')
        plan = Plan.objects.filter(id=int(plan_id)).last()
        if not plan:
            messages.warning(self.request, "Plan not found")
            return redirect('analytics:user-list')
        payment = user.payment
        remaining_days = user.remaining_days()

        payment.plan = plan
        today = datetime.now().date()
        valid_till = today + timedelta(int(plan.duration))
        payment.valid_till = valid_till
        payment.save()
        valid_till = payment.valid_till + timedelta(int(remaining_days))
        payment.valid_till = valid_till
        payment.save()
        user.save()
        messages.success(self.request, "Plan updated successfully")
        return redirect('analytics:user-detail', pk=user.id)

    def test_func(self):
        return self.request.user.is_staff


class UserDeleteView(LoginRequiredMixin, UserPassesTestMixin, DeleteView):
    model = User

    def delete(self, request, *args, **kwargs):
        user = self.get_object()
        user.delete()
        messages.success(self.request, "User deleted!")
        return redirect('analytics:user-list')

    def test_func(self):
        return self.request.user.is_staff

    def get(self, *args, **kwargs):
        return self.post(*args, **kwargs)


class NewsLetterList(LoginRequiredMixin, UserPassesTestMixin, ListView):
    model = NewsLetter
    template_name = 'analytics/newsletter_list.html'

    def test_func(self):
        return self.request.user.is_staff


class NewsLetterStatusUpdate(LoginRequiredMixin, UserPassesTestMixin, View):
    def get(self, *args, **kwargs):
        newsletter = NewsLetter.objects.filter(id=self.kwargs.get('pk')).first()
        if newsletter:
            newsletter.seen = True
            newsletter.save()
            return redirect('analytics:newsletter-list')
        else:
            return redirect('analytics:newsletter-list')

    def test_func(self):
        return self.request.user.is_staff


class SkeletonPostCreateView(LoginRequiredMixin, CreateView):
    model = SkeletonPost
    form_class = SkeletonPostCreateForm
    template_name = 'analytics/skeleton_post_create.html'

    def form_valid(self, form):
        post = form.instance
        post.user = self.request.user
        post.save()
        messages.success(self.request, "Skeleton Post created successfully!")
        return redirect('analytics:post-list')

    def test_func(self):
        return self.request.user.is_staff


class SkeletonPostUpdateView(LoginRequiredMixin, UpdateView):
    model = SkeletonPost
    form_class = SkeletonPostCreateForm
    template_name = 'analytics/skeleton_post_update.html'

    def get_context_data(self, **kwargs):
        context = super(SkeletonPostUpdateView, self).get_context_data(**kwargs)
        context['post'] = self.get_object()
        return context

    def form_valid(self, form):
        post = form.instance
        post.user = self.request.user

        post.save()
        messages.success(self.request, "Skeleton Post updated successfully!")
        return redirect('analytics:skeleton-post-list')


class SkeletonPostDeleteView(LoginRequiredMixin, DeleteView):
    model = SkeletonPost

    def get(self, *args, **kwargs):
        return self.post(*args, **kwargs)

    def delete(self, request, *args, **kwargs):
        redirect_url = self.request.META.get('HTTP_REFERER')
        post = self.get_object()
        post.delete()
        messages.success(self.request, "Skeleton post deleted!")
        if redirect_url:
            return redirect(redirect_url)
        return redirect('analytics:skeleton-post-list')


class SkeletonPostListView(LoginRequiredMixin, ListView):
    model = SkeletonPost
    paginate_by = 20
    template_name = 'analytics/skeleton_post_list.html'


class FirstLevelCategoryCreateView(LoginRequiredMixin, CreateView):
    model = FirstLevelCategory
    fields = '__all__'
    template_name = 'analytics/category_create.html'

    def form_valid(self, form):
        category = form.instance
        category.save()
        messages.success(self.request, "First Level Category created!")
        return redirect('analytics:first-level-category-list')

    def test_func(self):
        return self.request.user.is_staff


class SecondLevelCategoryCreateView(LoginRequiredMixin, CreateView):
    model = SecondLevelCategory
    fields = '__all__'
    template_name = 'analytics/category_create.html'

    def form_valid(self, form):
        category = form.instance
        category.save()
        messages.success(self.request, "Second Level Category created!")
        return redirect('analytics:second-level-category-list')

    def test_func(self):
        return self.request.user.is_staff


class ThirdLevelCategoryCreateView(LoginRequiredMixin, CreateView):
    model = ThirdLevelCategory
    fields = '__all__'
    template_name = 'analytics/category_create.html'

    def form_valid(self, form):
        category = form.instance
        category.save()
        messages.success(self.request, "Third Level Category created!")
        return redirect('analytics:third-level-category-list')

    def test_func(self):
        return self.request.user.is_staff


class FourthLevelCategoryCreateView(LoginRequiredMixin, CreateView):
    model = FourthLevelCategory
    fields = '__all__'
    template_name = 'analytics/category_create.html'

    def form_valid(self, form):
        category = form.instance
        category.save()
        messages.success(self.request, "Fourth Level Category created!")
        return redirect('analytics:fourth-level-category-list')

    def test_func(self):
        return self.request.user.is_staff


class FirstLevelUpdateView(LoginRequiredMixin, UpdateView):
    model = FirstLevelCategory
    fields = '__all__'
    template_name = 'analytics/category_create.html'

    def form_valid(self, form):
        category = form.instance
        category.save()
        messages.success(self.request, "First Level Category updated!")
        return redirect('analytics:first-level-category-list')

    def test_func(self):
        return self.request.user.is_staff


class SecondLevelUpdateView(LoginRequiredMixin, UpdateView):
    model = SecondLevelCategory
    fields = '__all__'
    template_name = 'analytics/category_create.html'

    def form_valid(self, form):
        category = form.instance
        category.save()
        messages.success(self.request, "Second Level Category updated!")
        return redirect('analytics:second-level-category-list')

    def test_func(self):
        return self.request.user.is_staff


class ThirdLevelUpdateView(LoginRequiredMixin, UpdateView):
    model = ThirdLevelCategory
    fields = '__all__'
    template_name = 'analytics/category_create.html'

    def form_valid(self, form):
        category = form.instance
        category.save()
        messages.success(self.request, "Third Level Category updated!")
        return redirect('analytics:third-level-category-list')

    def test_func(self):
        return self.request.user.is_staff


class FourthLevelUpdateView(LoginRequiredMixin, UpdateView):
    model = FourthLevelCategory
    fields = '__all__'
    template_name = 'analytics/category_create.html'

    def form_valid(self, form):
        category = form.instance
        category.save()
        messages.success(self.request, "Fourth Level Category updated!")
        return redirect('analytics:fourth-level-category-list')

    def test_func(self):
        return self.request.user.is_staff


class FirstLevelCategoryDeleteView(LoginRequiredMixin, DeleteView):
    model = FirstLevelCategory

    def delete(self, request, *args, **kwargs):
        category = self.get_object()
        category.delete()
        messages.info(self.request, "Category deleted")
        return redirect('analytics:first-level-category-list')

    def get(self, *args, **kwargs):
        return self.post(*args, **kwargs)


class SecondLevelCategoryDeleteView(LoginRequiredMixin, DeleteView):
    model = SecondLevelCategory

    def delete(self, request, *args, **kwargs):
        category = self.get_object()
        category.delete()
        messages.info(self.request, "Category deleted")
        return redirect('analytics:second-level-category-list')

    def get(self, *args, **kwargs):
        return self.post(*args, **kwargs)


class ThirdLevelCategoryDeleteView(LoginRequiredMixin, DeleteView):
    model = ThirdLevelCategory

    def delete(self, request, *args, **kwargs):
        category = self.get_object()
        category.delete()
        messages.info(self.request, "Category deleted")
        return redirect('analytics:third-level-category-list')

    def get(self, *args, **kwargs):
        return self.post(*args, **kwargs)


class FourthLevelCategoryDeleteView(LoginRequiredMixin, DeleteView):
    model = FourthLevelCategory

    def delete(self, request, *args, **kwargs):
        category = self.get_object()
        category.delete()
        messages.info(self.request, "Category deleted")
        return redirect('analytics:fourth-level-category-list')

    def get(self, *args, **kwargs):
        return self.post(*args, **kwargs)


class FirstLevelCategoryListView(LoginRequiredMixin, ListView):
    model = FirstLevelCategory
    template_name = 'analytics/category_list.html'


class SecondLevelCategoryListView(LoginRequiredMixin, ListView):
    model = SecondLevelCategory
    template_name = 'analytics/secound_category_list.html'


class ThirdLevelCategoryListView(LoginRequiredMixin, ListView):
    model = ThirdLevelCategory
    template_name = 'analytics/third_category_list.html'


class FourthLevelCategoryListView(LoginRequiredMixin, ListView):
    model = FourthLevelCategory
    template_name = 'analytics/fourth_category_list.html'


class TPPUpdateView(LoginRequiredMixin, UpdateView):
    model = TPP
    fields = "__all__"
    template_name = "analytics/terms.html"
    success_message = "Policy were updated successfully"
    success_url = '/analytics/terms/1/'


class LanguageListView(LoginRequiredMixin, ListView):
    model = Language
    template_name = 'analytics/language.html'


class ScopeListView(LoginRequiredMixin, ListView):
    model = Scope
    template_name = 'analytics/scope.html'


class LanguageCreateView(LoginRequiredMixin, CreateView):
    model = Language
    fields = '__all__'
    template_name = 'analytics/post_category_create.html'

    def form_valid(self, form):
        category = form.instance
        category.save()
        messages.success(self.request, "Language created!")
        return redirect('analytics:language-list')

    def test_func(self):
        return self.request.user.is_staff


class ScopeCreateView(LoginRequiredMixin, CreateView):
    model = Scope
    fields = '__all__'
    template_name = 'analytics/post_category_create.html'

    def form_valid(self, form):
        category = form.instance
        category.save()
        messages.success(self.request, "Scope created!")
        return redirect('analytics:scope-list')

    def test_func(self):
        return self.request.user.is_staff


class LanguageUpdateView(LoginRequiredMixin, UpdateView):
    model = Language
    fields = '__all__'
    template_name = 'analytics/post_category_create.html'

    def form_valid(self, form):
        category = form.instance
        category.save()
        messages.success(self.request, "First Level Category updated!")
        return redirect('analytics:language-list')

    def test_func(self):
        return self.request.user.is_staff


class ScopeUpdateView(LoginRequiredMixin, UpdateView):
    model = Scope
    fields = '__all__'
    template_name = 'analytics/post_category_create.html'

    def form_valid(self, form):
        category = form.instance
        category.save()
        messages.success(self.request, "First Level Category updated!")
        return redirect('analytics:scope-list')

    def test_func(self):
        return self.request.user.is_staff


class LanguageDeleteView(LoginRequiredMixin, DeleteView):
    model = Language

    def delete(self, request, *args, **kwargs):
        category = self.get_object()
        category.delete()
        messages.info(self.request, "Language deleted")
        return redirect('analytics:language-list')

    def get(self, *args, **kwargs):
        return self.post(*args, **kwargs)


class ScopeDeleteView(LoginRequiredMixin, DeleteView):
    model = Scope

    def delete(self, request, *args, **kwargs):
        category = self.get_object()
        category.delete()
        messages.info(self.request, "Scope deleted")
        return redirect('analytics:scope-list')

    def get(self, *args, **kwargs):
        return self.post(*args, **kwargs)


# Competitions

class CompetitionCreateView(LoginRequiredMixin, UserPassesTestMixin, CreateView):
    model = Competion
    form_class = CompetitionCreateForm
    template_name = 'analytics/competition_create.html'

    def form_valid(self, form):
        form.save()
        messages.success(self.request, "Competition created successfully!")
        return redirect('analytics:competition-list')

    def test_func(self):
        return self.request.user.is_staff


class CompetitionUpdateView(LoginRequiredMixin, UserPassesTestMixin, UpdateView):
    model = Competion
    form_class = CompetitionCreateForm
    template_name = 'analytics/competition_create.html'

    def form_valid(self, form):
        form.save()
        messages.success(self.request, "Competition updated successfully!")
        return redirect('analytics:competition-list')

    def test_func(self):
        return self.request.user.is_staff


class CompetitionDetailView(LoginRequiredMixin, UserPassesTestMixin, DetailView):
    model = Competion
    template_name = 'analytics/competition_detail.html'

    def test_func(self):
        return self.request.user.is_staff


class CompetitionDeleteView(LoginRequiredMixin, UserPassesTestMixin, DeleteView):
    model = Competion

    def delete(self, request, *args, **kwargs):
        competition = self.get_object()
        competition.delete()
        messages.success(self.request, "Competition deleted!")
        return redirect('analytics:competition-list')

    def test_func(self):
        return self.request.user.is_staff


class CompetitionListView(LoginRequiredMixin, UserPassesTestMixin, ListView):
    model = Competion
    paginate_by = 20
    template_name = 'analytics/competition_list.html'
    ordering = ['-id']

    def test_func(self):
        return self.request.user.is_staff


class FaqDeleteView(LoginRequiredMixin, UserPassesTestMixin, DeleteView):
    model = Faq
    template_name = 'analytics/delete.html'

    def delete(self, request, *args, **kwargs):
        competition = self.get_object()
        competition.delete()
        messages.success(self.request, "Faq deleted!")
        return redirect('analytics:faq-list')

    def test_func(self):
        return self.request.user.is_staff

    def get(self, *args, **kwargs):
        return self.post(*args, **kwargs)


class FaqListView(LoginRequiredMixin, UserPassesTestMixin, ListView):
    model = Faq
    template_name = 'analytics/faq.html'
    ordering = ['-id']

    def test_func(self):
        return self.request.user.is_staff


class FaqUpdateView(LoginRequiredMixin, UserPassesTestMixin, UpdateView):
    model = Faq
    fields = "__all__"
    template_name = 'analytics/faq_add_update.html'

    def form_valid(self, form):
        form.save()
        messages.success(self.request, "Faq updated successfully!")
        return redirect('analytics:faq-list')

    def test_func(self):
        return self.request.user.is_staff


class FaqCreateView(LoginRequiredMixin, UserPassesTestMixin, CreateView):
    model = Faq
    fields = "__all__"
    template_name = 'analytics/faq_add_update.html'

    def form_valid(self, form):
        form.save()
        messages.success(self.request, "Faq created successfully!")
        return redirect('analytics:faq-list')

    def test_func(self):
        return self.request.user.is_staff


# Ads
class AdCreateView(LoginRequiredMixin, UserPassesTestMixin, CreateView):
    model = Ad
    fields = ['image', 'link']
    template_name = 'analytics/ad_create.html'

    def get_success_url(self):
        messages.success(self.request, "Ad created successfully!")
        return super(AdCreateView, self).get_success_url()

    def test_func(self):
        return self.request.user.is_staff


class AdUpdateView(LoginRequiredMixin, UserPassesTestMixin, UpdateView):
    model = Ad
    fields = ['image', 'link']
    template_name = 'analytics/ad_create.html'

    def get_success_url(self):
        messages.success(self.request, "Ad updated successfully!")
        return super(AdUpdateView, self).get_success_url()

    def test_func(self):
        return self.request.user.is_staff


class AdDetailView(LoginRequiredMixin, UserPassesTestMixin, DetailView):
    model = Ad
    template_name = 'analytics/ad_detail.html'

    def test_func(self):
        return self.request.user.is_staff


class AdDeleteView(LoginRequiredMixin, UserPassesTestMixin, DeleteView):
    model = Ad

    def delete(self, request, *args, **kwargs):
        ad = self.get_object()
        ad.delete()
        messages.success(self.request, "Ad deleted!")
        return redirect('analytics:ad-list')

    def get(self, *args, **kwargs):
        return self.post(*args, **kwargs)

    def test_func(self):
        return self.request.user.is_staff


class AdListView(LoginRequiredMixin, UserPassesTestMixin, ListView):
    model = Ad
    paginate_by = 20
    template_name = 'analytics/ad_list.html'
    ordering = ['-id']

    def test_func(self):
        return self.request.user.is_staff


class CouponDeleteView(LoginRequiredMixin, UserPassesTestMixin, DeleteView):
    model = Coupon
    template_name = 'analytics/delete.html'

    def delete(self, request, *args, **kwargs):
        competition = self.get_object()
        competition.delete()
        messages.success(self.request, "Coupon deleted!")
        return redirect('analytics:coupon-list')

    def test_func(self):
        return self.request.user.is_staff

    def get(self, *args, **kwargs):
        return self.post(*args, **kwargs)


class CouponListView(LoginRequiredMixin, UserPassesTestMixin, ListView):
    model = Coupon
    template_name = 'analytics/coupon.html'
    ordering = ['-id']

    def test_func(self):
        return self.request.user.is_staff


class CouponUpdateView(LoginRequiredMixin, UserPassesTestMixin, UpdateView):
    model = Coupon
    fields = "__all__"
    template_name = 'analytics/coupon_add_update.html'

    def form_valid(self, form):
        form.save()
        messages.success(self.request, "Faq updated successfully!")
        return redirect('analytics:coupon-list')

    def test_func(self):
        return self.request.user.is_staff


class CouponCreateView(LoginRequiredMixin, UserPassesTestMixin, CreateView):
    model = Coupon
    fields = "__all__"
    template_name = 'analytics/coupon_add_update.html'

    def form_valid(self, form):
        form.save()
        messages.success(self.request, "Coupon created successfully!")
        return redirect('analytics:coupon-list')

    def test_func(self):
        return self.request.user.is_staff

class CompanyListView(LoginRequiredMixin, UserPassesTestMixin, ListView):
    model = Company
    fields = "__all__"
    template_name = 'analytics/company_list.html'

    def test_func(self):
        return self.request.user.is_staff

class CompanyDetailView(LoginRequiredMixin, UserPassesTestMixin, DetailView):
    model = Company
    fields = '__all__'
    template_name = 'analytics/company_detail.html'

    def get_context_data(self, **kwargs):
        context = super(CompanyDetailView, self).get_context_data(**kwargs)
        company = self.get_object()
        context['company_user_count'] = User.objects.filter(company=company).count()
        context['total_coderoom'] = GroupChatModel.objects.filter(company=company).count()

        return context

    def test_func(self):
        return self.request.user.is_staff


class CompanyUserListView(LoginRequiredMixin, UserPassesTestMixin, View):
    def get(self, *args, **kwargs):
        id = self.kwargs.get('pk')
        company = Company.objects.filter(id=int(id)).last()
        if not company:
            messages.warning(self.request, "Company not found!")
            return redirect('analytics:company-list')
        context = {}
        user = self.request.user
        company_user = company.superuser
        company_users = User.objects.filter(company = company)
        context['object_list'] = company_users
        return render(self.request, 'analytics/company_user_list.html', context)

    def test_func(self):
        return self.request.user.is_staff