from django.contrib import admin
from .models import Post, PostComment,SkeletonPost, FirstLevelCategory, SecondLevelCategory, ThirdLevelCategory, FourthLevelCategory
from .models import SkeletonPostComment, BookMark
# Register your models here.
class ModelPost(admin.ModelAdmin):
    list_display = ['id', 'user']
admin.site.register(Post, ModelPost)
admin.site.register(PostComment)
admin.site.register(BookMark)
admin.site.register(SkeletonPost)
admin.site.register(FirstLevelCategory)
admin.site.register(SecondLevelCategory)
admin.site.register(ThirdLevelCategory)
admin.site.register(FourthLevelCategory)
admin.site.register(SkeletonPostComment)