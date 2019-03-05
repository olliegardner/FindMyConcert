from django import forms
from concert.models import User

class UserForm(forms.ModelForm):
    password = forms.CharField(widget=forms.PasswordInput())

    class Meta:
        model = User
        fields = ('username', 'email', 'password')

class UserProfileForm(forms.ModelForm):
    venue = forms.BooleanField(required=False)
    image = forms.ImageField(required=False)

    class Meta:
        model = User
        exclude = ('user', )
