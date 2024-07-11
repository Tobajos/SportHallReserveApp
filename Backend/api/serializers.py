from rest_framework import serializers
from .models import Reservation, Tournament
from Authentication.serializers import UserSerializer
from django.contrib.auth.models import User

class ProfileSerializer(UserSerializer):
    class Meta:
        model = User
        fields = ('id','username', 'email', 'first_name', 'last_name')

class ReservationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reservation
        fields = '__all__'

class TournamentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tournament
        fields = '__all__'


