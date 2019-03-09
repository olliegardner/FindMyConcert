from django.shortcuts import render
from django.shortcuts import redirect
from django.http import HttpResponse, HttpResponseRedirect
from django.contrib.auth import login, logout, authenticate
from django.contrib.auth.decorators import login_required
from concert.models import User, Concert
from concert.forms import GigGoerSignUpForm, VenueSignUpForm, removeBookmarkForm, EditGigGoerForm, EditVenueForm
from django.views.generic import CreateView
from django.core.urlresolvers import reverse
from FindMyConcert.custom_decorators import giggoer_required
from django.contrib.auth.decorators import login_required
from django.shortcuts import get_object_or_404
import urllib.request
import json


@login_required
def user_logout(request):
    logout(request)
    return HttpResponseRedirect(reverse('login')) # take user back to the sign-in page

def index(request):
    return render(request, 'concert/index.html')

def events(request):
    concert_list = Concert.objects.order_by('-artist')

    location = urllib.request.urlopen("http://ip-api.com/json/")
    location_json = json.load(location)

    context_dict = {'concerts': concert_list, 'location': location_json}
    return render(request, 'concert/myEvents.html', context_dict)

def about(request):
    return render(request, 'concert/about.html')

def faq(request):
    return render(request, 'concert/faq.html')

def contact(request):
    return render(request, 'concert/contact.html')

def chooseSignUp(request):
    gigForm = GigGoerSignUpForm()
    venueForm = VenueSignUpForm()

    if request.method == 'POST':
        if 'submit_giggoer' in request.POST:
            gigForm = GigGoerSignUpForm(request.POST, request.FILES)
            if gigForm.is_valid():
                print(gigForm.cleaned_data.get('image'))
                user = gigForm.save()
                login(request, user)
                return render(request, 'concert/index.html')
        
        if 'submit_venue' in request.POST:
            venueForm = VenueSignUpForm(request.POST, request.FILES)
            if venueForm.is_valid():
                user = venueForm.save()
                login(request, user)
                return render(request, 'concert/index.html')
        
    return render(request, 'concert/chooseSignUp.html', {'gigform': gigForm, 'venueform':venueForm})

@login_required
@giggoer_required
def bookmark(request, id):
    concert = get_object_or_404(Concert, concertID=id)
    if (concert in request.user.giggoer.bookmarks.all()):
        return HttpResponseRedirect(reverse(events)) 
    else:
        request.user.giggoer.bookmarks.add(concert)
        return HttpResponseRedirect(reverse(events)) 

@login_required
@giggoer_required
def removeBookmark(request, id):
    concert_to_remove = get_object_or_404(Concert, concertID=id)
    if (concert_to_remove not in request.user.giggoer.bookmarks.all()):
        return HttpResponseRedirect(reverse(events))

    if request.method == 'POST':
        form = removeBookmarkForm(request.POST, instance=concert_to_remove)

        if form.is_valid(): 
            request.user.giggoer.bookmarks.remove(concert_to_remove)
            return HttpResponseRedirect(reverse(events))  # wherever to go after deleting
        else:
            print(form.errors)

    else:
        print("No POST request") 
        form = removeBookmarkForm(instance=concert_to_remove)

    template_vars = {'form': form}
    return render(request, 'concert/myEvents.html', concert_to_remove)

        
@login_required
def profile(request, username):
    if (request.user.is_venue):
        if request.method == 'POST':
            form = EditVenueForm(request.POST, request.FILES)
            if form.is_valid():
                user = request.user
                #Would it not be nice if python had switch statements?
                if (form.cleaned_data.get('email') != ""):
                    user.email = form.cleaned_data.get('email')
                if (form.cleaned_data.get('image') != None):
                    user.venue.image = form.cleaned_data.get('image')    
                if (form.cleaned_data.get('venue_name') != ""):
                    user.venue.venue_name = form.cleaned_data.get('venue_name')
                if (form.cleaned_data.get('location') != ""):
                    user.venue.location = form.cleaned_data.get('location')
                if (form.cleaned_data.get('website') != ""):
                    user.venue.website = form.cleaned_data.get('website')
                if (form.cleaned_data.get('description') != ""):
                    user.venue.description = form.cleaned_data.get('description')
                if (form.cleaned_data.get('capacity') != None):
                    user.venue.capacity = form.cleaned_data.get('capacity')                  
                user.save()
                user.venue.save()
                return render(request, 'concert/profile.html', {'selecteduser': request.user, 'form': EditVenueForm})
        else:
            form = EditVenueForm
    else:
        if request.method == 'POST':
            form = EditGigGoerForm(request.POST, request.FILES)
            if form.is_valid():
                user = request.user
                if (form.cleaned_data.get('email') != ""):
                    user.email = form.cleaned_data.get('email')
                if (form.cleaned_data.get('image') != None):
                    user.giggoer.image = form.cleaned_data.get('image')
                user.giggoer.save()
                user.save()  
                return render(request, 'concert/profile.html', {'selecteduser': request.user, 'form': EditGigGoerForm})
        else:
            form = EditGigGoerForm

    return render(request, 'concert/profile.html', {'form': form, 'selecteduser': request.user})



