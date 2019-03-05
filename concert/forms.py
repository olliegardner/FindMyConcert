from django import forms
from django.contrib.auth.forms import UserCreationForm
from concert.models import User, GigGoer, Venue
from django.db import transaction
from allauth.account.forms import SignupForm
from concert.models import USERTYPE

class VenueSignupForm(SignupForm):
    name         = forms.CharField(max_length=128) 
    location     = forms.CharField(max_length=128) 
    url          = forms.URLField()
    description  = forms.CharField(max_length=560) 
    phone_number = forms.CharField(max_length=15) 
    capacity     = forms.IntegerField()
    image        = forms.ImageField()

    def save(self, request):
        # Save the User instance and get a reference to it
        user = super(VenueSignupForm, self).save(request)
        # Create an instance of the model with the extra fields
        # then save it.
        venue = Venue(
            user           = user,
            name           = self.get(name),
            location       = self.get(location),
            url            = self.get(url),
            description    = self.get(description),
            phone_number   = self.get(phone_number),
            capacity       = self.get(capacity),
            image          = self.get(image),
        )

        user.user_type = USERTYPE.VENUE
        venue.save()

        return venue.name

class GigGoerForm(SignupForm):
    pass

    name         = forms.CharField(max_length=128) 
    location     = forms.CharField(max_length=128) 
    url          = forms.URLField()
    description  = forms.CharField(max_length=560) 
    phone_number = forms.CharField(max_length=15) 
    capacity     = forms.IntegerField()
    image        = forms.ImageField()

    def save(self, request):
        # Save the User instance and get a reference to it
        user = super(VenueSignupForm, self).save(request)
        # Create an instance of the model with the extra fields
        # then save it.
        venue = Venue(
            user           = user,
            name           = self.get(name),
            location       = self.get(location),
            url            = self.get(url),
            description    = self.get(description),
            phone_number   = self.get(phone_number),
            capacity       = self.get(capacity),
            image          = self.get(image),
        )
        venue.save()

        return venue.name


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






