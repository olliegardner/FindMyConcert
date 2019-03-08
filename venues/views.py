from django.shortcuts import render
from concert.models import Concert
from venues.forms import ConcertForm
from django.http import HttpResponse, HttpResponseRedirect
def venueIndex(request):
    return render(request, 'venues/index.html')

def addConcert(request):
    form = ConcertForm()

    if request.method == 'POST':
        form = ConcertForm(request.POST, request.FILES)

        if form.is_valid():
            concert = Concert()
            concert.artist      = form.cleaned_data['artist']
            concert.date        = form.cleaned_data['date']
            concert.start_time  = form.cleaned_data['start_time']
            concert.end_time    = form.cleaned_data['end_time']
            concert.image       = form.cleaned_data.get('image')
            concert.url         = form.cleaned_data['url']
            concert.venue       = request.user.venue
            concert.description = form.cleaned_data['description']
            concert.save()


            return render(request, 'venues/index.html')
    return render(request, 'venues/addConcert.html', {'form': form})
