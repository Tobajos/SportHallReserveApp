from django.urls import path
from . import views

urlpatterns = [
        path('Register', views.register),
        path('Login', views.login),
        path('Logout',views.logout),

        path('Profiles',views.getProfiles),
        path('Profiles/<int:id>',views.getProfileDetails),
        
        path('Reservations',views.getReservations),
        path('Reservations/<int:id>',views.getReservationDetails),
        path('AddReservation',views.addReservation),
        path('DeleteReservation/<int:id>',views.deleteReservation),
]
