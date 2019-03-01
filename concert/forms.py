from django import forms
from concert.models import UserProfile
from django.contrib.auth.models import User
from django.contrib.auth.forms import UserCreationForm

class RegistrationForm(UserCreationForm):
	venue = forms.BooleanField(required=False)
	picture = forms.ImageField(required=False) 

	class Meta:
		model = User
		fields = ('username', 'email', 'password1', 'password2', 'venue', 'picture')
