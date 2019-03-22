import os
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'FindMyConcert.settings')

import django
django.setup()

from concert.models import Concert

import requests
import sys
import random
from datetime import date, datetime

if len(sys.argv) >= 2:
	api_key = 'XKMdS7NjLNYNen3B'
	input_artist = ' '.join(sys.argv[1:])
	current_date = date.today()
	start_date = str(current_date.replace(year=current_date.year-1))
	end_date = str(current_date.replace(year=current_date.year+1))

	# returns songkick event objects with artist name with a 2 year range
	url = 'https://api.songkick.com/api/3.0/events.json?apikey=' + api_key + '&artist_name=' + input_artist + '&min_date=' + start_date + '&max_date=' + end_date

	response = requests.get(url=url)
	data = response.json()

	concerts = data['resultsPage']['results']['event'] # gets list of concerts from dictionary
	random_concert = random.choice(concerts) # chooses random concert from list

	artist = random_concert['performance'][0]['displayName']

	d = random_concert['start']['date']
	new_date = datetime.strptime(d, '%Y-%m-%d') # converts string back to datetime object
	new_date = new_date.strftime('%d/%m/%Y') # converts date to right format for adding to concert object

	start_time = random_concert['start']['time']

	url = random_concert['uri']
	description = random_concert['displayName']

	venue = random_concert['venue']['displayName']

	# date, start_time, end_time, image, url, description, spotify_URI, venue

	print(artist, new_date, start_time, description, venue)

	#concert = Concert.objects.get(artist=artist)


else:
	print('Format: python concert_getter.py [artist]')
