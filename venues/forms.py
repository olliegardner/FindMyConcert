from concert.models import Concert
from bootstrap_datepicker_plus import DatePickerInput, TimePickerInput
from django import forms

class ConcertForm(forms.ModelForm):
    #Form used for creating a new concert
    artist      = forms.CharField(max_length=128)
    date        = forms.DateField(input_formats=['%d/%m/%Y'], widget=DatePickerInput(format="%d/%m/%Y"))
    start_time  = forms.TimeField(widget=TimePickerInput(format="%H:%M"))
    end_time    = forms.TimeField(widget=TimePickerInput(format="%H:%M"))
    image       = forms.ImageField()
    url         = forms.URLField()
    description = forms.CharField(max_length=1000)
    spotify_URI = forms.CharField(max_length=100, required = False)

    class Meta(forms.ModelForm):
        model = Concert
        exclude = {'venue', 'concertID'}

class DeleteConcertForm(forms.ModelForm):
    #Helper class to delete a form
    class Meta:
        model = Concert
        fields = []

class EditConcertForm(forms.ModelForm):
    #Form used to edit a concert
    artist      = forms.CharField(max_length=128, required = False)
    date        = forms.DateField(input_formats=['%d/%m/%Y'], widget=DatePickerInput(format="%d/%m/%Y"), required = False)
    start_time  = forms.TimeField(widget=TimePickerInput(format="%H:%M"), required = False)
    end_time    = forms.TimeField(widget=TimePickerInput(format="%H:%M"), required = False)
    image       = forms.ImageField(required = False)
    url         = forms.URLField(required = False)
    description = forms.CharField(max_length=1000, required = False)
    spotify_URI = forms.CharField(max_length=100, required = False)
    
    class Meta:
        model = Concert
        exclude = {'venue', 'concertID'}
