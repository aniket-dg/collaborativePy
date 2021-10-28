from django.db import models


class Plan(models.Model):
    title = models.CharField(max_length=100)
    cost = models.FloatField()
    duration = models.IntegerField(null=True, blank=True, help_text="Enter how many days plan valid")
    description = models.TextField(null=True, blank=True)

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
