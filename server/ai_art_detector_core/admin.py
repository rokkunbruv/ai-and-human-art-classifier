from django.contrib import admin
from .models import ModelFeedback

@admin.register(ModelFeedback)
class ModelFeedbackAdmin(admin.ModelAdmin):
  list_display = ('positive_count', 'negative_count')
