from django.urls import path

from . import views

urlpatterns = [
<<<<<<< HEAD
    path('', views.index, name='index'),
]
=======
        path('',views.index,name='index'),
        path('<int:question_id>/', views.detail, name='details'),
        path('<int:question_id>/results/', views.results, name='results'),
        path('<int:question_id>/vote/', views.vote, name='vote'),
]

>>>>>>> 3bbc8e634e9c46f3e684f843e541ab9496f21945
