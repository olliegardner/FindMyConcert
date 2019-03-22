import os
os.environ.setdefault('DJANGO_SETTINGS_MODULE',
                      'FindMyConcert.settings')
import django
django.setup()
from concert.models import GigGoer, User, Venue, Concert, Comment

from datetime import datetime

from django.db import models 
from django.contrib.auth.hashers import make_password
from django.core.files import File

import pandas as pd
import shutil

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

class Populate():
    def __init__(self):
        self.populate_venues()
        self.populate_concerts()
        self.populate_giggoers()
        self.populate_comments()

    def populate_giggoers(self):
        #Read giggoer csv files
        path = os.path.join(os.getcwd(), 'population_files', 'giggoers.csv')
        data = pd.read_csv(path)

        print(data)

        #Iterate trhough all rows in dataframe
        for ir in data.itertuples():

            #Create the path for images
            imgpath = os.path.join(os.getcwd(), 'population_files', 'images', str(ir[4]) + ".jpg")

            #Create the user
            user = User.objects.create(
            username = ir[1],
            password = make_password(ir[2]),
            email    = ir[3],
            is_venue = False,
            )

            #Create a giggoer object
            giggoer = GigGoer.objects.create(user = user)

            #Add an image to giggoer
            giggoer.image.save(str(ir[4]), File(open(imgpath, 'rb')))

            #Read in bookmarks, split into list, convert id to integers
            bookmarks = list(map(int, ir[5].split(',')))

            #Iterate through all the bookmarks
            for concertID in bookmarks:
                try:
                    #Try to fetchconcert by id
                    concert = Concert.objects.get(concertID = concertID)

                    #Bookmark concerts
                    giggoer.bookmarks.add(concert)

                except:
                    #If a concert can't be added, print warning
                    print("""


                            WARNING!

                            A bookmark could not be appended, are you sure you are running this in a fresh database?

                            Please delete db.sqlite3 and try again


                            """)

            #save giggoer and user
            user.save()
            giggoer.save()

    def populate_venues(self):
        #Read in venue csv file
        path = os.path.join(os.getcwd(), 'population_files', 'venues.csv')
        data = pd.read_csv(path)
        print(data)

        #Iterate trhrough rows in dataframe
        for ir in data.itertuples():

            #Fetch the path for the image
            imgpath = os.path.join(os.getcwd(), 'population_files', 'images', str(ir[4]) + ".jpg")
            
            #Create a USER object
            user = User.objects.create(
            username = ir[1],
            password = make_password(ir[2]),
            email    = ir[3],
            is_venue = True,
            )

            #Create a venue object and save data to all the fields
            venue = Venue.objects.create(user = user)
            venue.image.save(str(ir[4]), File(open(imgpath, 'rb')))
            venue.venue_name  = ir[5]
            venue.location    = ir[6]
            venue.website     = ir[7]
            venue.description = ir[8]
            venue.phonenumber = ir[9]
            venue.capacity    = ir[10]

            #save user and venue
            user.save()
            venue.save()

    def populate_concerts(self):
        #Read in concert CSV
        path = os.path.join(os.getcwd(), 'population_files', 'concerts.csv')
        data = pd.read_csv(path)
        print(data)

        #Iterate through all the rows
        for ir in data.itertuples():

            #Fetch the path for the image
            imgpath = os.path.join(os.getcwd(), 'population_files', 'images', str(ir[5]) + ".jpg")

            #Create the concert object
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

            #Save image to concert object
            concert.image.save(str(ir[5]), File(open(imgpath, 'rb')))

            #Save the new concert
            concert.save()

    def populate_comments(self):
        #Read in comments csv
        path = os.path.join(os.getcwd(), 'population_files', 'comments.csv')
        data = pd.read_csv(path)

        #Iterate through all rows in dataframe
        for ir in data.itertuples():

            #Save data to variables 
            username  = ir[1]
            concertID = int(ir[2])
            text      = ir[3]

            #Try to fetch a concert object
            try:
                concert = Concert.objects.get(concertID = concertID)
            except:
                print("""

                        WARNING!

                        A concert could not be found!

                        Please delete db.sqlite3 and try again

                        """)
                concert = None

            #Try to fetch a user object
            try:
                user = User.objects.get(username = username)
            except:
                print("""

                        WARNING!

                        A concert could not be found!

                        Please delete db.sqlite3 and try again

                        """)
                user = None

            if concert != None and user != None:
                #Create new comment
                comment = Comment.objects.create(
                    user = user,
                    concert = concert,
                    text = text,
                    time = datetime.now()
                )

                #save comment
                comment.save()

if __name__ == "__main__":
    Populate()
