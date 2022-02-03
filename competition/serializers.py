from rest_framework import serializers
from .models import Competion

class ReadOnlyModelSerializer(serializers.ModelSerializer):
    def get_fields(self, *args, **kwargs):
        fields = super().get_fields(*args, **kwargs)
        for field in fields:
            fields[field].read_only = True
        return fields


class ReadOnlyCompetitionModelSerializer(ReadOnlyModelSerializer):
    class Meta:
        model = Competion
        fields = ('id', 'name', 'image', 'status', 'level', 'start', 'end', )
