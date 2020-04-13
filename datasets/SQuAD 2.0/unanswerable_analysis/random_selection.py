import pandas as pd

df = pd.read_csv('unanswerable.csv')

df_filtered = df[df['question_type'] == 'yes/no'].copy()

df_elements = df_filtered.sample(n=25)

df_elements.to_csv(r'./what.csv')