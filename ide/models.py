from django.db import models

from users.models import User


# Create your models here.
class EditorSession(models.Model):
    users = models.ManyToManyField(User, related_name='editors_users')
    file_data = models.JSONField()
