from datetime import datetime
from statistics import mode
from django.db import models
import decimal
from ckeditor.fields import RichTextField
from django.core.validators import MaxValueValidator, MinValueValidator


class Plan(models.Model):
    title = models.CharField(max_length=100)
    cost = models.FloatField(help_text="Cost of plan without any discounts.")
    duration = models.IntegerField(null=True, blank=True, help_text="Enter how many days the plan is valid.")
    description = models.TextField(null=True, blank=True, help_text="Short summary for whom this plan would be useful.")
    discount_percentage = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True,
                                              help_text="Discount percentage for the provided cost.")
    discount_cost = models.FloatField(null=True, blank=True)
    is_recommended = models.BooleanField(default=False)
    features = RichTextField(null=True, blank=True, help_text="Specify features for plan if any in points.")

    # Permissions
    group_create = models.BooleanField(default=True, help_text="Has permission to create new groups.")
    add_people = models.BooleanField(default=True, help_text="Has permission to add people to groups.")
    total_group_create_size = models.IntegerField(default=0,
                                                  help_text="Total number of groups that can be created under this plan.")
    group_size = models.IntegerField(default=0, help_text="Number of people that can be added per group.")

    def get_discounted_price(self):
        if self.discount_percentage:
            return self.discount_cost
        else:
            return self.cost

    def __str__(self):
        return f"{self.title}_{self.cost}"

    class Meta:
        ordering = ['cost']

class PlanWithQty(models.Model):
    plan = models.ForeignKey(Plan, on_delete=models.CASCADE)
    # qty = models.IntegerField(default=1)
    valid_till = models.DateField(null=True, blank=True)

    def remaining_days(self):
        now = datetime.now().date()
        now = datetime(day=now.day - 1, month=now.month, year=now.year).date()
        days = (self.valid_till - now).days
        if days >= 0:
            return days
        else:
            return 0

class Payment(models.Model):
    plan = models.ForeignKey(Plan, on_delete=models.CASCADE, related_name='dummpy_plan_payment', blank=True, null=True)

    coupon = models.ForeignKey('Coupon', on_delete=models.SET_NULL, null=True, blank=True)
    coupon_discount = models.FloatField(default=0.0)

    valid_till = models.DateField(null=True, blank=True)
    amt_paid = models.FloatField(null=True, blank=True)
    order_id = models.CharField(unique=True, max_length=100, null=True, blank=True)
    paid = models.BooleanField(default=False)
    timestamp = models.DateTimeField(auto_now_add=True)
    total_group_create_size = models.IntegerField(default=0)
    group_size = models.CharField(null=True, blank=True, max_length=200)

    plans = models.ManyToManyField(PlanWithQty, blank=True)

    payu_dict = models.TextField(null=True, blank=True)

    def __str__(self):
        return f"{self.id}_Payment"

    def get_calculated_price(self):
        if self.coupon_discount > 0:
            discount = (float(self.coupon_discount) / 100) * float(self.plan.get_discounted_price())
            price = float(self.plan.get_discounted_price()) - discount
        else:
            price = float(self.plan.get_discounted_price())
        return "%.2f"%price

class ManyPlans(models.Model):
    plan = models.ForeignKey(Plan, on_delete=models.CASCADE)
    payment = models.ForeignKey('Payment', on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.id}_user_many_plans"

class Coupon(models.Model):
    code = models.CharField(max_length=15, null=True, blank=True)
    discount_percent = models.DecimalField(('Discount Percentage (%)'), max_digits=5, decimal_places=2,
                                           validators=[MinValueValidator(0), MaxValueValidator(100)])
    used_by = models.ManyToManyField('users.User', blank=True)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.id} Coupon"
