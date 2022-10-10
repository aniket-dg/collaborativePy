from django.db import models




# Create your models here.
class Company(models.Model):
    name = models.CharField(max_length=300)
    website_url = models.URLField(null=True, blank=True)
    superuser = models.ForeignKey('users.User', on_delete=models.CASCADE, related_name='company_user_admin')
    share_link = models.TextField(null=True, blank=True)

    def is_plan_valid(self):
        return self.superuser.is_company_plan_valid()

    def get_plan(self):
        return self.superuser.payment.plan if self.is_plan_valid() else None
