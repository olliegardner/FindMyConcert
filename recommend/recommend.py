from concert.models import Concert


"""
This was built by following instruction provided by Nick Becker
Source: https://beckernick.github.io/matrix-factorization-recommender/

"""
import pandas as pd
import numpy as np
from scipy.sparse.linalg import svds
#from tensorflow.contrib import factorization_ops
class train_network:

    def __init__(self, user):
        
        ratings_matrix = self.load_files()
        #Clean the data we need
        users, items, ratings_matrix_demeaned, ratings_mean = self.clean_data(ratings_matrix)

        self.network(users, items, ratings_matrix_demeaned, ratings_mean)

    def load_files(self):
        #Read in the matrix we are using
        ratings_matrix = pd.read_csv('neural_data.csv')
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
   

    def network(self, users, items, ratings_matrix_demeaned, ratings_mean):
        U, sigma, Vt = svds(ratings_matrix_demeaned, k = 5)
        sigma = np.diag(sigma)
        
        all_predicted_ratings = np.dot(np.dot(U, sigma), Vt) + ratings_mean.reshape(-1, 1)
        preds_df = pd.DataFrame(all_predicted_ratings)
        
        



def recommendationEngine(request):
    user = request.user
    ratings = user.rating.all()
    buildrecommender(user)

    all_concerts = Concert.objects.all()
    concert_list = []

    i = 0
    concert_count = 0
    while i < 9 and concert_count < len(all_concerts):      
        if all_concerts[concert_count] not in user.giggoer.bookmarks.all():
            concert_list.append(all_concerts[concert_count])
            i += 1
        concert_count += 1
    return concert_list