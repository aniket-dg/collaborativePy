from django.http import request, JsonResponse
from django.contrib.auth import forms
from django.contrib import messages
from django.contrib.auth.mixins import LoginRequiredMixin
from django.shortcuts import redirect, render
from django.views import View
from django.views.generic.detail import DetailView
from django.views.generic.list import ListView
from django.core.paginator import Paginator
from django.contrib.auth.forms import UserCreationForm
from .models import Competion, UserSubmission

from .serializers import ReadOnlyCompetitionModelSerializer

import calendar
import datetime
import numpy as np
import pandas as pd
# Create your views here.

class CompetionList(ListView):
    model=Competion
    context_object_name = 'list'
    template_name = 'complist.html'

    def get_queryset(self):
        today = datetime.date.today()
        qs = super(CompetionList, self).get_queryset()
        qs = qs.filter(start__lte=today, end__gte=today).order_by('-start')
        return qs

    def get(self, request, *args, **kwargs):
        qs = self.get_queryset()
        accept_type = request.META.get('HTTP_ACCEPT', None)
        if (accept_type == 'application/json'):
            try:
                comp_status = request.GET.get('comp_status')
                current_count = int(request.GET.get('current_count'))
                comps = None
                if (comp_status and current_count >= 0):
                    qs = qs.filter(status=comp_status)
                    p = Paginator(qs, 4)
                    competitions = p.get_page((current_count + 4) / 4)
                    comps = ReadOnlyCompetitionModelSerializer(competitions, many=True).data
                    if p.count <= current_count:
                        return JsonResponse({'status': False}, status=200)
                return JsonResponse({'data': comps, 'status': True}, status=200)
            except Exception as e:
                print(e)
        else:
            return super(CompetionList, self).get(self, request, *args, **kwargs)
        


class CompetionDetail(DetailView):
    model = Competion
    template_name ='compdetail.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        competition_id = self.kwargs.get('pk', None)
        today = datetime.date.today()
        competition = Competion.objects.filter(id=competition_id, start__lte=today, end__gte=today).last()
        user = self.request.user
        if user.is_authenticated:
            context['user_submission']  = UserSubmission.objects.filter(user=user, competition=competition).last()
        all_valid_submissions = UserSubmission.objects.filter(
                                                        competition=competition,
                                                        submission_date__date__lte=competition.end
                                                        ).order_by('-score', 'submission_date')
        context['submissions'] = all_valid_submissions
        return context


class ParticipateView(LoginRequiredMixin, View):
    def post(self, *args, **kwargs):
        competition_id = self.request.POST.get('pk', None)
        today = datetime.date.today()
        competition = Competion.objects.filter(id=competition_id).last()
        redirect_url = self.request.META.get('HTTP_REFERER')
        user = self.request.user
        if competition:
            competition.participants.add(user)
            messages.success(self.request, 'Participation successful.')
        else:
            messages.error(self.request, 'The competition has ended.')
        if redirect_url:
            return redirect(redirect_url)
        else:
            return redirect('Competion:detail', kwargs={'pk': competition_id})


class UserSubmissionView(LoginRequiredMixin, View):
    # def get(self, *args, **kwargs):
    #     competition_id = self.kwargs.get('pk', None)
    #     competition = Competion.objects.filter(id=competition_id).last()
    #     context = {}
    #     context['competition'] = competition
    #     return render(self.request, 'usersubmit.html', context)

    def post(self, *args, **kwargs):
        """Handles user submissions for competitions"""
        competition_id = self.kwargs.get('pk', None)
        today = datetime.date.today()
        competition = Competion.objects.filter(id=competition_id, start__lte=today, end__gte=today).last()
        user = self.request.user
        user_file = self.request.FILES.get('user_file', None)
        has_submitted = UserSubmission.objects.filter(competition=competition, user=user).exists()
        if has_submitted:
            messages.error(self.request, 'You have already made a submission!')
            return redirect('Competion:detail', pk=competition_id)
        if not user_file:
            messages.error(self.request, 'No file uploaded!')
            return redirect('Competion:detail', pk=competition_id)
        if not competition:
            messages.error(self.request, 'No competition found.')
            return redirect('Competion:detail', pk=competition_id)
        if user in competition.participants.all():
            admin_file = competition.admin_file
            print(admin_file == None)
            score, is_valid = self._get_submission_score(user_file, admin_file)
            if not is_valid:
                messages.error(self.request, 'Please check the demo file above and submit with proper column name.')
                return redirect('Competion:detail', pk=competition_id)
            if (user_file and admin_file and competition and score != None):
                user_submission = UserSubmission.objects.create(user=user, competition=competition,\
                                                            user_file=user_file,submission_date=datetime.datetime.now(),\
                                                            score=score)
                messages.success(self.request, 'Successfully submitted.')
                return redirect('Competion:detail', pk=competition_id)
            # if no admin file provided
            elif not admin_file:
                user_submission = UserSubmission.objects.create(user=user, competition=competition,\
                                                            user_file=user_file,submission_date=datetime.datetime.now(),\
                                                            score=score)
                messages.success(self.request, 'Successfully submitted.')
                return redirect('Competion:detail', pk=competition_id)
            else:
                return redirect('Competion:detail', pk=competition_id)
        else:
            messages.error(self.request, 'Only participants are allowed to do submissions.')
            return redirect('Competion:detail', pk=competition_id)
    
    def _get_submission_score(self, user_file, admin_file):
        """Returns score for submissions"""
        if user_file and admin_file:
            try:
                user_df=pd.read_csv(user_file, sep=',')
                admin_df=pd.read_csv(admin_file, sep=',')
                col1 = 'Admin Title'  # col name for admin_file
                col2 = 'solution'  # col name for user_file
                result = pd.concat([admin_df[col1],user_df[col2]], axis=1)
                comparison_column = np.where(result[col1]==result[col2], 1, 0)
                df_comparison_column = pd.DataFrame(comparison_column, columns=['Total'])
                final_result = pd.concat([result, df_comparison_column], axis=1)
                print(final_result)
                correct_percent = 100 * df_comparison_column.sum() / len(admin_df.index)
                percent = correct_percent.tolist().pop()  # Convert to python native type
                return percent, True
            except Exception as e:
                print('Submission NOT proper',e)
                return 0, False
        else:
            print("Not user file or admin file")
            return 0, True
    
            




