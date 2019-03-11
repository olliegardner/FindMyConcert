from django import forms
from django.contrib.auth.forms import UserCreationForm
from concert.models import GigGoer, User, Venue, Concert

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
        venue.email = self.cleaned_data.get('email')
        venue.image = self.cleaned_data.get('image')
        venue.venue_name = self.cleaned_data.get('venue_name')
        venue.location = self.cleaned_data.get('location')
        venue.website = self.cleaned_data.get('website')
        venue.description = self.cleaned_data.get('description')
        venue.phone_number = self.cleaned_data.get('phone_number')
        venue.capacity = self.cleaned_data.get('capacity')
        venue.save()

        return user


class LoginForm(forms.Form):
   username = forms.CharField(min_length=1, max_length=36)
   password = forms.CharField(min_length=8, max_length=32, widget=forms.PasswordInput(render_value=False))



#EDIT FORMS
class EditGigGoerForm(forms.ModelForm):
    email = forms.EmailField(required=False)
    image = forms.ImageField(required=False)

    class Meta:
        model = GigGoer
        fields = []
    
class EditVenueForm(forms.ModelForm):
    email        = forms.EmailField(required=False)
    image        = forms.ImageField(required=False)
    venue_name   = forms.CharField(max_length=128, required=False) 
    location     = forms.CharField(max_length=128, required=False) 
    website      = forms.URLField(required=False)
    description  = forms.CharField(max_length=560, required=False) 
    phone_number = forms.CharField(max_length=15, required=False) 
    capacity     = forms.IntegerField(required=False)
    class Meta:
        model = Venue
        fields = []





