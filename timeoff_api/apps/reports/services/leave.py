from apps.leave.models import LeaveRequest
from django.db.models import Count

def get_leave_status_counts():
    return LeaveRequest.objects.values('status').annotate(count=Count('id'))
