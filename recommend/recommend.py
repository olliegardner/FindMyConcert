from concert.models import Concert


"""
This was built by following instruction provided by Nick Becker
Source: https://beckernick.github.io/matrix-factorization-recommender/
        https://www.netflixprize.com/assets/GrandPrize2009_BPC_BellKor.pdf

"""
import os
import pandas as pd
import numpy as np
from scipy.sparse.linalg import svds

class recommendationEngine:

    def __init__(self, user):
        
        ratings_matrix = self.load_files()
        #Clean the data we need
        users, artists, ratings_matrix_demeaned, ratings_mean = self.clean_data(ratings_matrix)
        self.recommendation_list = self.recommend(users, artists, ratings_matrix_demeaned, ratings_mean,user)

    def load_files(self):
        #Read in the matrix we are using
        ratings_matrix = pd.read_csv(os.getcwd()+'/recommend/ratings.csv', index_col = 0)
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
   

    def recommend(self, users, items, ratings_matrix_demeaned, ratings_mean,user):
        U, sigma, Vt = svds(ratings_matrix_demeaned, k = 5)
        sigma = np.diag(sigma)
        
        all_predicted_ratings = np.dot(np.dot(U, sigma), Vt) + ratings_mean.reshape(-1, 1)
        preds_df = pd.DataFrame(all_predicted_ratings, index = users, columns = items)
        sorted_dataframe = preds_df.loc[[user]].transpose().sort_values(by = user, ascending = False)
        recommendation_list = sorted_dataframe.index.values


        return recommendation_list
        

def recommendation(request):
    user = request.user
    ratings = user.rating.all()
    print(request.user)
    engine = recommendationEngine(str(user.username))
    recommendation_list = engine.recommendation_list


    concert_objects = []
    for artist in recommendation_list:
        try:
            concert = Concert.objects.get(artist = artist)
        except Concert.DoesNotExist:
            concert = None
        if concert:
            concert_objects.append(concert)

    
    concert_list = []
    i = 0
    concert_count = 0
    while i < 9 and concert_count < len(concert_objects):      
        if concert_objects[concert_count] not in user.giggoer.bookmarks.all():
            concert_list.append(concert_objects[concert_count])
            i += 1
        concert_count += 1
    return concert_list