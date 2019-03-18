

"""
This was built by following instruction provided by google for TensorFlow

Source: https://cloud.google.com/solutions/machine-learning/recommendation-system-tensorflow-create-model
        https://cloud.google.com/solutions/machine-learning/recommendation-system-tensorflow-overview
        https://en.wikipedia.org/wiki/Matrix_factorization_(recommender_systems)
        https://machinelearningmastery.com/introduction-to-matrix-decompositions-for-machine-learning/
        https://vitobellini.github.io/posts/2018/01/03/how-to-build-a-recommender-system-in-tensorflow.html

"""


import pandas as pd
import scipy  as sp
import numpy  as np
import tensorflow as tf
#from tensorflow.contrib import factorization_ops

class train_network:

    def __init__(self):
        ratings_matrix = self.load_files()
        self.WALS(ratings_matrix)

    def load_files(self):
        #Read in the matrix we are using, it is already a sparse matrix by design
        #But we need to convert it to a sparse scipy matrix for tensorflow
        ratings_matrix = pd.read_csv('neural_data.csv').to_numpy()
        print(ratings_matrix)
        return ratings_matrix

    def WALS(self, ratings_matrix):


        num_input = ratings_matrix
        num_hidden_1 = 10
        num_hidden_2 = 5

        X = tf.placeholder(tf.float64, [None, num_input])

        weights = {
            'encoder_h1': tf.Variable(tf.random_normal([num_input, num_hidden_1], dtype=tf.float64)),
            'encoder_h2': tf.Variable(tf.random_normal([num_hidden_1, num_hidden_2], dtype=tf.float64)),
            'decoder_h1': tf.Variable(tf.random_normal([num_hidden_2, num_hidden_1], dtype=tf.float64)),
            'decoder_h2': tf.Variable(tf.random_normal([num_hidden_1, num_input], dtype=tf.float64)),
        }

        biases = {
            'encoder_b1': tf.Variable(tf.random_normal([num_hidden_1], dtype=tf.float64)),
            'encoder_b2': tf.Variable(tf.random_normal([num_hidden_2], dtype=tf.float64)),
            'decoder_b1': tf.Variable(tf.random_normal([num_hidden_1], dtype=tf.float64)),
            'decoder_b2': tf.Variable(tf.random_normal([num_input], dtype=tf.float64)),
        }



        """
        #Turn into a list with two np.int64 arrays
        sparse_indicies = list(zip(
            ratings_matrix.row.astype(np.int64).tolist(), 
            ratings_matrix.col.astype(np.int64).tolist()))

        #Create out input_tensor
        input_tensor = tf.SparseTensor(indices= sparse_indicies,
                                values=(ratings_matrix.data).astype(np.float32),
                                dense_shape=ratings_matrix.shape)
        print(input_tensor)

        
        #Now use the TensorFlow weighted alternating least squares, this decomposes the matrix into two lower
        #dimensional matrices in latent space 
        model = tf.contrib.factorization.WALSModel(len(), num_cols, dim,
                                    unobserved_weight=unobs,
                                    regularization=reg,
                                    row_weights=row_wts,
                                    col_weights=col_wts)

        # retrieve the row and column factors
        row_factor = model.row_factors[0]
        col_factor = model.col_factors[0]
        """
        

train_network()



