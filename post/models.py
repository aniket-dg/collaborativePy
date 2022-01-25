from django.db import models
from ckeditor.fields import RichTextField

POST_CATEGORY_CHOICES = (
    ('Question/Errors', 'Question/Errors'),
    ('Discussion and Informative', 'Discussion and Informative'),
    ('Skeleton Code', 'Skeleton Code'),
)

LANGUAGES_CHOICES = (
    ('Python', 'Python'),
    ('Java', 'Java'),
    ('Ruby', 'Ruby'),
)

SCOPE_CHOICES = (
    ('Scope 1', 'Scope 1'),
    ('Scope 2', 'Scope 2'),
    ('Scope 3', 'Scope 3'),

)


class Scope(models.Model):
    name = models.CharField(max_length=200)
    icon = models.CharField(max_length=100, default="fas fa-globe")

    def __str__(self):
        return f"{self.name}"


class Language(models.Model):
    name = models.CharField(max_length=200)
    icon = models.CharField(max_length=100, default="fas fa-globe")

    def __str__(self):
        return f"{self.name}"


class Category(models.Model):
    name = models.CharField(max_length=200)
    icon = models.CharField(max_length=100, default="fas fa-pencil-alt")

    def __str__(self):
        return f"{self.name}"


class Post(models.Model):
    user = models.ForeignKey('users.User', on_delete=models.CASCADE)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    description = models.TextField(null=True, blank=True)
    image1 = models.ImageField(upload_to='post_image/', null=True, blank=True)
    image2 = models.ImageField(upload_to='post_image/', null=True, blank=True)
    image3 = models.ImageField(upload_to='post_image/', null=True, blank=True)
    image4 = models.ImageField(upload_to='post_image/', null=True, blank=True)
    image5 = models.ImageField(upload_to='post_image/', null=True, blank=True)
    skeleton_code = RichTextField(null=True, blank=True)
    language = models.ForeignKey(Language, on_delete=models.CASCADE)
    scope_of_work = models.ForeignKey(Scope, on_delete=models.CASCADE)
    liked_by = models.ManyToManyField('users.User', blank=True, related_name='liked_by')
    timestamp = models.DateTimeField(auto_now_add=True)

    code = models.TextField(null=True, blank=True)

    def __str__(self):
        return f"{self.id}"

    class Meta:
        ordering = ['-timestamp']


LEVEL_ONE_CATEGORY = (
    ('Scope 1', 'Scope 1'),
    ('Scope 2', 'Scope 2'),
)


class FirstLevelCategory(models.Model):
    name = models.CharField(max_length=300)

    def __str__(self):
        return self.name


class SecondLevelCategory(models.Model):
    name = models.CharField(max_length=300)
    first_category = models.ForeignKey(FirstLevelCategory, on_delete=models.CASCADE, related_name='firstCat', null=True, blank=True)

    def __str__(self):
        return self.name


class ThirdLevelCategory(models.Model):
    name = models.CharField(max_length=300)
    first_category = models.ForeignKey(FirstLevelCategory, on_delete=models.CASCADE, null=True, blank=True)
    second_category = models.ForeignKey(SecondLevelCategory, on_delete=models.CASCADE, related_name='firstCatThird', null=True, blank=True)

    def __str__(self):
        return self.name


class FourthLevelCategory(models.Model):
    name = models.CharField(max_length=300)
    first_category = models.ForeignKey(FirstLevelCategory, on_delete=models.CASCADE, null=True, blank=True)
    second_category = models.ForeignKey(SecondLevelCategory, on_delete=models.CASCADE, null=True, blank=True)
    third_category = models.ForeignKey(ThirdLevelCategory, on_delete=models.CASCADE, related_name='firstCatFourth', null=True, blank=True)

    def __str__(self):
        return self.name


class SkeletonPost(models.Model):
    user = models.ForeignKey('users.User', on_delete=models.CASCADE)
    first_level_category = models.ForeignKey(FirstLevelCategory, on_delete=models.CASCADE, null=True, blank=True)
    second_level_category = models.ForeignKey(SecondLevelCategory, on_delete=models.CASCADE, null=True, blank=True)
    third_level_category = models.ForeignKey(ThirdLevelCategory, on_delete=models.CASCADE, null=True, blank=True)
    fourth_level_category = models.ForeignKey(FourthLevelCategory, on_delete=models.CASCADE, null=True, blank=True)
    description = models.TextField()
    image1 = models.ImageField(upload_to='skeleton_image/', null=True, blank=True)
    image2 = models.ImageField(upload_to='skeleton_image/', null=True, blank=True)
    image3 = models.ImageField(upload_to='skeleton_image/', null=True, blank=True)
    image4 = models.ImageField(upload_to='skeleton_image/', null=True, blank=True)
    image5 = models.ImageField(upload_to='skeleton_image/', null=True, blank=True)
    skeleton_code = RichTextField(null=True, blank=True)
    language = models.CharField(max_length=100, choices=LANGUAGES_CHOICES)
    scope_of_work = models.CharField(max_length=100, choices=SCOPE_CHOICES)
    liked_by = models.ManyToManyField('users.User', blank=True, related_name='liked')
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.id}"

    class Meta:
        ordering = ['-timestamp']


class FlagInappropriate(models.Model):
    user = models.ForeignKey('users.User', on_delete=models.CASCADE, null=True, blank=True)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    reason = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.id}"


class BookMark(models.Model):
    user = models.ForeignKey('users.User', on_delete=models.CASCADE, null=True, blank=True)
    post = models.ForeignKey(Post, on_delete=models.CASCADE, null=True, blank=True)
    timestamp = models.DateTimeField(auto_now_add=True)
    skeleton_post = models.ForeignKey(SkeletonPost, on_delete=models.CASCADE, null=True, blank=True)
    def __str__(self):
        return f"{self.id}"


class PostComment(models.Model):
    user = models.ForeignKey('users.User', on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='post_comment')
    comment = models.TextField(max_length=200)
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.id}"

    class Meta:
        ordering = ['-timestamp']


class SkeletonPostComment(models.Model):
    user = models.ForeignKey('users.User', on_delete=models.CASCADE)
    post = models.ForeignKey(SkeletonPost, on_delete=models.CASCADE, related_name='post_comment')
    comment = models.TextField(max_length=200)
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.id}"
