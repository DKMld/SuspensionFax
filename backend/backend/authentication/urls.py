from django.urls import path
from backend.authentication import views as auth_views

urlpatterns = [
    path('api/register', auth_views.register, name='register page'),
    path('api/login', auth_views.login_view, name='login user'),
    path('api/logout', auth_views.logout, name='logout user'),
]
