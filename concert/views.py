from concert.forms import GigGoerSignUpForm, VenueSignUpForm, EditGigGoerForm, EditVenueForm, LoginForm
from concert.models import User, Concert, Comment
from concert.tokens import accountActivationToken

from datetime import datetime

from django.contrib.auth import login, logout, authenticate
from django.contrib.auth.decorators import login_required
from django.contrib.auth.forms import PasswordChangeForm
from django.contrib.sites.shortcuts import get_current_site
from django.core.mail import EmailMessage
from django.core.urlresolvers import reverse
from django.db.models import Q
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render, redirect, get_object_or_404
from django.template import RequestContext
from django.template.loader import render_to_string
from django.utils.encoding import force_bytes, force_text
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.views.generic import CreateView
from django.views.decorators.csrf import requires_csrf_token

from FindMyConcert.custom_decorators import giggoer_required

import json
import urllib.request

def error_404(request):
    loginForm = user_login(request)
    return render(request, 'concert/error.html', {'loginform': loginForm})

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
                        return HttpResponse("Your account is currently disabled")
                else:
                    print("Invalid login details: {0}, {1}".format(username, password))
    return loginForm


def index(request):
    loginForm = user_login(request)
    return render(request, 'concert/index.html', {'loginform': loginForm})

def events(request):
    loginForm = user_login(request)
    concert_list = Concert.objects.all()
    try:
        location = urllib.request.urlopen("http://ip-api.com/json/")
        location_json = json.load(location)
    except:
        location_json = "Unknown"

    query = request.GET.get("q")
    if query:
        concert_list = concert_list.filter(
            Q(artist__icontains=query) |
            Q(date__icontains=query) |
            Q(start_time__icontains=query) |
            Q(end_time__icontains=query) |
            Q(description__icontains=query) |
            Q(venue__venue_name__icontains=query) |
            Q(venue__location__icontains=query)
            ).distinct()

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
    if request.user.is_authenticated(): 
        return HttpResponseRedirect(reverse('index')) #Redirect to Index if user is logged in
        
    loginForm = user_login(request)
    gigForm = GigGoerSignUpForm()
    venueForm = VenueSignUpForm()

    if request.method == 'POST':
        if 'submit_giggoer' in request.POST:
            gigForm = GigGoerSignUpForm(request.POST, request.FILES)
            if gigForm.is_valid():
                user = gigForm.save()
                user.is_active = False
                user.save()
                site = get_current_site(request)
                email_subject = "FindMyConcert Account Activation"
                email_message = render_to_string("registration/activation_email.html", {
                    "user": user,
                    "domain": site.domain,
                    "uid": urlsafe_base64_encode(force_bytes(user.username)).decode(),
                    "token": accountActivationToken.make_token(user)
                    })
                email_address = gigForm.cleaned_data.get("email")
                email = EmailMessage(email_subject, email_message, to=[email_address])
                email.send()
                return render(request, 'registration/confirmation_needed.html')
        
        if 'submit_venue' in request.POST:
            venueForm = VenueSignUpForm(request.POST, request.FILES)
            if venueForm.is_valid():
                user = venueForm.save()
                user.is_active = False
                user.save()
                site = get_current_site(request)
                email_subject = "FindMyConcert Account Activation"
                email_message = render_to_string("registration/activation_email.html", {
                    "user": user,
                    "domain": site.domain,
                    "uid": urlsafe_base64_encode(force_bytes(user.username)).decode(),
                    "token": accountActivationToken.make_token(user)
                    })
                email_address = venueForm.cleaned_data.get("email")
                email = EmailMessage(email_subject, email_message, to=[email_address])
                email.send()
                return render(request, 'registration/confirmation_needed.html')
        
    return render(request, 'registration/signup.html', {'gigform': gigForm, 'venueform':venueForm, 'loginform': loginForm})

def activate(request, uidenc, token):
    try:
        uid = force_text(urlsafe_base64_decode(uidenc))
        user = User.objects.get(username=uid)
    except:
        user = None

    if user is not None and accountActivationToken.check_token(user, token):
        user.is_active = True
        user.save()
        login(request, user)
        return HttpResponseRedirect(reverse(success))
    else:
        return HttpResponse("Error: Invalid Activation Link")

def confirmation(request):
    loginForm = user_login(request)
    return render(request, 'registration/confirmation_needed.html', {'loginform': loginForm})

@login_required
def success(request):
    loginForm = user_login(request)
    return render(request, 'registration/account_activated.html', {'loginform': loginForm})

@login_required
@giggoer_required
def bookmark(request):
    concertid = None
    if request.method == 'GET':
        concertid = request.GET['concertid']

    print("test")
    if concertid:
        concert = Concert.objects.get(concertID=int(concertid))
        if concert:
            request.user.giggoer.bookmarks.add(concert)
    return HttpResponse()


@login_required
@giggoer_required
def removeBookmark(request):
    concert_to_remove = None

    if request.method == 'GET':
        concertid = request.GET['concertid']
        concert_to_remove = get_object_or_404(Concert, concertID=concertid)

        if concert_to_remove:
            request.user.giggoer.bookmarks.remove(concert_to_remove)

    return HttpResponse()


def viewConcert(request, id):
    loginForm = user_login(request)
    concert = get_object_or_404(Concert, concertID=id)
    bookmark_boolean = False
    if request.user.is_authenticated():
        if not request.user.is_venue and not request.user.is_anonymous:
            if concert in request.user.giggoer.bookmarks.all():
                bookmark_boolean  = True

    return render(request, 'concert/concert.html', {'concert': concert, 'loginform': loginForm, 'user': request.user, 'bookmarked':

     bookmark_boolean})


def profile(request, username):
    loginForm = user_login(request)
    user = User.objects.get(username=username)

    if not request.user.is_anonymous:
        if request.user.is_venue:
            if request.method == 'POST':
                form = EditVenueForm(request.POST, request.FILES)
                if form.is_valid():
                    user = request.user
                    # would it not be nice if python had switch statements?
                    if (form.cleaned_data.get('email') != ""):
                        user.email = form.cleaned_data.get('email')
                    if (form.cleaned_data.get('image') != None):
                        user.venue.image = form.cleaned_data.get('image')
                    if (form.cleaned_data.get('password') != ""):
                        user.venue.password = form.cleaned_data.get('password')
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
                    return render(request, 'concert/profile.html', {'selecteduser': user, 'form': EditVenueForm, 'loginform': loginForm})
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
                    if (form.cleaned_data.get('password') != ""):
                        user.giggoer.password = form.cleaned_data.get('password')
                    user.giggoer.save()
                    user.save()  
                    return render(request, 'concert/profile.html', {'selecteduser': user, 'form': EditGigGoerForm, 'loginform': loginForm})
            else:
                form = EditGigGoerForm

        return render(request, 'concert/profile.html', {'form': form, 'selecteduser': user, 'loginform': loginForm})

    return render(request, 'concert/profile.html', {'selecteduser': user, 'loginform': loginForm}) 


# this lets the events view to dynamically add a concert each time one is bookmarked
def getConcert(request ,id):
    concert = get_object_or_404(Concert, concertID=id)
    if concert in request.user.giggoer.bookmarks.all():
        return HttpResponse()
    results = []
    concert_json = {}
    concert_json['artist']     = concert.artist
    concert_json['isfuture']   = str(concert.is_future())
    concert_json['venuename']  = concert.venue.venue_name
    concert_json['date']       = str(concert.date.strftime('%B %-d, %Y'))
    concert_json['starttime']  = str(concert.start_time.strftime('%-I %p'))

    concert_json['endtime']    = str(concert.end_time.strftime('%-I %p'))
    concert_json['location']   = concert.venue.location
    concert_json['url']        = concert.url
    concert_json['id']         = concert.concertID
    concert_json['image']      = concert.image.url
    results.append(concert_json)
    data = json.dumps(results)
    print(concert_json)
    mimetype = 'application/json'
    return HttpResponse(data, mimetype)    

@requires_csrf_token
def postComment(request):
    user = request.user
    text = request.POST.get('data')
    concertID = request.POST.get('id')
    if text == "" or text == None:
        payload = {'success': "False"}
    else:
        concert = get_object_or_404(Concert, concertID=concertID)
        comment = Comment.objects.create(
            user = user,
            text = text,
            concert = concert,
            time = datetime.now())
        if user.is_venue:
            image = user.venue.image.url
        else:
            image = user.giggoer.image.url
        payload = {'success': "True", 'username':user.username, 'image':image}
        comment.save()

    return HttpResponse(json.dumps(payload), content_type='application/json')

# PASSWORD RESET VIEWS
'''def password_reset(request):
    loginForm = user_login(request)
    return render(request, 'registration/password_reset_form.html', {'loginform': loginForm})

def password_reset_complete(request):
    loginForm = user_login(request)
    return render(request, 'registration/password_reset_complete.html', {'loginform': loginForm})

def password_reset_confirm(request):
    loginForm = user_login(request)
    return render(request, 'registration/password_reset_confirm.html', {'loginform': loginForm})

def password_reset_done(request):
    loginForm = user_login(request)
    return render(request, 'registration/password_reset_done.html', {'loginform': loginForm})'''


