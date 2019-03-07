from django.shortcuts import render
from concert.models import Concert
from venues.forms import ConcertForm
def venueIndex(request):
    return render(request, 'venues/index.html')

def addConcert(request):
    form = ConcertForm()

    if request.method == 'POST':
        form = ConcertForm(request.POST)

        if form.is_valid():
            concert = Concert()
            concert.artist     = form.cleaned_data['artist']
            concert.date       = form.cleaned_data['date']
            concert.start_time = form.cleaned_data['start_time']
            concert.end_time   = form.cleaned_data['end_time']
            concert.image      = form.cleaned_data['image']
            concert.url        = form.cleaned_data['url']
            concert.venue      = request.user.venue
            concert.descitpion = form.cleaned_data['descitpion']
            concert.save()


            return index(venueIndex)
    return render(request, 'venues/addConcert.html', {'form': form})
