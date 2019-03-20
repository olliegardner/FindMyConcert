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
        #Get the form

        if form.is_valid(): #Check CSRF
            concert = Concert() #Create a new concert

            #Add all the data to concert
            concert.artist       = form.cleaned_data['artist']
            concert.date         = form.cleaned_data['date']
            concert.start_time   = form.cleaned_data['start_time']
            concert.end_time     = form.cleaned_data['end_time']
            concert.image        = form.cleaned_data['image']
            concert.url          = form.cleaned_data['url']
            concert.description  = form.cleaned_data['description']
            concert.venue        = request.user.venue
            concert.save() # Save the new concert


            return render(request, 'venues/index.html')
    return render(request, 'venues/addConcert.html', {'form': form})


@login_required
@venue_required
def deleteConcert(request, id): 

    new_to_delete = get_object_or_404(Concert, concertID=id)

    #Check if the requesting user actually owns this concert
    if (new_to_delete.venue != request.user.venue):
        return HttpResponseRedirect(reverse('/')) 


    if request.method == 'POST':
        form = DeleteConcertForm(request.POST, instance=new_to_delete)

        if form.is_valid(): 
            new_to_delete.delete() #Delete the concert
            return HttpResponseRedirect(reverse(events))

    #If no post request, return the appropiate form
    form = DeleteConcertForm(instance=new_to_delete)
    template_vars = {'form': form}
    return render(request, 'concert/myEvents.html', template_vars)


@login_required
@venue_required
def editConcert(request, id):

    #Get the concert
    concert = get_object_or_404(Concert, concertID=id)

    #Check if user.venue owns concert
    if (concert.venue != request.user.venue):
        return HttpResponseRedirect(reverse('/')) 


    if request.method == 'POST':
        form = EditConcertForm(request.POST, request.FILES)


        """ 
        Here we have to check which fields in the form the user has filled in.
        We can't user the normal form.save() as we are saving to two different models
        (Giggoer and User).

        This function could also have been implemented by overriding save() in 
        EditConcertForm
        """

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

    form = EditConcertForm
    return render(request, 'venues/editConcert.html', {'form': form, 'id' : id})
