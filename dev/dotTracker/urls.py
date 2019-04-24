from django.urls import path

from . import views

urlpatterns = [
    path('', views.driver, name='rider'),
    path('demo/', views.demo, name='demo'),
    path('driver/', views.driver, name='driver'),
]
