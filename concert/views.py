from django.shortcuts import render

from django.http import HttpResponse 

def index(request):
	return render(request, 'concert/index.html')


def contacts(request):
	return render(request, 'concert/contacts.html')

<<<<<<< HEAD
			if 'picture' in request.FILES:
				profile.picture = request.FILES['picture']

			profile.save()
			registered = True
		else:
			print(user_form.errors, profile_form.errors)
	else:
		user_form = UserForm()
		profile_form = UserProfileForm()

	return render(request, 'concert/register.html', {'user_form': user_form, 'profile_form': profile_form, 'registered': registered})'''

	return render(request, 'concert/register.html')


def about(request):
	return render(request, 'concert/about.html')


def faq(request):
	return render(request, 'concert/faq.html')


def contact(request):
	return render(request, 'concert/contact.html')


def my_events(request):
	return render(request, 'concert/my_events.html')

=======
def register(request):
	return render(request, 'concert/register.html')
>>>>>>> f2fc27dbac3433501ebc7f5d2f78de5f9128a123
