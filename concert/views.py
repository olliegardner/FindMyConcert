from django.shortcuts import render
from django.shortcuts import redirect
from django.http import HttpResponse, HttpResponseRedirect
from django.contrib.auth import login, logout
from django.contrib.auth.decorators import login_required
from concert.models import User, Concert
from concert.forms import GigGoerSignUpForm, VenueSignUpForm
from django.views.generic import CreateView
from django.core.urlresolvers import reverse


import urllib.request
import json

@login_required
def profile(request, username):
    # this is edit profile

    """
    TODO - add code to check whether user is a Venue or GigGoer 
    """
    try:
        user = User.objects.get(username=username)
    except:
        return redirect('index')

    userprofile = User.objects.get_or_create(user=user)[0]
    form = EditGigGoerForm({'image': userprofile.image})

    if request.method == 'POST':
        form = UserProfileForm(request.POST, request.FILES, instance=userprofile)
        if form.is_valid():
            form.save(commit=True)
            return redirect('profile', user.username)
        else:
            print(form.errors)

    return render(request, 'concert/profile.html', {'userprofile': userprofile, 'selecteduser': user, 'form': form})


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







