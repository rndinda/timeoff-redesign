from django.urls import path
import views

urlpatterns = [
    path('welcome/', views.welcome, name='welcome'),
]