from django.shortcuts import render
from django.shortcuts import redirect
from django.http import HttpResponse, HttpResponseRedirect
from django.contrib.auth import login, logout, authenticate
from django.contrib.auth.decorators import login_required
from concert.models import User, Concert
from concert.forms import GigGoerSignUpForm, VenueSignUpForm, removeBookmarkForm, EditGigGoerForm, EditVenueForm, LoginForm
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
    return HttpResponseRedirect(reverse('index')) # take user back to the index page

def user_login(request):
    loginForm = LoginForm

    if request.method == 'POST':
        if 'submit_login' in request.POST:
            loginForm = LoginForm(request.POST)
            if loginForm.is_valid():
                username = loginForm.cleaned_data['username']
                password = loginForm.cleaned_data['password']
                user = authenticate(username=username, password=password)

                if user:
                    if user.is_active:
                        login(request, user)
                        return render(request, 'concert/index.html')
                    else:
                        print("disabled")
                else:
                    print("Invalid login details: {0}, {1}".format(username, password))
    return loginForm


def index(request):
    loginForm = user_login(request)
    return render(request, 'concert/index.html', {'loginform': loginForm})

def events(request):
    loginForm = user_login(request)
    concert_list = Concert.objects.order_by('-artist')

    location = urllib.request.urlopen("http://ip-api.com/json/")
    location_json = json.load(location)

    context_dict = {'concerts': concert_list, 'location': location_json, 'loginform': loginForm}
    return render(request, 'concert/myEvents.html', context_dict)

def about(request):
    loginForm = user_login(request)
    return render(request, 'concert/about.html', {'loginform': loginForm})

def faq(request):
    loginForm = user_login(request)
    return render(request, 'concert/faq.html', {'loginform': loginForm})

def contact(request):
    loginForm = user_login(request)
    return render(request, 'concert/contact.html', {'loginform': loginForm})

def chooseSignUp(request):
    loginForm = user_login(request)
    gigForm = GigGoerSignUpForm()
    venueForm = VenueSignUpForm()

    if request.method == 'POST':
        if 'submit_giggoer' in request.POST:
            gigForm = GigGoerSignUpForm(request.POST, request.FILES)
            if gigForm.is_valid():
                user = gigForm.save()
                login(request, user)
                return render(request, 'concert/index.html')
        
        if 'submit_venue' in request.POST:
            venueForm = VenueSignUpForm(request.POST, request.FILES)
            if venueForm.is_valid():
                user = venueForm.save()
                login(request, user)
                return render(request, 'concert/index.html')
        
    return render(request, 'registration/signup.html', {'gigform': gigForm, 'venueform':venueForm, 'loginform': loginForm})

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
    loginForm = user_login(request)
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
                return render(request, 'concert/profile.html', {'selecteduser': request.user, 'form': EditVenueForm, 'loginform': loginForm})
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
                return render(request, 'concert/profile.html', {'selecteduser': request.user, 'form': EditGigGoerForm, 'loginform': loginForm})
        else:
            form = EditGigGoerForm

    return render(request, 'concert/profile.html', {'form': form, 'selecteduser': request.user, 'loginform': loginForm})



