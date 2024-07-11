from django.urls import path
from .views import UserProfileView, ReservationView

urlpatterns = [
    path('profile/<str:id>/', UserProfileView.as_view(), name='user-profile'),
    path('reservations/', ReservationView.as_view(), name='user-reservations' )
]
