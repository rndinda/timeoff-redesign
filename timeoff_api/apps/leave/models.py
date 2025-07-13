from django.db import models
from django.utils import timezone

class LeaveRequest(models.Model):
    LEAVE_TYPE_CHOICES = (
        ('sick', 'Sick Leave'),
        ('personal', 'Personal Leave'),
        ('maternity', 'Maternity Leave'),
        ('paternity', 'Paternity Leave'),
        ('compassionate', 'Compassionate Leave'),
        ('unpaid', 'Unpaid Leave'),
        ('study', 'Study Leave'),
        ('emergency', 'Emergency Leave'),
        ('other', 'Other'),
    )

    id = models.UUIDField(primary_key=True, default=models.UUIDField, editable=False)
    user = models.ForeignKey('accounts.User', on_delete=models.CASCADE, related_name='leaves')
    leave_type = models.CharField(max_length=30, choices=LEAVE_TYPE_CHOICES)
    start_date = models.DateField()
    end_date = models.DateField()
    duration = models.PositiveIntegerField()
    days_remaining = models.PositiveIntegerField()
    status = models.CharField(max_length=20, choices=[
        ('pending', 'Pending'),
        ('approved', 'Approved'),
        ('rejected', 'Rejected'),
    ], default='pending')
    description = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ('user', 'start_date', 'end_date')
        ordering = ['-created_at']

    def save(self, *args, **kwargs):
        # Calculate duration
        if self.start_date and self.end_date:
            self.duration = (self.end_date - self.start_date).days + 1

        # Get total approved leave this year
        year = self.start_date.year
        approved_leaves = LeaveRequest.objects.filter(
            user=self.user,
            status='approved',
            start_date__year=year
        ).exclude(pk=self.pk)

        used_days = sum(l.duration for l in approved_leaves)

        # Get company leave allowance
        try:
            company_leave_days = self.user.profile.company.leave_days_per_year
        except AttributeError:
            company_leave_days = 0  # fallback if company/profile missing

        self.days_remaining = max(company_leave_days - used_days - self.duration, 0)

        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.user.email} - {self.leave_type} ({self.start_date} to {self.end_date}) - {self.status}"