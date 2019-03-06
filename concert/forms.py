from django import forms
from django.contrib.auth.forms import UserCreationForm
from concert.models import GigGoer, User, Venue

class GigGoerSignUpForm(UserCreationForm):
    image = forms.ImageField(required=False)

    class Meta(UserCreationForm.Meta):
        model = User

    def save(self):
        user = super().save(commit=False)
        user.is_venue = False
        user.save()
        gigGoer = GigGoer.objects.create(user=user)
        #gigGoer.image.add(*self.cleaned_data.get('image'))
        return user

class VenueSignUpForm(UserCreationForm):
    image        = forms.ImageField(required=False)
    venue_name   = forms.CharField(max_length=128) 
    location     = forms.CharField(max_length=128) 
    url          = forms.URLField()
    description  = forms.CharField(max_length=560) 
    phone_number = forms.CharField(max_length=15) 
    capacity     = forms.IntegerField()

    class Meta(UserCreationForm.Meta):
        model = User

    def save(self):
        user = super().save(commit=False)
        user.is_venue = False
        user.save()
        venue = Venue.objects.create(user=user)
        venue.image.add(*self.cleaned_data.get('image'))
        venue.name.add(*self.cleaned_data.get('venue_name'))
        venue.location.add(*self.cleaned_data.get('location'))
        venue.url.add(*self.cleaned_data.get('url'))
        venue.description.add(*self.cleaned_data.get('description'))
        venue.phone_number.add(*self.cleaned_data.get('phone_number'))
        venue.capacity.add(*self.cleaned_data.get('capacity'))

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






