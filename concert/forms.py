from django import forms
from django.contrib.auth.forms import UserCreationForm
from concert.models import GigGoer, User, Venue

class GigGoerSignUpForm(UserCreationForm):
    email = forms.EmailField(required=True)
    image = forms.ImageField(required=False)

    class Meta(UserCreationForm.Meta):
        model = User

    def save(self):
        user = super().save(commit=False)
        user.is_venue = False
        user.save()

        gigGoer = GigGoer.objects.create(user=user)
        gigGoer.email = self.cleaned_data.get('email')
        gigGoer.image = self.cleaned_data.get('image')
        gigGoer.save()

        return user

class VenueSignUpForm(UserCreationForm):
    email        = forms.EmailField(required=True)
    image        = forms.ImageField(required=False)
    venue_name   = forms.CharField(max_length=128) 
    location     = forms.CharField(max_length=128) 
    website      = forms.URLField()
    description  = forms.CharField(max_length=560) 
    phone_number = forms.CharField(max_length=15) 
    capacity     = forms.IntegerField()

    class Meta(UserCreationForm.Meta):
        model = User

    def save(self):
        user = super().save(commit=False)
        user.is_venue = True
        user.save()

        venue = Venue.objects.create(user=user)
        venue.image = self.cleaned_data.get('image')
        venue.venue_name = self.cleaned_data.get('venue_name')
        venue.location = self.cleaned_data.get('location')
        venue.website = self.cleaned_data.get('website')
        venue.description = self.cleaned_data.get('description')
        venue.phone_number = self.cleaned_data.get('phone_number')
        venue.capacity = self.cleaned_data.get('capacity')
        venue.save()

        return user




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






