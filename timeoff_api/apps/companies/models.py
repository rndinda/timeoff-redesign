from django.db import models

class Company(models.Model):
    id = models.UUIDField(primary_key=True, default=models.UUIDField, editable=False)
    name = models.CharField(max_length=255, unique=True)
    address = models.CharField(max_length=255, blank=True)
    phone_number = models.CharField(max_length=20, blank=True)
    email = models.EmailField(blank=True)
    website = models.URLField(blank=True)
    leave_days_per_year = models.IntegerField(default=21)
    industry = models.CharField(max_length=100, blank=True)

    def __str__(self):
        return self.name