from django.shortcuts import render
from django.shortcuts import redirect
from django.http import HttpResponse
from django.contrib.auth.decorators import login_required
from concert.models import User
from concert.forms import GigGoerSignUpForm, VenueSignUpForm
from allauth.account.views import SignupView


@login_required
def profile(request, username):

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


def index(request):
    return render(request, 'concert/index.html')

def about(request):
    return render(request, 'concert/about.html')

def faq(request):
    return render(request, 'concert/faq.html')

def contact(request):
    return render(request, 'concert/contact.html')

def myEvents(request):
    return render(request, 'concert/myEvents.html')

def chooseSignUp(request):
    return render(request, 'concert/index.html')

class venueSignUp(SignupView):
    template_name = 'account/signup_venue.html'

    form_class = VenueSignUpForm
    view_name = 'company_signup' 
    # user the same name for the view_name variable and the name of
    # form variable, it will blow up otherwise

    # success_url = None
    # redirect_field_name = 'next'

class gigGoerSignUp(SignupView):
    template_name = 'account/signup_giggoer.html'
    form_class = GigGoerSignUpForm
    view_name = 'giggoer_signup'

    # success_url = None
    # redirect_field_name = 'next'


venue_signup   = venueSignUp.as_view()
giggoer_signup = gigGoerSignUp.as_view()
