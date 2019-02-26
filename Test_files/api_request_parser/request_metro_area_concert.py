import requests 


url = 'https://api.songkick.com/api/3.0/'

params = dict(
    apikey='',
    metro_area_id='Los+Angeles,CA',
    min_date = "2019-01-01",
    max_date = "2019-06-01",
)

resp = requests.get(url=url, json=params)
data = resp.json() # Check the JSON Response Content documentation below
