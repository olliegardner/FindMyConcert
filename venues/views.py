from django.shortcuts import render

def venueIndex(request):
    return render(request, 'venues/index.html')

def addConcert(request):
    return render(request, 'venues/addConcert.html')