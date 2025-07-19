from django.contrib.auth.models import User
from rest_framework import serializers
from backend.suspension.models import UserRegisteredSuspension, SuspensionServiceHistory


class RegisterSuspensionSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserRegisteredSuspension
        fields = ['brand', 'model', 'serial_number', 'additional_description', 'type', 'register_date']

    def create(self, validated_data):
        user = self.context.get('request').user
        return UserRegisteredSuspension.objects.create(user=user, **validated_data)


class SuspensionHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = SuspensionServiceHistory
        fields = ['service_date', 'type_of_service', 'serviced_by']

    def create(self, validated_data):
        suspension = self.context.get('suspension')

        return SuspensionServiceHistory.objects.create(
            suspension=suspension, **validated_data
        )
