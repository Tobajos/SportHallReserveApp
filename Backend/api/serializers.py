from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Reservation

class UserSerializer(serializers.ModelSerializer):
    class Meta(object):
        model = User
        fields = ('id','username','password','first_name','last_name')

class ReservationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reservation
        fields = '__all__'
