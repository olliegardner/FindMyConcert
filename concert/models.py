from django.db import models
from django.contrib.auth.models import User

class UserProfile(models.Model):
	user = models.OneToOneField(User)

	# attributes for user
	email = models.EmailField(max_length=70, unique=True)
	picture = models.ImageField(upload_to='profile_images', blank=True) 

	def __str__(self):
		return self.user.username
