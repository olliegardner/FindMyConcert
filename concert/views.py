from django.shortcuts import render
from django.shortcuts import redirect
from django.http import HttpResponse, HttpResponseRedirect
from django.contrib.auth import login, logout, authenticate
from django.contrib.auth.decorators import login_required
from concert.models import User, Concert
from concert.forms import GigGoerSignUpForm, VenueSignUpForm
from django.views.generic import CreateView
from django.core.urlresolvers import reverse
from FindMyConcert.custom_decorators import giggoer_required
from django.contrib.auth.decorators import login_required
import urllib.request
import json

@login_required
def profile(request, username):
    if (request.user.is_venue):
        #TODO - venue profile
        pass
    else:
        pass
        #TODO - giggoer profile

    return render(request, 'concert/index.html')

@login_required
def user_logout(request):
    logout(request)
    return HttpResponseRedirect(reverse('login')) # take user back to the sign-in page


def index(request):
    concert_list = Concert.objects.order_by('-artist')

    location = urllib.request.urlopen("http://ip-api.com/json/")
    location_json = json.load(location)

    context_dict = {'concerts': concert_list, 'location': location_json}
    return render(request, 'concert/index.html', context_dict)

def about(request):
    return render(request, 'concert/about.html')

def faq(request):
    return render(request, 'concert/faq.html')

def contact(request):
    return render(request, 'concert/contact.html')

@login_required
def myEvents(request):
    return render(request, 'concert/myEvents.html')


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
    if True:
        pass




