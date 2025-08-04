from django.urls import path
from backend.suspension import views as suspension_views

urlpatterns = [
    path('api/suspension/register', suspension_views.RegisterSuspension.as_view(),
         name='register suspension'),
    path('api/suspension/<str:serial_number>/add-service', suspension_views.SuspensionHistory.as_view(),
         name='add suspension service record'),
    path('api/suspension/<str:serial_number>', suspension_views.SuspensionHistory.as_view(),
         name='get suspension service record'),
    path('api/search/<str:brand>/<str:serial_number>', suspension_views.SuspensionSearch.as_view(),
         name='get suspension search'),
]
