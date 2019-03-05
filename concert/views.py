from django.shortcuts import render
from django.shortcuts import redirect
from django.http import HttpResponse
from django.contrib.auth.decorators import login_required
from concert.models import User
from concert.forms import EditGigGoerForm, VenueSignupForm
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
    # The referenced HTML content can be copied from the signup.html
    # in the django-allauth template folder
    template_name = 'account/signup_company.html'
    # the previously created form class
    form_class = VenueSignupForm

    # the view is created just a few lines below
    # N.B: use the same name or it will blow up
    view_name = 'company_signup'

    # success_url = None
    # redirect_field_name = 'next'

class gigGoerSignUp(SignupView):
    pass
    # The referenced HTML content can be copied from the signup.html
    # in the django-allauth template folder
    template_name = 'account/signup_venue.html'
    # the previously created form class
    form_class = VenueSignupForm

    # the view is created just a few lines below
    # N.B: use the same name or it will blow up
    view_name = 'company_signup'

    # success_url = None
    # redirect_field_name = 'next'


venue_signup = venueSignUp.as_view()
