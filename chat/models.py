from django.db import models

from users.models import User


class Message(models.Model):
    author = models.ForeignKey(User, related_name='author_messages', on_delete=models.CASCADE)
    content = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.author.username

    def last_10_messages(self):
        return Message.objects.order_by('-timestamp').all()[:10]


class Comments(models.Model):
    text = models.CharField(max_length=300)
    comment_user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.id}"


POST_CATEGORY = (
    ('Travel', 'Travel'),
    ('Entertainment', 'Entertainment'),
)


class Post(models.Model):
    text = models.TextField(null=True, blank=True)
    image = models.ImageField(upload_to='post/', blank=True, null=True)
    description = models.TextField(null=True, blank=True)
    comments = models.ManyToManyField(Comments, blank=True)

    likes = models.IntegerField(default=0)
    post_user = models.ForeignKey(User, on_delete=models.CASCADE)
    category = models.CharField(choices=POST_CATEGORY, max_length=100, null=True, blank=True)

    def __str__(self):
        return f"{self.id}"
