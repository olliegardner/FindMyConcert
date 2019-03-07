from concert.models import Concert
from django import forms

class ConcertForm(forms.ModelForm):
    artist      = forms.CharField(max_length=128, help_text="Artist")
    date        = forms.DateField(help_text="Date", input_formats=['%d/%m/%Y'])
    start_time  = forms.TimeField(help_text="Start Time", widget=forms.TimeInput(format='%H:%M'))
    end_time    = forms.TimeField(help_text="End Time", widget=forms.TimeInput(format='%H:%M'))
    image       = forms.ImageField(help_text="Image", required = False)
    url         = forms.URLField(help_text="URL")
    description = forms.CharField(help_text="Concert Description",max_length=1000)

    class Meta(forms.ModelForm):
        model = Concert
        exclude = {'venue', 'concertID'}
