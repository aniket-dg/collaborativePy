import django_filters
from django import forms
from post.models import SkeletonPost, FirstLevelCategory, SecondLevelCategory, ThirdLevelCategory, FourthLevelCategory


class SkeletonPostFilter(django_filters.FilterSet):
    first_level_category__id = django_filters.NumberFilter()
    second_level_category__id = django_filters.NumberFilter()
    third_level_category__id = django_filters.NumberFilter()
    fourth_level_category__id = django_filters.NumberFilter()

    class Meta:
        model = SkeletonPost
        fields = ['first_level_category','first_level_category__id','second_level_category','second_level_category__id', 'third_level_category','third_level_category__id','fourth_level_category','fourth_level_category__id']
