from concert.forms import GigGoerSignUpForm, VenueSignUpForm, EditGigGoerForm, EditVenueForm, LoginForm, ContactForm
from concert.models import User, Concert, Comment, Rating
from concert.tokens import accountActivationToken
from collections import Counter
from datetime import datetime
from heapq import nlargest

from django.contrib.auth import login, logout, authenticate
from django.contrib.auth.decorators import login_required
from django.contrib.auth.forms import PasswordChangeForm
from django.contrib.auth.hashers import make_password
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
from recommend.recommend import recommendation
import urllib.request

from secret.secret_settings import GOOGLE_MAPS_API_KEY


def error_404(request):
    #This function handles the 404 error page
    loginForm = user_login(request)
    return render(request, 'concert/error.html', {'loginform': loginForm})


@login_required
def user_logout(request):
    #This fucntion handles logout requests
    logout(request)
    return HttpResponseRedirect(reverse('index')) # take user back to the index page


def user_login(request): 
    loginForm = LoginForm

    #Check if a post request has been sent
    if request.method == 'POST':
        if 'submit_login' in request.POST:
            loginForm = LoginForm(request.POST)
            if loginForm.is_valid():

                #Validate the credentials
                username = loginForm.cleaned_data['username']
                password = loginForm.cleaned_data['password']
                user = authenticate(username=username, password=password)
                
                #Log in user
                if user:
                    if user.is_active:
                        login(request, user)
                        return render(request, 'concert/index.html')
                    else:
                        return HttpResponse("Your account is currently disabled")
                else:
                    return HttpResponse("Incorrect username or password")

    #If no post, return the form 
    return loginForm


def index(request):
    #Send user to index
    loginForm = user_login(request)
    return render(request, 'concert/index.html', {'loginform': loginForm})


def events(request):
    loginForm = user_login(request)

    #As default, we only want to show concerts in the future
    concert_list = Concert.objects.all().exclude(
        Q(date__lt=datetime.today())).distinct()

    #finds the most popular venues, i.e the venues with most concerts happening there
    counts = dict()
    for i in concert_list:
        counts[i.venue.venue_name] = counts.get(i, 0) + 1
    most_popular = nlargest(3, counts, key=counts.get)

    #backup list of all concerts, used for past and all filters
    concert_list_all = Concert.objects.all()

    #Try to find the location using ip-api
    try:
        location = urllib.request.urlopen("http://ip-api.com/json/", timeout=3)
        location_json = json.load(location)
    except:
        location_json = {'city': "Error"}

    #See if a query has been sent
    query = request.GET.get("q")
    
    if query:
        months = {'December':'12', 'November':'11', 'October':'10', 'September':'9',
                  'August':'8', 'July':'7', 'June':'6', 'May':'5', 'April':'4', 'March':'3',
                  'February':'2', 'January':'1'}

        if query == "All concerts":
            concert_list = concert_list_all
        elif query in months.keys():
            #If query is a month, use its numerical value in comparison
            query = months[query]
            concert_list = concert_list.filter(
                Q(date__month=query)).distinct()
        elif query == "date_past":
            concert_list = concert_list_all.filter(
                Q(date__lt=datetime.today())).distinct()
        else:
            #If query, return only filtered concerts
            concert_list = concert_list.filter(
                Q(artist__icontains=query) |
                Q(date__icontains=query) |
                Q(start_time__icontains=query) |
                Q(end_time__icontains=query) |
                Q(venue__venue_name__icontains=query) |
                Q(venue__location__icontains=query)
                ).distinct()

    context_dict = {'concerts': concert_list, 'location': location_json, 'loginform': loginForm, "popular_venues" : most_popular}
    return render(request, 'concert/events.html', context_dict)



def about(request):
    loginForm = user_login(request)
    return render(request, 'concert/about.html', {'loginform': loginForm})


def faq(request):
    loginForm = user_login(request)
    return render(request, 'concert/faq.html', {'loginform': loginForm})


def contact(request):
    loginForm = user_login(request)
    contactForm = ContactForm()

    if request.method == 'POST':
        if 'submit_contact' in request.POST:
            contactForm = ContactForm(request.POST)

            if contactForm.is_valid():
                subject = contactForm.cleaned_data['subject']
                name = contactForm.cleaned_data['name']
                email = contactForm.cleaned_data['email']
                message = "Name: " + name + "\nEmail: " + email + "\nMessage: " + contactForm.cleaned_data['message']

                email = EmailMessage(subject, message, to=["findmyconcert.wadproject@gmail.com"])
                email.send()

                return render(request, 'concert/index.html')

    return render(request, 'concert/contact.html', {'loginform': loginForm, 'contactform': contactForm})


def chooseSignUp(request):
    if request.user.is_authenticated(): 
        return HttpResponseRedirect(reverse('index')) #Redirect to Index if user is logged in
    
    #Load in the two different types of sign up froms
    loginForm = user_login(request)
    gigForm = GigGoerSignUpForm()
    venueForm = VenueSignUpForm()


    if request.method == 'POST':
        #Check which signup form has been used (giggoer)
        if 'submit_giggoer' in request.POST:
            
            gigForm = GigGoerSignUpForm(request.POST, request.FILES) #Get the form + files
            
            if gigForm.is_valid(): #If valid CSRF tokem
                user = gigForm.save() #Save the new user

                #Email activation
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
        
        #Check which signup form has been used (Venue)
        if 'submit_venue' in request.POST:

            venueForm = VenueSignUpForm(request.POST, request.FILES) #Get the form + files

            if venueForm.is_valid(): #If valid CSRF token
                user = venueForm.save() #Save the new user

                #Email activation
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
    
    #Return all the appropiate forms to be rendered    
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
    #If succesfully registered, redirect
    loginForm = user_login(request)
    return render(request, 'registration/account_activated.html', {'loginform': loginForm})


@login_required
@giggoer_required
def bookmark(request):
    concertid = None

    #Check if GET method
    if request.method == 'GET':
        concertid = request.GET['concertid']

    #If concertid exists
    if concertid:
        concert = Concert.objects.get(concertID=int(concertid)) #Get the concert
        if concert:
            request.user.giggoer.bookmarks.add(concert) #If concert exists, bookmark it
    return HttpResponse()


@login_required
@giggoer_required
def removeBookmark(request):
    concert_to_remove = None

    #Check if GET method
    if request.method == 'GET':
        concertid = request.GET['concertid']
        concert_to_remove = get_object_or_404(Concert, concertID=concertid) #Get the concert

        if concert_to_remove:
            request.user.giggoer.bookmarks.remove(concert_to_remove) #If concert exists, remove bookmark

    return HttpResponse()


def viewConcert(request, id):
    loginForm = user_login(request)

    concert = get_object_or_404(Concert, concertID=id) #Get the concert

    #This boolean is used to see if a giggoer has bookmarked a concert or not
    #It it s passed into the template
    bookmark_boolean = False
    if request.user.is_authenticated():
        if not request.user.is_venue and not request.user.is_anonymous:
            if concert in request.user.giggoer.bookmarks.all():
                bookmark_boolean  = True 

    return render(request, 'concert/concert.html', {'concert': concert, 'loginform': loginForm,
                                                    'user': request.user, 'bookmarked': bookmark_boolean,
                                                    'api_key': GOOGLE_MAPS_API_KEY})


def profile(request, username):
    loginForm = user_login(request)
    user = User.objects.get(username=username) #Get the user object with correspondong name

    if not request.user.is_anonymous:
        if request.user.is_venue: #Check user types
            if request.method == 'POST':
                form = EditVenueForm(request.POST, request.FILES)

                if form.is_valid():
                    user = request.user

                    """ 
                    Here we have to check which fields in the form the user has filled in.
                    We can't user the normal form.save() as we are saving to two different models
                    (Venue and User).

                    This function could also have been implemented by overriding save() in 
                    EditVenueForm
                    """

                    if (form.cleaned_data.get('email') != ""):
                        user.email = form.cleaned_data.get('email')
                    if (form.cleaned_data.get('image') != None):
                        user.venue.image = form.cleaned_data.get('image')
                    if (form.cleaned_data.get('password') != ""):
                        user.password = make_password(form.cleaned_data.get('password'))
                    if (form.cleaned_data.get('pretty_mode') != None):
                        user.pretty_mode = form.cleaned_data.get('pretty_mode')
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
                    
                    #Save the new updated models
                    user.save()
                    user.venue.save()
                    return render(request, 'concert/profile.html', {'selecteduser': user, 'form': EditVenueForm, 'loginform': loginForm})
                else:
                    print(form.errors) #Print the errors
            else:
                form = EditVenueForm(initial={
                                        'email': user.email,
                                        'pretty_mode': user.pretty_mode,
                                        'venue_name': user.venue.venue_name,
                                        'location': user.venue.location,
                                        'website': user.venue.website,
                                        'description': user.venue.description,
                                        'phone_number': user.venue.phone_number,
                                        'capacity': user.venue.capacity
                                    })

        else:
            if request.method == 'POST':
                form = EditGigGoerForm(request.POST, request.FILES)
                if form.is_valid():
                    user = request.user

                    """ 
                    Here we have to check which fields in the form the user has filled in.
                    We can't user the normal form.save() as we are saving to two different models
                    (Giggoer and User).

                    This function could also have been implemented by overriding save() in 
                    EditGigGoerForm
                    """

                    if (form.cleaned_data.get('email') != ""):
                        user.email = form.cleaned_data.get('email')
                    if (form.cleaned_data.get('image') != None):
                        user.giggoer.image = form.cleaned_data.get('image')
                    if (form.cleaned_data.get('password') != ""):
                        user.password = make_password(form.cleaned_data.get('password'))
                    if (form.cleaned_data.get('pretty_mode') != None):
                        user.pretty_mode = form.cleaned_data.get('pretty_mode')
                    user.giggoer.save()
                    user.save()  
                    return render(request, 'concert/profile.html', {'selecteduser': user, 'form': EditGigGoerForm, 'loginform': loginForm})
            else:
                form = EditGigGoerForm(initial={
                                            'email': user.email,
                                            'pretty_mode': user.pretty_mode
                                        })

        return render(request, 'concert/profile.html', {'form': form, 'selecteduser': user, 'loginform': loginForm})
        #Subllime highlights the line above as a bug

    return render(request, 'concert/profile.html', {'selecteduser': user, 'loginform': loginForm}) 


# This lets the events view to dynamically add a concert each time one is bookmarked
def getConcert(request ,id):
    concert = get_object_or_404(Concert, concertID=id)

    #If concert has already been bookmarked, do nothing
    if concert in request.user.giggoer.bookmarks.all():
        return HttpResponse()
    results = []

    #Store the JSON data
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
    results.append(concert_json) #Append to a list (in case we want several concerts in the future)
    data = json.dumps(results)  #Dump to JSON
    return HttpResponse(data, 'application/json')


@requires_csrf_token
def postComment(request):
    #This view is used so that a comment can be posted using AJAX

    user = request.user
    text = request.POST.get('data') #Get the text data
    concertID = request.POST.get('id')

    #Check if empty comment and return false success if empty
    if text == "" or text == None:
        payload = {'success': "False"}
    else:
        concert = get_object_or_404(Concert, concertID=concertID)

        #Create a new comment object
        comment = Comment.objects.create(
            user = user,
            text = text,
            concert = concert,
            time = datetime.now())

        comment.save() #Make sure comment is saved in database

        #Return the appropiate comment image depending on usertype
        if user.is_venue:
            image = user.venue.image.url
        else:
            image = user.giggoer.image.url

        payload = {'success': "True", 'username':user.username, 'image':image}

    return HttpResponse(json.dumps(payload), content_type='application/json')


@login_required
@giggoer_required
def discover(request):
    loginForm = user_login(request)
    concert_list = recommendation(request) #Get recommendation from recommendation engine
    return render(request, 'concert/discover.html', {'loginform': loginForm, 'concerts': concert_list})


@requires_csrf_token
def rateConcert(request):
    #This view is used so that a rating can be posted using AJAX

    #Load in the necessary data
    user = request.user
    rating = request.POST.get('data')
    concertID = request.POST.get('id')
    concert = get_object_or_404(Concert, concertID=concertID)

    #Store the new rating
    rating = Rating.objects.create(
        user = user,
        score = rating,
        concert = concert,)

    rating.save() #Save the new rating

    #Calculate new average rating
    sum = 0
    for rating in concert.rating.all(): #Sum all the scores
        sum = sum + rating.score

    length = len(concert.rating.all()) #Error handling so that we can't get divide by 0 error
    if length == 0:
        length = 1

    averageRating = round(sum/length)

    payload = {'success': "True", 'filledStars' : averageRating}
    

    return HttpResponse(json.dumps(payload), content_type='application/json')

def switchView(request):
    request.user.pretty_mode = not request.user.pretty_mode
    request.user.save()
    return events(request)
    
