import os
os.environ.setdefault('DJANGO_SETTINGS_MODULE',
                      'FindMyConcert.settings')
import django
django.setup()

import pandas as pd
from concert.models import GigGoer, User, Venue, Concert
from django.db import models 
from django.contrib.auth.hashers import make_password

class Populate():
    def __init__(self):
        #self.populate_giggoers()
        self.populate_venues()

    def populate_giggoers(self):
        path = os.path.join(os.getcwd(), 'population_files', 'giggoers.csv')
        data = pd.read_csv(path)
        print(data)
        for ir in data.itertuples():
            print(ir)
            print(ir[1])
            user = User.objects.create(
            username = ir[1],
            password = make_password(ir[2]),
            email    = ir[3],
            is_venue = False,
            )
            giggoer = GigGoer.objects.create(user = user)
            giggoer.image = os.path.join(os.getcwd(), 'population_files', 'images', str(ir[4]) + ".jpg")
            user.save()
            giggoer.save()

    def populate_venues(self):
        path = os.path.join(os.getcwd(), 'population_files', 'venues.csv')
        data = pd.read_csv(path)
        print(data)
        for ir in data.itertuples():
            print(ir)
            print(ir[1])
            
            user = User.objects.create(
            username = ir[1],
            password = make_password(ir[2]),
            email    = ir[3],
            is_venue = True,
            )
            venue = Venue.objects.create(user = user)
            venue.image       = os.path.join(os.getcwd(), 'population_files', 'images', str(ir[4]) + ".jpg")
            venue.venue_name  = ir[5]
            venue.location    = ir[6]
            venue.website     = ir[7]
            venue.description = ir[8]
            venue.phonenumber = ir[9]
            venue.capacity    = ir[10]

            user.save()
            venue.save()
            



if __name__ == "__main__":
  Populate()








