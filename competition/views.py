from django.http import request, JsonResponse
from django.contrib.auth import forms
from django.contrib import messages
from django.contrib.auth.mixins import LoginRequiredMixin
from django.shortcuts import redirect, render
from django.views import View
from django.views.generic.detail import DetailView
from django.views.generic.list import ListView
from django.contrib.auth.forms import UserCreationForm
from .models import Competion, UserSubmission
import calendar
import datetime
import numpy as np
import pandas as pd
# Create your views here.


class CompetionList(ListView):
    model = Competion
    context_object_name = 'list'
    template_name = 'complist.html'


class CompetionDetail(DetailView):
    model = Competion
    template_name ='compdetail.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        competition_id = self.kwargs.get('pk', None)
        competition = Competion.objects.filter(id=competition_id).last()
        user = self.request.user
        if user.is_authenticated:
            user_submissions = UserSubmission.objects.filter(user=user, competition=competition)
            if user_submissions.exists():
                context['latest_sub'] = user_submissions.latest('submission_date')
            context['best_sub'] = UserSubmission.objects.filter(user=user, competition=competition).order_by('-score').first()
        context['submissions'] = UserSubmission.objects.filter(competition=competition).order_by('-score', 'submission_date')
        return context
    
class ParticipantsVIew(View):
       def get(self, *args, **kwargs):
        context = {}
        competition = self.kwargs.get('pk')
        comp = Competion.objects.filter(id=competition)
        return render(self.request,'complist.html',context)
        print(comp)
        return redirect('http://127.0.0.1:8000/competion/competion-list/')

class UserSubmissionView(LoginRequiredMixin, View):
    # def get(self, *args, **kwargs):
    #     competition_id = self.kwargs.get('pk', None)
    #     competition = Competion.objects.filter(id=competition_id).last()
    #     context = {}
    #     context['competition'] = competition
    #     return render(self.request, 'usersubmit.html', context)

    def post(self, *args, **kwargs):
        competition_id = self.kwargs.get('pk', None)
        today = datetime.date.today()
        competition = Competion.objects.filter(id=competition_id, end__gte=today).last()
        user = self.request.user
        user_file = self.request.FILES.get('user_file', None)
        if not user_file:
            messages.error(self.request, 'No file uploaded!')
            return redirect('Competion:detail', pk=competition_id)
        if not competition:
            messages.error(self.request, 'End date for the competition has passed.')
            return redirect('Competion:detail', pk=competition_id)
        if user in competition.participants.all():
            admin_file = competition.admin_file
            score = self._get_submission_score(user_file, admin_file)
            if (user_file and admin_file and competition and score != None):
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
        if user_file and admin_file:
            try:
                user_df=pd.read_csv(user_file, sep=',')
                admin_df=pd.read_csv(admin_file, sep=',')
                col1 = 'Admin Title'
                col2 = 'User Title'
                result = pd.concat([admin_df[col1],user_df[col2]], axis=1)
                comparison_column = np.where(result[col1]==result[col2], 1, 0)
                df_comparison_column = pd.DataFrame(comparison_column, columns=['Total'])
                final_result = pd.concat([result, df_comparison_column], axis=1)
                print(final_result)
                correct_percent = 100 * df_comparison_column.sum() / len(admin_df.index)
                percent = correct_percent.tolist().pop()  # Convert to python native type
                return percent
            except Exception as e:
                return 0
        else:
            return 0
    
            




