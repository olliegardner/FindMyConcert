from django import forms
from django.contrib.auth.forms import UserCreationForm
from concert.models import GigGoer, User, Venue, Concert
from django.core.files import File
import os


class GigGoerSignUpForm(UserCreationForm):
    email = forms.EmailField(required=True)
    image = forms.ImageField(required=False)
    
    class Meta(UserCreationForm.Meta):
        model = User

    field_order = ['username', 'email', 'password1', 'password2', 'image']

    def clean_email(self): 
        #Require emails to be unique
        email = self.cleaned_data.get('email')
        if User.objects.filter(email=email).exists():
            raise forms.ValidationError("This email already used")
        return email

    def save(self): #Override the save method so that we can create a user object at the same time
        user = super().save(commit=False)
        user.is_venue = False
        print(self.cleaned_data.get('email'))
        user.email = self.cleaned_data.get('email')
        user.save()

        gigGoer = GigGoer.objects.create(user=user)

        image = self.cleaned_data.get('image')
        if image == None:    
            imgpath = os.path.join(os.getcwd(), 'static', 'images', 'default-pic' + ".png")
            gigGoer.image.save('default-pic', File(open(imgpath, 'rb')))
        else:
            gigGoer.image = image
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

    field_order = ['username', 'email', 'password1', 'password2', 'image', 'venue_name', 'location', 'website', 'description', 'phone_number', 'capacity']

    def clean_email(self):  
        email = self.cleaned_data.get('email')
        if User.objects.filter(email=email).exists():
            raise forms.ValidationError("This email already used")
        return email

    def save(self): #Override the save method so that we can create a user object at the same time

        #This first part creates a user
        user = super().save(commit=False)
        user.is_venue = True
        user.email = self.cleaned_data.get('email')
        user.save()

        #This part creates the venue object with a one to one field
        #to the user object which was jsut creaated.
        venue = Venue.objects.create(user=user)
        
        #Check if an image was submitted and store the default one otherwise
        image = self.cleaned_data.get('image')
        if image == None:    
            imgpath = os.path.join(os.getcwd(), 'static', 'images', 'default-pic' + ".png")
            venue.image.save('default-pic', File(open(imgpath, 'rb')))
        else:
            venue.image = image

        #Now save the rest of the field to the new venue object
        venue.venue_name = self.cleaned_data.get('venue_name')
        venue.location = self.cleaned_data.get('location')
        venue.website = self.cleaned_data.get('website')
        venue.description = self.cleaned_data.get('description')
        venue.phone_number = self.cleaned_data.get('phone_number')
        venue.capacity = self.cleaned_data.get('capacity')
        venue.save()

        return user


class LoginForm(forms.Form):
    #This form is used to log in
    username = forms.CharField(min_length=1, max_length=36)
    password = forms.CharField(min_length=8, max_length=32, widget=forms.PasswordInput(render_value=False))



class EditGigGoerForm(forms.ModelForm):
    #This form is used to edit giggoer profiles
    email    = forms.EmailField(required=False)
    image    = forms.ImageField(required=False)
    password = forms.CharField(required=False, widget=forms.PasswordInput(render_value=False))
    pretty_mode = forms.BooleanField(required=False)

    class Meta:
        model = GigGoer
        fields = []

    
class EditVenueForm(forms.ModelForm):
    #This form is used to edit venue profiles
    email        = forms.EmailField(required=False)
    image        = forms.ImageField(required=False)
    password     = forms.CharField(required=False, widget=forms.PasswordInput(render_value=False))
    pretty_mode  = forms.BooleanField(required=False)
    venue_name   = forms.CharField(max_length=128, required=False) 
    location     = forms.CharField(max_length=128, required=False) 
    website      = forms.URLField(required=False)
    description  = forms.CharField(max_length=560, required=False) 
    phone_number = forms.CharField(max_length=15, required=False) 
    capacity     = forms.IntegerField(required=False)

    class Meta:
        model = Venue
        fields = []





