from django.db import models
from django.contrib.auth.models import AbstractUser
from datetime import datetime
from django.utils.translation import gettext as _
from django.core.validators import MaxValueValidator, MinValueValidator
from django.utils import timezone

class User(AbstractUser):
    USER_TYPE_CHOICES = (
        (1, 'GigGoer'),
        (2, 'Venue'))
    
    user_type = models.PositiveSmallIntegerField(choices=USER_TYPE_CHOICES)

class Concert(models.Model):
    concertID   = models.AutoField(primary_key=True)
    artist      = models.CharField(max_length=128) 
    Date        = models.DateField(_("Date"))
    StartTime   = models.DateTimeField(_("Start Time"))
    EndTime     = models.DateTimeField(_(u"End Time"))
    image       = models.ImageField(upload_to='venue_images', blank=True, null=True)
    url         = models.URLField()
    description = models.CharField(max_length=560) 

    def __str__(self): 
        return self.name

class Comment(models.Model):
    rating = models.IntegerField( default=5,
    validators=[
        MaxValueValidator(5),
        MinValueValidator(1)
        ])
    commentID   = models.AutoField(primary_key=True)
    concert     = models.ForeignKey(Concert)
    date        = models.DateField(_("Date"),default=timezone.now)
    time        = models.DateTimeField(_(u"Comment Time"), default=timezone.now)

    def __str__(self): 
        return self.name


class GigGoer(models.Model):
    user      = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
    interests = models.ManyToManyField(Comment, related_name='comments')
    image     = models.ImageField(upload_to='profile_images', blank=True) 
    #bookmarks = models.ManyToManyField(Concert, related_name='bookmarks')

    def __str__(self):
        return self.user.username

class Venue(models.Model):
    user         = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
    concerts     = models.ManyToManyField(Concert, related_name='comments')
    name         = models.CharField(max_length=128) 
    location     = models.CharField(max_length=128) 
    url          = models.URLField()
    description  = models.CharField(max_length=560) 
    phone_number = models.CharField(max_length=15) 
    capacity     = models.IntegerField(default=0)
    image        = models.ImageField(upload_to='venue_images', blank=True, null=True)

    def __str__(self): 
        return self.name



