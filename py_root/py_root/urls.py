"""py_root URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
Including another URLconf
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('topics/', include('topics.urls')),
    path('polls/', include('polls.urls')),
    path('react_admin/', include('react_admin_python.urls')),
    path('admin/', admin.site.urls),
]
