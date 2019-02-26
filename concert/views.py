from django.shortcuts import render

from django.http import HttpResponse 

def index(request):
	return render(request, 'concert/index.html')


def contacts(request):
	return render(request, 'concert/contacts.html')

def register(request):
	return render(request, 'concert/register.html')