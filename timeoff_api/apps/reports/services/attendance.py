from apps.worklogs.models import Attendance
from django.db.models import Count

def get_daily_attendance_summary(date):
    return Attendance.objects.filter(date=date).values('status').annotate(count=Count('id'))

def get_monthly_attendance_summary(month, year):
    return Attendance.objects.filter(date__month=month, date__year=year).values('status').annotate(count=Count('id'))