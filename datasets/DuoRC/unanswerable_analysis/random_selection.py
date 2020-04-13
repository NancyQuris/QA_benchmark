import pandas as pd

df = pd.read_csv('unanswerable.csv')

df_elements = df.sample(n=50)

df_elements.to_csv(r'./what.csv')