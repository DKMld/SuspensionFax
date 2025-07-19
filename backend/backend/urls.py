from django.contrib import admin
from django.urls import path, include
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include
from backend import settings

from backend.authentication import urls as auth_urls
from backend.common import urls as common_urls
from backend.suspension import urls as suspension_urls

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include(auth_urls)),
    path('', include(suspension_urls)),
    path('', include(common_urls)),

]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
