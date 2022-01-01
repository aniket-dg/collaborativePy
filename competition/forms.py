from django import forms
from .models import Competion, UserSubmission


class CompetitionCreateForm(forms.ModelForm):
    class Meta:
        model = Competion
        fields = ['name', 'image', 'overview', 'challenge', 'rules', 'evaluation', 'prize', 'data', \
                    'admin_file', 'status', 'level', 'start', 'end', 'participants']
        widgets = {
            'start': forms.DateInput(attrs={'type': 'date', 'class': 'form-control'}),
            'end': forms.DateInput(attrs={'type': 'date', 'class': 'form-control'}),
        }
        help_texts={
            'admin_file': '*Click to download a demo file to understand its structure.'
        }