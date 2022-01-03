import datetime
from django.db import models
from users.models import User
from ckeditor.fields import RichTextField
from django.core.validators import MinValueValidator, MaxValueValidator



# Create your models here.

LEVEL_CHOICES = (
    ('Beginner', 'Beginner'),
    ('Advanced', 'Advanced'),
)

STATUS_CHOICES = (
    ('Active', 'Active'),
    ('Late Submission', 'Late Submission'),
    ('Closed', 'Closed'),
)

class Competion(models.Model):
    name = models.CharField(max_length=100)
    image = models.ImageField(upload_to="image/",null=True, blank=True)
    overview = RichTextField(null=True, blank=True)
    challenge= RichTextField(null=True, blank=True)
    rules= RichTextField(null=True, blank=True)
    evaluation = RichTextField(null=True, blank=True)
    prize= RichTextField(null=True, blank=True)
    data =models.FileField(upload_to="image/",null=True, blank=True)
    status = models.CharField(max_length=100,choices=STATUS_CHOICES,null=True, blank=True)
    level = models.CharField(max_length=100,choices=LEVEL_CHOICES,null=True, blank=True)
    participants = models.ManyToManyField(User)
    admin_file = models.FileField(upload_to="admin_submissions/", null=True, blank=True)
    start = models.DateField(default=datetime.date.today)
    end = models.DateField(default=datetime.date.today)
    
    
    def __str__(self):
        return self.name
    
class UserSubmission(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="submissions")
    competition = models.ForeignKey(Competion, on_delete=models.CASCADE, related_name="submissions")
    user_file = models.FileField(upload_to="user_submissions/", null=True, blank=True)
    submission_date = models.DateTimeField(auto_now_add=True)
    score = models.DecimalField(max_digits=5, decimal_places=2, default=0, validators=[MinValueValidator(0), MaxValueValidator(100)])

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['user', 'competition'], name='unique_submission')
        ]

    def __str__(self):
        return f'Submission #{self.id} by {self.user.email}'