from django.urls import path
from . import views

app_name="ai_art_detector_core"
urlpatterns = [
    path('', views.index, name='index'),
    path('process-image/', views.process_image, name='process_image'),
    path('submit-feedback/', views.submit_feedback, name='submit_feedback'),
    path('fetch-feedback/', views.fetch_feedback, name='fetch_feedback'),
    path('health/', views.fetch_health, name='fetch_health'),
]