from django.db import models

class Attendance(models.Model):
    user = models.ForeignKey('accounts.User', on_delete=models.CASCADE)
    date = models.DateField(auto_now_add=True)
    check_in_time = models.DateTimeField(null=True, blank=True)
    check_out_time = models.DateTimeField(null=True, blank=True)
    status = models.CharField(max_length=20, choices=[
        ('present', 'Present'),
        ('absent', 'Absent'),
        ('leave', 'Leave'),
    ], default='present')

    class Meta:
        unique_together = ('user', 'date')

    def __str__(self):
        return f"{self.user.email} - {self.date} - {self.status}"
