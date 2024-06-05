from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.authtoken.models import Token
from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from django.contrib.auth.models import User
from .serializers import UserSerializer, ReservationSerializer
from rest_framework import status
from .models import Profile, Reservation



@api_view(['POST'])
def login(request):
    user = get_object_or_404(User,username=request.data['username'])
    if not user.check_password(request.data['password']):
        return Response({"detail":"Not Found"}, status=status.HTTP_404_NOT_FOUND)
    token, created = Token.objects.get_or_create(user=user)
    serializer=UserSerializer(instance=user)
    return Response({"token":token.key,"user":serializer.data})


@api_view(['POST'])
@permission_classes([AllowAny])
def register(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        profile = Profile.objects.create(
            user=user,
            first_name=request.data.get('first_name'),
            last_name=request.data.get('last_name'),
        )
        user.set_password(request.data["password"])
        user.save()
        token = Token.objects.create(user=user)
        return Response({"token": token.key, "user": serializer.data})
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def logout(request):
    if request.method == "POST":
        request.user.auth_token.delete()
        return Response({"Message":"You are logged out"}, status=status.HTTP_200_OK)


@api_view(['GET'])
def getProfiles(request):
    profiles = User.objects.all()
    serializer = UserSerializer(profiles,many=True)
    return Response(serializer.data)


@api_view(['GET'])
def getProfileDetails(request, id):
    try: 
        profile = User.objects.get(pk = id)
    except User.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    serializer = UserSerializer(profile)
    return Response(serializer.data)


@api_view(['GET'])
def getReservations(request):
    reservations = Reservation.objects.all()
    serializer = ReservationSerializer(reservations, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def getReservationDetails(request,id):
    try: 
        reservation = Reservation.objects.get(pk = id)
    except Reservation.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    serializer = ReservationSerializer(reservation)
    return Response(serializer.data)


@api_view(['POST'])       
def addReservation(request):
    user = request.user  
    data = request.data.copy()  
    data['user'] = user.id
    serializer = ReservationSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
def deleteReservation(request, id):
    try:
        reservation = Reservation.objects.get(pk = id)
    except Reservation.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    reservation.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)









