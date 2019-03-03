from django.shortcuts import render
from django.shortcuts import redirect
from django.http import HttpResponse
from django.contrib.auth.models import User
from django.contrib.auth.decorators import login_required
from concert.models import UserProfile
from concert.forms import UserProfileForm

@login_required
def profile(request, username):
    try:
        user = User.objects.get(username=username)
    except:
        return redirect('index')

    userprofile = UserProfile.objects.get_or_create(user=user)[0]
    form = UserProfileForm({'venue': userprofile.venue, 'image': userprofile.image})

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
