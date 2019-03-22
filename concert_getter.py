import os
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'FindMyConcert.settings')

import django
django.setup()

from concert.models import Concert, Venue, User
from datetime import date, datetime, timedelta
from django.contrib.staticfiles.templatetags.staticfiles import static
from django.db import IntegrityError
from secret.secret_settings import SONG_KICK_API_KEY
from django.core.files import File

import requests
import sys
import random

imgpath = os.path.join(os.getcwd(), 'static', 'images', "default-pic.png")

def get_create_venue(username, venue_name, location, website, description, phone_number, capacity):
    email = username + "@" + username + ".com"

    user = User.objects.create(username=username, email=email, password='strongpass123', is_venue=True)
    #imgpath = os.path.join(os.getcwd(), 'static', 'images', "default-pic.png")
    #image = ('default', File(open(imgpath, 'rb')))
    venue = Venue.objects.create(
        user=user,
        venue_name=venue_name,
        location=location, 
        website=website, 
        description=description, 
        phone_number=phone_number, 
        capacity=capacity)
    venue.image.save('default', File(open(imgpath, 'rb')))
    venue.save()


if len(sys.argv) >= 2:
    input_artist = ' '.join(sys.argv[1:])
    current_date = date.today()
    start_date = str(current_date.replace(year=current_date.year-5))
    end_date = str(current_date.replace(year=current_date.year+5))

    # returns songkick event objects with artist name with a 2 year range
    url = 'https://api.songkick.com/api/3.0/events.json?apikey=' + SONG_KICK_API_KEY + '&artist_name=' + input_artist + '&min_date=' + start_date + '&max_date=' + end_date

    response = requests.get(url=url)
    data = response.json()

    #try:
    concerts = data['resultsPage']['results']['event'] # gets list of concerts from dictionary
    random_concert = random.choice(concerts) # chooses random concert from list

    artist = random_concert['performance'][0]['displayName']
    d = random_concert['start']['date']

    start_time = random_concert['start']['time']
    end_time = None

    if start_time != None:
        end_time = datetime.strptime(start_time, '%H:%M:%S') + timedelta(hours=2) # songkick api does not have end time so manually add 2 hours
        end_time = end_time.strftime('%H:%M:%S')
    else:
        start_time = "19:00:00"
        end_time = "22:00:00"



    url = random_concert['uri']
    description = random_concert['displayName']

    """
    venue_name = random_concert['venue']['displayName']
    location = random_concert['location']['city']
    """
    #venue = get_create_venue(venue_name.lower().replace(' ', '_'), venue_name, location, url, description, 123456789, 69)
    venue = Venue.objects.get()

    #image = ('default', File(open(imgpath, 'rb')))




    concert = Concert.objects.create(artist=artist, date=d, start_time=start_time, end_time=end_time, url=url, description=description, spotify_URI='hgvhvhvh', venue=venue)
    concert.image.save('default', File(open(imgpath, 'rb')))
    concert.save()
    print("Concert created!")
    
    #except KeyError:
        #print('No results')
        #exit(1)        

else:
    print('Format: python concert_getter.py [artist]')

