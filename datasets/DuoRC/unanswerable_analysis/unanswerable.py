import pandas as pd

# What / Where / Why / Who / Whose / When / Which
# How / how many / how often / how far / how much / how long / how old
def find_type(qn):
    qn = qn.lower()
    if 'what' in qn:
        return 'what'
    elif 'where' in qn:
        return 'where'
    elif 'why' in qn:
        return 'why'
    elif 'who' in qn:
        return 'who'
    elif 'whose' in qn:
        return 'whose'
    elif 'when' in qn:
        return 'when'
    elif 'which' in qn:
        return 'which'
    elif 'how many' in qn:
        return 'how many'
    elif 'how often' in qn:
        return 'how often'
    elif 'how far' in qn:
        return 'how far'
    elif 'how much' in qn:
        return 'how much'
    elif 'how long' in qn:
        return 'how long'
    elif 'how old' in qn:
        return 'how old'
    elif 'how' in qn:
        return 'how'
    elif qn.startswith('name'):
        return 'listing'
    elif qn.startswith('do') or qn.startswith('did') or qn.startswith('does'):
        return 'do'
    elif qn.startswith('is') or qn.startswith('are') or qn.startswith('was') or qn.startswith('were'):
        return 'yes/no'
    else:
        return 'NaN'

def get_question_type(arr):
    result = []
    for qn in arr:
        type = find_type(qn)
        result.append(type)

    return result


cols = list(pd.read_csv('train_qas.csv', nrows=1))

df = pd.read_csv('train_qas.csv',
                 usecols=[i for i in cols if i != 'answer_text'])

df_filtered = df[df['no_answers'] == True].copy()

df_filtered['question_type'] = get_question_type(df_filtered['question_text'])

print(df_filtered.shape)

df_filtered.to_csv(r'./unanswerable.csv')


