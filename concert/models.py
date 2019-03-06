from django.db import models
from django.contrib.auth.models import AbstractUser
from datetime import datetime
from django.utils.translation import gettext as _
from django.core.validators import MaxValueValidator, MinValueValidator
from django.utils import timezone

class User(AbstractUser):
    is_venue = models.BooleanField(default = False)

    def isVenue():
        return is_venue    
    

class Venue(models.Model):
    user         = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
    #concerts     = models.ForeignKey(Concert, related_name='concerts')
    name         = models.CharField(max_length=128) 
    location     = models.CharField(max_length=128) 
    url          = models.URLField()
    description  = models.CharField(max_length=560) 
    phone_number = models.CharField(max_length=15) 
    capacity     = models.IntegerField(default=0)
    image        = models.ImageField(upload_to='venue_images', blank=True, null=True)

    def __str__(self): 
        return self.user.username


class Concert(models.Model):
    concertID   = models.AutoField(primary_key=True)
    artist      = models.CharField(max_length=128) 
    date        = models.DateField(_("Date"))
    start_time   = models.TimeField(_("Start Time"))
    end_time     = models.TimeField(_("End Time"))
    image       = models.ImageField(upload_to='venue_images', blank=True, null=True)
    url         = models.URLField()
    description = models.CharField(max_length=560)
    #venue       = models.CharField(max_length=128)
    venue = models.ForeignKey(Venue, related_name='venue')

    def __str__(self): 
        return str(self.concertID)


class Comment(models.Model):
    rating = models.IntegerField(default=5,
    validators=[
        MaxValueValidator(5),
        MinValueValidator(1)
        ])
    commentID   = models.AutoField(primary_key=True)
    concert     = models.ForeignKey(Concert, on_delete=models.CASCADE)
    date        = models.DateField(_("Date"),default=timezone.now)
    time        = models.DateTimeField(_("Comment Time"), default=timezone.now)

    def __str__(self): 
        return str(self.commentID)


class GigGoer(models.Model):
    user      = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
    comments  = models.ManyToManyField(Comment, related_name='comments')
    image     = models.ImageField(upload_to='profile_images', blank=True) 
    #bookmarks = models.ManyToManyField(Concert, related_name='bookmarks')

    def __str__(self):
        return self.user.username
