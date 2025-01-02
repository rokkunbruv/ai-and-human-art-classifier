from django.db import models

class ModelFeedback(models.Model):
    """manages accuracy feedback from users"""
    positive_count = models.PositiveIntegerField(default=0)
    negative_count = models.PositiveIntegerField(default=0)

    def increment_positive_count(self):
        """Increment positive feedback count"""
        self.positive_count = models.F('positive_count') + 1
        self.save(update_fields=['positive_count'])
        self.refresh_from_db()

    def increment_negative_count(self):
        """Increment negative feedback count"""
        self.negative_count = models.F('negative_count') + 1
        self.save(update_fields=['negative_count'])
        self.refresh_from_db()

    
