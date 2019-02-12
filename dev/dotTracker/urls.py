from django.urls import path

from . import views

urlpatterns = [
    path('', views.rider, name='rider'),
    path('driver/', views.driver, name='driver'),
]
