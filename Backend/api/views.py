from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
from .serializers import ProfileSerializer, ReservationSerializer
from rest_framework.permissions import IsAuthenticated
from .models import Reservation

class UserProfileView(APIView):
    permission_classes = (IsAuthenticated,) 

    def get(self, request, id):
        try:
            user = User.objects.get(id=id)
            serializer = ProfileSerializer(user)
            return Response(serializer.data)
        except User.DoesNotExist:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

class ReservationView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        user = request.user
        reservations = Reservation.objects.filter(user = user)
        serializer = ReservationSerializer(reservations, many=True)
        return Response(serializer.data)
    
    def post(self, request):
        user = request.user
        data = request.data
        data['user'] = user.id
        serializer = ReservationSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)