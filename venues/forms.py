from concert.models import Concert
from django import forms

class ConcertForm(forms.ModelForm):
    artist      = forms.CharField(max_length=128, )
    date        = forms.DateField( input_formats=['%d/%m/%Y'])
    start_time  = forms.TimeField( widget=forms.TimeInput(format='%H:%M'))
    end_time    = forms.TimeField(widget=forms.TimeInput(format='%H:%M'))
    image       = forms.ImageField( required = False)
    url         = forms.URLField()
    description = forms.CharField(max_length=1000)

    class Meta(forms.ModelForm):
        model = Concert
        exclude = {'venue', 'concertID'}

class DeleteConcertForm(forms.ModelForm):
    class Meta:
        model = Concert
        fields = []