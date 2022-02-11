from django.db import models
from django.http import HttpResponseRedirect
from django.utils import timezone
from multiselectfield import MultiSelectField
from ckeditor.fields import RichTextField
from django.urls import reverse


class NewsLetter(models.Model):
    email = models.EmailField(unique=True)
    date = models.DateTimeField(default=timezone.now)
    seen = models.BooleanField(default=False)

    class Meta:
        ordering = ['-date']

    def __str__(self):
        return f"{self.email}"

    def get_absolute_url(self):  # Redirect to this link after adding review
        return HttpResponseRedirect(self.request.META.get('HTTP_REFERER'))


class Contact(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(null=True, blank=True)
    mobile = models.BigIntegerField()
    description = models.TextField()
    date = models.DateTimeField(default=timezone.now)
    seen = models.BooleanField(default=False)

    class Meta:
        ordering = ['-date']

    def __str__(self):
        return f"{self.name}_{self.mobile}"


class TPP(models.Model):
    terms_and_condition = RichTextField(null=True, blank=True)
    privacy_policy = RichTextField(null=True, blank=True)
    refund_policy = RichTextField(null=True, blank=True)
    cancellation_policy = RichTextField(null=True, blank=True)

    def __str__(self):
        return 'TPP'


YES_NO = (
    ('Yes', 'Yes'),
    ('No', 'No'),
)
AGE_CHOICES = (
    ('12-18', '12-18'),
    ('18-24', '18-24'),
    ('24-30', '24-30'),
    ('ABOVE 30', 'ABOVE 30'),
)
WORKED_MORE_IN = (
    ('MACHINE LEARNING', 'MACHINE LEARNING'),
    ('DEEP LEARNING', 'DEEP LEARNING'),
    ('JUST PYTHON CODING', 'JUST PYTHON CODING'),
    ('NONE OF THE ABOVE', 'NONE OF THE ABOVE'),
)
LIKES_TO_WORK_IN = (
    ('Alone', 'Alone'),
    ('In a team', 'In a team'),
)
FUNCTIONALITY_AREAS = (
    ('Finance and accounts', 'Finance and accounts'),
    ('Sales and marketing', 'Sales and marketing'),
    ('Office operation /Hr', 'Office operation /Hr'),
    ('Production/Maintainance /Quality', 'Production/Maintainance /Quality'),
    ('It /Software /Telecom', 'It /Software /Telecom'),
    ('Agriculture/farming/dairy', 'Agriculture/farming/dairy'),
    ('Construction/Real Estate', 'Construction/Real Estate'),
    ('Entertainment and media', 'Entertainment and media'),
    ('Education/Teachers/professor', 'Education/Teachers/professor'),
    ('Bpo/ITES/Telecaller/Customer care', 'Bpo/ITES/Telecaller/Customer care'),
    ('Fashion Designing', 'Fashion Designing'),
    ('Content/Editor/ journalists', 'Content/Editor/ journalists'),
    ('Legal/ law', 'Legal/ law'),
    ('Travelling agencies', 'Travelling agencies'),
    ('Bio tech /R&D /Scientists', 'Bio tech /R&D /Scientists'),
    ('Data scientists/Machine learning engineer/AI', 'Data scientists/Machine learning engineer/AI'),
    ('Student', 'Student'),
    ('Medicine/Biology /Pharmaceutical', 'Medicine/Biology /Pharmaceutical'),
    ('Electrical /Electronics/Electronic and telecommunications', 'Electrical /Electronics/Electronic and '
                                                                  'telecommunications'),
    ('Mechanical', 'Mechanical'),
    ('Chemical', 'Chemical'),
)


class PopUpQuestions(models.Model):
    age = models.CharField(max_length=100, choices=AGE_CHOICES, default=None)
    knowledge_ml_dl_ai = models.CharField(max_length=100, choices=YES_NO, default=None)
    worked_in = models.CharField(max_length=100, choices=WORKED_MORE_IN, default=None)
    code_difficult = models.CharField(max_length=100, choices=YES_NO, default=None)
    does_ml_dl_ai = models.CharField(max_length=100, choices=YES_NO, default=None)
    like_to_work_in = models.CharField(max_length=100, choices=LIKES_TO_WORK_IN, default=None)
    functionality_areas = MultiSelectField(choices=FUNCTIONALITY_AREAS, max_length=500)

    def __str__(self):
        return f"{self.id}"



class Faq(models.Model):
    question = models.CharField(max_length=300)
    answer = models.TextField()
    date = models.DateTimeField(default=timezone.now)
    is_active = models.BooleanField(default=False)

    def __str__(self):
        return self.question


class Ad(models.Model):
    image = models.ImageField(help_text='Size of 280x520 is recommended.')
    link = models.URLField()

    def __str__(self):
        return self.link

    def get_absolute_url(self):
        return reverse('analytics:ad-list')