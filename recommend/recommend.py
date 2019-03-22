from concert.models import Concert


"""
This was built by following instruction provided by Nick Becker
Source: https://beckernick.github.io/matrix-factorization-recommender/
        http://www.cs.carleton.edu/cs_comps/0607/recommend/recommender/svd.html
        

"""
import os
import pandas as pd
import numpy as np
from scipy.sparse.linalg import svds
from django.db.models import Q

class recommendationEngine:

    def __init__(self, user):
        
        ratings_matrix = self.load_files()
        ratings_matrix = self.check_user(user, ratings_matrix)

        #Clean the data we need
        users, artists, ratings_matrix_demeaned, ratings_mean = self.clean_data(ratings_matrix)
        self.recommendation_list = self.recommend(users, artists, ratings_matrix_demeaned, ratings_mean,user.username)

    def load_files(self):
        #Read in the matrix we are using
        ratings_matrix = pd.read_csv(os.getcwd()+'/recommend/ratings.csv', index_col = 0)
        return ratings_matrix

    def check_user(self, user, ratings_matrix):

        #If user is already in matrix, drop their old ratings
        if user.username in ratings_matrix.index.values:
            ratings_matrix = ratings_matrix.drop(index=user.username)
        
        #Now add in the user and their newwest ratings
        ratings_matrix = ratings_matrix.reindex(ratings_matrix.index.values.tolist()+[user.username])
        ratings = []

        #Loop through all the user's ratings and add mathcing ones to the ratings_matrix
        for artist in ratings_matrix.columns.values:
            for rating in user.rating.all():
                if rating.concert.artist == artist:
                    ratings_matrix.at[user.username, artist] = rating.score
        


        return ratings_matrix

    def clean_data(self, ratings_matrix):

        #It is already a sparse matrix, fill in the empty values
        ratings_matrix.fillna(0, inplace=True)

        #Now save users and items and convert the pamdas dataframe to a numpy matrix
        users = ratings_matrix.index.tolist()
        items = ratings_matrix.columns.tolist()
        ratings_matrix = ratings_matrix.as_matrix()

        ratings_mean = np.mean(ratings_matrix, axis = 1)
        ratings_matrix_demeaned = ratings_matrix - ratings_mean.reshape(-1, 1)

        return users, items, ratings_matrix_demeaned, ratings_mean
   

    def recommend(self, users, items, ratings_matrix_demeaned, ratings_mean,username):
        U, sigma, Vt = svds(ratings_matrix_demeaned, k = 5)
        sigma = np.diag(sigma)
        
        all_predicted_ratings = np.dot(np.dot(U, sigma), Vt) + ratings_mean.reshape(-1, 1)
        preds_df = pd.DataFrame(all_predicted_ratings, index = users, columns = items)
        sorted_dataframe = preds_df.loc[[username]].transpose().sort_values(by = username, ascending = False)
        recommendation_list = sorted_dataframe.index.values

        return recommendation_list
        

def recommendation(request):
    user = request.user
    ratings = user.rating.all()
    engine = recommendationEngine(user)
    recommendation_list = engine.recommendation_list

    concert_list = Concert.objects.all()

    concert_objects = []
    for artist in recommendation_list:
        for concert in concert_list.filter(Q(artist__icontains=artist)):
            concert_objects.append(concert)

    
    concert_list = []
    i = 0
    concert_count = 0
    while i < 9 and concert_count < len(concert_objects):      
        if concert_objects[concert_count] not in user.giggoer.bookmarks.all() and concert_objects[concert_count].is_future():
            concert_list.append(concert_objects[concert_count])
            i += 1
        concert_count += 1
    return concert_list