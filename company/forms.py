from django import forms

from company.models import Company


class CompanyForm(forms.ModelForm):
    class Meta:
        model = Company
        exclude = ['superuser', 'share_link']