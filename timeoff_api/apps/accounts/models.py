from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    username = None
    USER_TYPE_CHOICES = (
        ('Employee', 'Employee'),
        ('Management', 'Management'),
    )
    
    id = models.UUIDField(primary_key=True, default=models.UUIDField, editable=False)
    email = models.EmailField(unique=True)
    employee_id = models.CharField(max_length=20, unique=True)
    user_type = models.CharField(max_length=10, choices=USER_TYPE_CHOICES)
    created_at = models.DateTimeField(auto_now_add=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name', 'user_type']

    def __str__(self):
        return f"{self.first_name} {self.last_name} ({self.user_type})"
    
class UserProfile(models.Model):
    MANAGEMENT_ROLE_CHOICES = (
        ('Human Resource Manager', 'Human Resource Manager'),
        ('General Manager', 'General Manager'),
        ('Assistant Quality Assurance Manager', 'Assistant Quality Assurance Manager'),
        ('Procurement Manager', 'Procurement Manager'),
        ('Quality and Compliance Manager', 'Quality and Compliance Manager'),
        ('Logistician', 'Logistician'),
        ('Accountant', 'Accountant'),
        ('Production Supervisor', 'Production Supervisor'),
        ('Inventory Supervisor', 'Inventory Supervisor'),
        ('Production Supervisor', 'Production Supervisor'),
        ('Production Manager', 'Production Manager'),
        ('Production Support', 'Production Support'),
        ('Janitor', 'Janitor'),
        ('Security Guard', 'Security Guard'),
        ('Managing Director', 'Managing Director'),
        ('Director', 'Director'),
    )
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    role = models.CharField(max_length=50, choices=MANAGEMENT_ROLE_CHOICES, blank=True, null=True)
    photo = models.ImageField(upload_to='profile_photos/', blank=True, null=True)
    company = models.ForeignKey('companies.Company', on_delete=models.CASCADE, related_name='employees', blank=True, null=True)

    def __str__(self):
        return f"Profile of {self.user.first_name} {self.user.last_name}"
