from django import forms
from django.contrib.auth.forms import UserCreationForm
from concert.models import User, GigGoer, Venue
from django.db import transaction




#EDIT FORMS
class EditGigGoerForm(forms.ModelForm):
    image = forms.ImageField(required=False)
    class Meta:
        model = GigGoer
        exclude = ('user', )

class EditVenueForm(forms.ModelForm):
    #CREATE THIS STUFF
    class Meta:
        model = Venue
        exclude = ('user', )






