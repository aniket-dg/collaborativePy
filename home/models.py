from django.db import models
from django.http import HttpResponseRedirect
from django.utils import timezone

from ckeditor.fields import RichTextField


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
    shipping_policy = RichTextField(null=True, blank=True)
    refund_policy = RichTextField(null=True, blank=True)
    return_policy = RichTextField(null=True, blank=True)
    cancellation_policy = RichTextField(null=True, blank=True)

    def __str__(self):
        return 'TPP'
