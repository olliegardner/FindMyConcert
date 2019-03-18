import pandas as pd

class train_network:

    def __init__(self):
        data = self.load_files()

    def load_files(self):
        data = pd.read_csv('neural_data.csv')
        print(data)
        return data

train_network()