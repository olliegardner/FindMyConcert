import os
import pandas as pd
os.environ.setdefault('DJANGO_SETTINGS_MODULE',
                      'FindMyConcert.settings')
import django
import numpy as np
django.setup()
from concert.models import Concert, User


#Read in the current ratings
ratings_matrix = pd.read_csv('recommend/ratings.csv', index_col = 0)

print(ratings_matrix)
#Add new artists
for concert in Concert.objects.all():
  if concert.artist not in ratings_matrix.columns.values:
    ratings_matrix[concert.artist] = np.nan

#Loop trhough all the users and add current ratings 
for user in User.objects.all():
    if not user.is_venue:
        if user.username in ratings_matrix.index.values:
            ratings_matrix = ratings_matrix.drop(index=user.username)
            
        ratings_matrix = ratings_matrix.reindex(ratings_matrix.index.values.tolist()+[user.username])
        ratings = []
        for artist in ratings_matrix.columns.values:
            for rating in user.rating.all():
                if rating.concert.artist == artist:
                    ratings_matrix.at[user.username, artist] = rating.score

#Save new and updated matrix
ratings_matrix.to_csv('recommend/ratings.csv');