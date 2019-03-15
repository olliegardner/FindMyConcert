import os
os.environ.setdefault('DJANGO_SETTINGS_MODULE',
                      'FindMyConcert.settings')
import django
django.setup()

import pandas as pd
import shutil
from concert.models import GigGoer, User, Venue, Concert
from django.db import models 
from django.contrib.auth.hashers import make_password
from django.core.files import File


BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

class Populate():
    def __init__(self):
        self.populate_giggoers()
        self.populate_venues()
        self.populate_concerts()

    def populate_giggoers(self):
        path = os.path.join(os.getcwd(), 'population_files', 'giggoers.csv')
        data = pd.read_csv(path)
        print(data)
        for ir in data.itertuples():


            imgpath = os.path.join(os.getcwd(), 'population_files', 'images', str(ir[4]) + ".jpg")
            print(ir)
            print(ir[1])
            user = User.objects.create(
            username = ir[1],
            password = make_password(ir[2]),
            email    = ir[3],
            is_venue = False,
            )
            giggoer = GigGoer.objects.create(user = user)
            giggoer.image.save(str(ir[4]), File(open(imgpath, 'rb')))

            user.save()
            giggoer.save()

    def populate_venues(self):
        path = os.path.join(os.getcwd(), 'population_files', 'venues.csv')
        data = pd.read_csv(path)
        print(data)
        for ir in data.itertuples():
            imgpath = os.path.join(os.getcwd(), 'population_files', 'images', str(ir[4]) + ".jpg")
            print(ir)
            print(ir[1])
            
            user = User.objects.create(
            username = ir[1],
            password = make_password(ir[2]),
            email    = ir[3],
            is_venue = True,
            )
            venue = Venue.objects.create(user = user)
            venue.image.save(str(ir[4]), File(open(imgpath, 'rb')))
            venue.venue_name  = ir[5]
            venue.location    = ir[6]
            venue.website     = ir[7]
            venue.description = ir[8]
            venue.phonenumber = ir[9]
            venue.capacity    = ir[10]

            user.save()
            venue.save()

    def populate_concerts(self):
        path = os.path.join(os.getcwd(), 'population_files', 'concerts.csv')
        data = pd.read_csv(path)


        for ir in data.itertuples():
            print(ir)
            imgpath = os.path.join(os.getcwd(), 'population_files', 'images', str(ir[5]) + ".jpg")
            concert = Concert.objects.create(
            artist = ir[1],
            date   = ir[2],
            start_time = ir[3],
            end_time = ir[4],
            url = ir[6],
            description = ir[7],
            venue = User.objects.get(username=ir[8]).venue,
            spotify_URI = ir[9]
            )

            concert.image.save(str(ir[5]), File(open(imgpath, 'rb')))
            concert.save()

if __name__ == "__main__":
  Populate()








