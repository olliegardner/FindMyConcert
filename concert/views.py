from django.shortcuts import render
from django.http import HttpResponse

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
