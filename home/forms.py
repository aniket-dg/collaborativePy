from django import forms

from .models import NewsLetter, PopUpQuestions


class NewsLetterForm(forms.ModelForm):
    class Meta:
        model = NewsLetter
        fields = ('email',)


class PopUpQuestionsForm(forms.ModelForm):
    class Meta:
        model = PopUpQuestions
        fields = ['age', 'knowledge_ml_dl_ai', 'worked_in', 'code_difficult', 'does_ml_dl_ai',
                  'like_to_work_in', 'functionality_areas']
