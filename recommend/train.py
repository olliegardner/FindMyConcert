

"""
This was built by following instruction provided by Nick Becker
Source: https://beckernick.github.io/matrix-factorization-recommender/

"""


import pandas as pd
import numpy as np
from scipy.sparse.linalg import svds
#from tensorflow.contrib import factorization_ops

class train_network:

    def __init__(self):
        ratings_matrix = self.load_files()
        
        #Clean the data we need
        users, items, ratings_matrix_demeaned, ratings_mean = self.clean_data(ratings_matrix)

        self.network(users, items, ratings_matrix_demeaned, ratings_mean)

    def load_files(self):
        #Read in the matrix we are using
        ratings_matrix = pd.read_csv('ratings.csv', index_col = 0)
        print(ratings_matrix)
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
        preds_df = pd.DataFrame(all_predicted_ratings, index = users, columns = items)
        sorted_dataframe = preds_df.loc[['giggoer2']].transpose().sort_values(by = 'giggoer2', ascending = False)
        recommendation_list = sorted_dataframe.index.values
        print(preds_df)
        

train_network()



