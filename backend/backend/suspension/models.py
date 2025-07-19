from django.db import models
from django.contrib.auth.models import User


class UserRegisteredSuspension(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    brand = models.CharField(max_length=128)
    model = models.CharField(max_length=128)
    serial_number = models.CharField(max_length=128, null=True)

    additional_description = models.CharField(max_length=256, blank=True, null=True)

    type = models.CharField(max_length=128, choices=[
        ('fork', 'Fork'),
        ('shock', 'Rear Shock'),
        ('dropper', 'Dropper Post'),
        ('other', 'Other')
    ])

    register_date = models.DateTimeField(auto_now_add=True)

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['user', 'serial_number'], name='unique_serial_number_per_user')
        ]


class SuspensionServiceHistory(models.Model):
    suspension = models.ForeignKey(UserRegisteredSuspension, on_delete=models.CASCADE, related_name='service_history')

    service_date = models.DateField()
    type_of_service = models.CharField(max_length=256)
    serviced_by = models.CharField(max_length=256)

    invoice = models.FileField(upload_to='service_invoices/', blank=True, null=True)

    created_at = models.DateTimeField(auto_now_add=True)


