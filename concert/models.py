import datetime

from django.contrib.auth.models import AbstractUser
from django.core.validators import MaxValueValidator, MinValueValidator
from django.db import models
from django.utils import timezone
from django.utils.translation import gettext as _




class User(AbstractUser):
    email     = models.EmailField(max_length=70)
    is_venue  = models.BooleanField(default=False)

    def isVenue():
        return is_venue    
    

class Venue(models.Model):
    user         = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
    venue_name   = models.CharField(max_length=128) 
    location     = models.CharField(max_length=128) 
    website      = models.URLField()
    description  = models.CharField(max_length=560) 
    phone_number = models.CharField(max_length=15) 
    capacity     = models.IntegerField(default=0)
    image        = models.ImageField(upload_to='venue_images', blank=True, null=True)

    def __str__(self): 
        return self.user.username


class Concert(models.Model):
    concertID   = models.AutoField(primary_key=True)
    artist      = models.CharField(max_length=128,) 
    date        = models.DateField(_("Date"))
    start_time  = models.TimeField(_("Start Time"))
    end_time    = models.TimeField(_("End Time"))
    image       = models.ImageField(upload_to='concert_images', null=True)
    url         = models.URLField()
    description = models.CharField(max_length=560)
    spotify_URI = models.CharField(max_length=100, null = True)
    venue       = models.ForeignKey(Venue, related_name='concert', on_delete=models.CASCADE)

    class Meta():
        ordering = ['-date']

    def is_future(self):
        print(datetime.date.today() )
        if self.date >= datetime.date.today():
           return True 
        else:
           return False

    def __str__(self): 
        return str(self.concertID)


class Comment(models.Model):
    rating = models.IntegerField(default=5,
    validators=[
        MaxValueValidator(5),
        MinValueValidator(1)
        ])
    user        = models.ForeignKey(User, related_name='user', on_delete=models.CASCADE)
    text        = models.CharField(max_length=560, null = True)
    commentID   = models.AutoField(primary_key=True)
    concert     = models.ForeignKey(Concert, on_delete=models.CASCADE, related_name='comment')
    time        = models.DateTimeField(_("Comment Time"), default=timezone.now)

    class Meta():
        ordering = ['time']


    def __str__(self): 
        return str(self.commentID)


class GigGoer(models.Model):
    user      = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
    image     = models.ImageField(upload_to='profile_images', blank=True) 
    bookmarks = models.ManyToManyField(Concert, related_name='bookmarks')

    def __str__(self):
        return self.user.username
