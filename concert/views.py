from django.shortcuts import render
from django.shortcuts import redirect
from django.http import HttpResponse
from django.contrib.auth.decorators import login_required
from concert.models import User
from concert.forms import GigGoerSignUpForm, VenueSignUpForm
from django.views.generic import CreateView

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
    return render(request, 'concert/chooseSignUp.html')

class GigGoerSignUp(CreateView):
    model = User
    form_class = GigGoerSignUpForm
    template_name = 'registration/signup.html'

    def get_context_data(self, **kwargs):
        kwargs['is_venue'] = False
        return super().get_context_data(**kwargs)

    def form_valid(self, form):
        user = form.save()
        login(self.request, user)
        return redirect('index')

class VenueSignUp(CreateView):
    model = User
    form_class = VenueSignUpForm
    template_name = 'registration/signup.html'

    def get_context_data(self, **kwargs):
        kwargs['is_venue'] = True
        return super().get_context_data(**kwargs)

    def form_valid(self, form):
        user = form.save()
        login(self.request, user)
        return redirect('index')
