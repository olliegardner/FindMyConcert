from django import forms
from django.contrib.auth.forms import UserCreationForm
from concert.models import User, GigGoer
from django.db import transaction

class GigGoerSignUpForm(UserCreationForm):

    class Meta(UserCreationForm.Meta):
        model = User

    @transaction.atomic
    def save(self):
        user = super().save(commit=False)
        user.user_type = 1
        user.save()
        gigGoer = GigGoer.objects.create(user=user)
        gigGoer.interests.add(*self.cleaned_data.get('interests'))
        return user

class VenueSignUpForm(UserCreationForm):

    class Meta(UserCreationForm.Meta):
        model = User
    
    @transaction.atomic
    def save(self, commit=True):
        user = super().save(commit=False)
        user.user_type = 2
        if commit:
            user.save()
        return user



