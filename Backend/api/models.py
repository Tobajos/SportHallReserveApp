from django.db import models
from django.contrib.auth.models import User

class Reservation(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    date = models.DateField()
    start_time = models.TimeField()
    end_time = models.TimeField()
    max_participants = models.PositiveIntegerField(default=1)

class Tournament(models.Model):
    name = models.CharField(max_length=50, blank=False,null=False)
    description = models.TextField(max_length=300,blank=True,null=True)
    date = models.DateField()
    start_time = models.TimeField()
    end_time = models.TimeField()

class Team(models.Model):
    name = models.CharField(max_length=50, blank=False, null=False)
    user = models.ManyToManyField(User)

class Match(models.Model):
    tournament = models.ForeignKey(Tournament, on_delete=models.CASCADE)
    date = models.DateField()
    team_1 = models.ForeignKey(Team, related_name='team_1', on_delete=models.CASCADE)
    team_2 = models.ForeignKey(Team, related_name='team_2', on_delete=models.CASCADE)
    score_team_1 = models.PositiveIntegerField(default = 0)
    score_team_2 = models.PositiveIntegerField(default = 0)

class Post(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    content = models.TextField(max_length=500,blank=False, null = False)
    date = models.DateField(auto_now_add=True)

class Comment(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    content = models.TextField(max_length=500,blank=False, null = False)
    date = models.DateField(auto_now_add=True)




    

    

