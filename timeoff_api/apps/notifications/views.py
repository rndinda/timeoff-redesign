from django.http import HttpResponse
from rest_framework import viewsets, permissions
from .serializers import NotificationSerializer

class NotificationViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = NotificationSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return self.request.user.notifications.all()

def welcome(request):
    return HttpResponse("Welcome to this side of things")
