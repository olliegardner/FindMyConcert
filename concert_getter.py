import os
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'FindMyConcert.settings')

import django
django.setup()

from concert.models import Concert, Venue, User
from datetime import date, datetime, timedelta
from django.contrib.staticfiles.templatetags.staticfiles import static
from django.db import IntegrityError
from secret.secret_settings import SONG_KICK_API_KEY

import requests
import sys
import random

def get_create_venue(username, venue_nam, location, website, description, phone_number, capacity, image):
    email = username + "@" + username + ".com"

    try:
        user, new_user = User.objects.get_or_create(username=username,  email=email, password='strongpass123', is_venue=True)
        venue, new_venue = Venue.objects.get_or_create(user=user, venue_name=venue_name, location=location, website=website, description=description, phone_number=phone_number, capacity=capacity, image=image)
        return venue
    except IntegrityError:
        print('User already exists. Try another artist!')
        exit(1)


if len(sys.argv) >= 2:
    input_artist = ' '.join(sys.argv[1:])
    current_date = date.today()
    start_date = str(current_date.replace(year=current_date.year-1))
    end_date = str(current_date.replace(year=current_date.year+1))

    # returns songkick event objects with artist name with a 2 year range
    url = 'https://api.songkick.com/api/3.0/events.json?apikey=' + SONG_KICK_API_KEY + '&artist_name=' + input_artist + '&min_date=' + start_date + '&max_date=' + end_date

    response = requests.get(url=url)
    data = response.json()

    concerts = data['resultsPage']['results']['event'] # gets list of concerts from dictionary
    random_concert = random.choice(concerts) # chooses random concert from list

    artist = random_concert['performance'][0]['displayName']

    d = random_concert['start']['date']
    #new_date = datetime.strptime(d, '%Y-%m-%d') # converts string back to datetime object
    #new_date = new_date.strftime('%d/%m/%Y') # converts date to right format for adding to concert object

    start_time = random_concert['start']['time']
    end_time = datetime.strptime(start_time, '%H:%M:%S') + timedelta(hours=2) # songkick api does not have end time so manually add 2 hours
    end_time = end_time.strftime('%H:%M:%S')
    image = static('note.png')
    url = random_concert['uri']
    description = random_concert['displayName']

    venue_name = random_concert['venue']['displayName']
    location = random_concert['location']['city']


    venue = get_create_venue(venue_name.lower().replace(' ', '_'), venue_name, location, url, description, 123456789, 69, image)

    try:
        concert, new_concert = Concert.objects.get_or_create(artist=artist, date=d, start_time=start_time, end_time=end_time, image=image, url=url, description=description, spotify_URI='hgvhvhvh', venue=venue)
        print("Concert created!")
    except IntegrityError:
        print('ERROR: This concert already exists! Try a different artist.')

else:
    print('Format: python concert_getter.py [artist]')

