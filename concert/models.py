from django.db import models
from django.contrib.auth.models import User
from datetime import datetime
from django.utils.translation import gettext as _
from django.core.validators import MaxValueValidator, MinValueValidator
from django.utils import timezone

class UserProfile(models.Model):
	# links UserProfile to a User model instance
	user = models.OneToOneField(User)

	# additional attributes for user
	venue = models.BooleanField(default=False)
	picture = models.ImageField(upload_to='profileImages', blank=True) 

	def __str__(self):
		return self.user.username


class Venue(models.Model):
	venueID      = models.AutoField(primary_key=True)
	name         = models.CharField(max_length=128) 
	location     = models.CharField(max_length=128) 
	url          = models.URLField()
	description  = models.CharField(max_length=560) 
	phone_number = models.CharField(max_length=15) 
	capacity     = models.IntegerField(default=0)
	photo        = models.ImageField(upload_to='venueImages', blank=True, null=True)

	def __str__(self): 
		return self.name


class Concert(models.Model):
	concertID   = models.AutoField(primary_key=True)
	venue       = models.ForeignKey(Venue)
	artist      = models.CharField(max_length=128) 
	Date        = models.DateField(_("Date"))
	StartTime   = models.DateTimeField(_("Start Time"))
	EndTime     = models.DateTimeField(_(u"End Time"))
	photo       = models.ImageField(upload_to='venueImages', blank=True, null=True)
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