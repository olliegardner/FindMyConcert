import requests
import sys
import random
from datetime import date

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
	date = random_concert['start']['date']
	start_time = random_concert['start']['time']

	url = random_concert['uri']
	description = random_concert['displayName']

	venue = random_concert['venue']['displayName']

	# date, start_time, end_time, image, url, description, spotify_URI, venue

	print(artist, date, start_time, description, venue)

else:
	print('Format: python concert_getter.py [artist]')
