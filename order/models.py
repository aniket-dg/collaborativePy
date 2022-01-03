from django.db import models
import decimal
from ckeditor.fields import RichTextField


class Plan(models.Model):
    title = models.CharField(max_length=100)
    cost = models.FloatField()
    duration = models.IntegerField(null=True, blank=True, help_text="Enter how many days plan valid")
    description = models.TextField(null=True, blank=True)
    discount_percentage = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)
    is_recommended = models.BooleanField(default=False)
    features = RichTextField(null=True, blank=True)

    # Permissions
    group_create = models.BooleanField(default=False)
    add_people = models.BooleanField(default=False)
    total_group_create_size = models.IntegerField(default=0)
    group_size = models.IntegerField(default=0)

    def get_discounted_price(self):
        if self.discount_percentage:
            discounted_price = decimal.Decimal(self.cost) - (decimal.Decimal(self.cost) * (self.discount_percentage / 100))
            return discounted_price
        else:
            return self.cost

    def __str__(self):
        return f"{self.title}_{self.cost}"


class Payment(models.Model):
    plan = models.ForeignKey(Plan, on_delete=models.CASCADE)

    valid_till = models.DateField(null=True, blank=True)
    amt_paid = models.FloatField(null=True, blank=True)
    order_id = models.CharField(unique=True, max_length=100, null=True, blank=True)
    paid = models.BooleanField(default=False)
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.id}_Payment"
