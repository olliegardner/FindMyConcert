

"""
This was built by following instruction provided by google for TensorFlow

Source: https://cloud.google.com/solutions/machine-learning/recommendation-system-tensorflow-create-model
        https://cloud.google.com/solutions/machine-learning/recommendation-system-tensorflow-overview

"""


import pandas as pd
import scipy  as sp
import numpy  as np

class train_network:

    def __init__(self):
        ratings_df = self.load_files()
        self.sparse_matrix(ratings_df)

    def load_files(self):
        #Read in the matrix we are using
        ratings_df = pd.read_csv('neural_data.csv') 
        return ratings_df

    def sparse_matrix(self, ratings_df):
        #Now create a sparse matrix with the ratings
        u_tr, i_tr, r_tr = zip(*ratings_df)
        tr_sparse = sp.coo_matrix((r_tr, (u_tr, i_tr)), shape=(n_users, n_items))

train_network()



