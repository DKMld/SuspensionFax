from django.urls import path
from backend.suspension import views as suspension_views

urlpatterns = [
    path('api/profile', suspension_views.RegisterSuspension.as_view(), name='user profile'),
]
