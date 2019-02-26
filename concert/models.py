from django.db import models
from django.contrib.auth.models import AbstractBaseUser, User

#class User(AbstractBaseUser):
	#username = models.CharField(unique=True, max_length=30, verbose_name="Username")

	#USERNAME_FIELD = 'username'

	#User._meta_get_field('username').validators[1].limit_value = 30

class UserProfile(models.Model):
	user = models.OneToOneField(User)

	# attributes for user
	venue = models.BooleanField(default=False)
	picture = models.ImageField(upload_to='profileImages', blank=True) 

	def __str__(self):
		return self.user.username


class Venue(models.Model):
	name = models.CharField(max_length=128) 
	location = models.CharField(max_length=128) 
	url = models.URLField()
	description = models.CharField(max_length=560) 
	phone_number = models.CharField(max_length=560) 
	photo = models.ImageField(upload_to='venueImages', blank=True, null=True)

	views = models.IntegerField(default=0)
	def __str__(self): 
		return self.name