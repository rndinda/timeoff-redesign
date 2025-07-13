from django.http import HttpResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from .services.leave import get_leave_status_counts
from .services.attendance import get_daily_attendance_summary

class LeaveStatusReport(APIView):
    def get(self, request):
        return Response(get_leave_status_counts())

class DailyAttendanceReport(APIView):
    def get(self, request):
        date = request.query_params.get('date')
        return Response(get_daily_attendance_summary(date))

def welcome(request):
    return HttpResponse("Welcome to this side of things")
