from django.shortcuts import render
from concert.models import Concert
from concert.views import events
from venues.forms import ConcertForm, DeleteConcertForm, EditConcertForm
from django.http import HttpResponse, HttpResponseRedirect
from FindMyConcert.custom_decorators import venue_required
from django.contrib.auth.decorators import login_required
from django.core.urlresolvers import reverse
from django.shortcuts import get_object_or_404

@login_required
@venue_required
def venueIndex(request):
    return render(request, 'venues/index.html')

@login_required
@venue_required
def addConcert(request):
    form = ConcertForm()

    if request.method == 'POST':
        form = ConcertForm(request.POST, request.FILES)
        print(request.FILES)
        if form.is_valid():
            concert = Concert()
            print(form.cleaned_data)
            concert.artist       = form.cleaned_data['artist']
            concert.date         = form.cleaned_data['date']
            concert.start_time   = form.cleaned_data['start_time']
            concert.end_time     = form.cleaned_data['end_time']
            concert.image        = form.cleaned_data['image']
            concert.url          = form.cleaned_data['url']
            concert.description  = form.cleaned_data['description']
            concert.venue        = request.user.venue
            concert.save()


            return render(request, 'venues/index.html')
    return render(request, 'venues/addConcert.html', {'form': form})

@login_required
@venue_required
def deleteConcert(request, id): 
    print("Delete concert view initalised")
    new_to_delete = get_object_or_404(Concert, concertID=id)
    if (new_to_delete.venue != request.user.venue):
        return HttpResponseRedirect(reverse('/')) 


    if request.method == 'POST':
        form = DeleteConcertForm(request.POST, instance=new_to_delete)

        if form.is_valid(): 
            print("Deleting object")
            new_to_delete.delete()
            return HttpResponseRedirect(reverse(events))
        else:
            print(form.errors)

    else:
        print("No POST request") 
        form = DeleteConcertForm(instance=new_to_delete)

    template_vars = {'form': form}
    return render(request, 'concert/myEvents.html', template_vars)

@login_required
@venue_required
def editConcert(request, id):
    concert = get_object_or_404(Concert, concertID=id)
    if (concert.venue != request.user.venue):
        return HttpResponseRedirect(reverse('/')) 

    if request.method == 'POST':
        form = EditConcertForm(request.POST, request.FILES)

        if form.is_valid(): 
            if (form.cleaned_data.get('artist') != ""):
                concert.artist      = form.cleaned_data['artist']
            if (form.cleaned_data.get('date') != None):
                concert.date        = form.cleaned_data['date']
            if (form.cleaned_data.get('start_time') != None):
                concert.start_time  = form.cleaned_data['start_time']
            if (form.cleaned_data.get('end_time') != None):
                concert.end_time    = form.cleaned_data['end_time']
            if (form.cleaned_data.get('image') != None):
                concert.image       = form.cleaned_data.get('image')
            if (form.cleaned_data.get('url') != ""):
                concert.url         = form.cleaned_data['url']
            if (form.cleaned_data.get('description') != ""):
                concert.description = form.cleaned_data['description']
            concert.save()

            return HttpResponseRedirect(reverse(events)) 
        else:
            print(form.errors)
    form = EditConcertForm
    return render(request, 'venues/editConcert.html', {'form': form, 'id' : id})



