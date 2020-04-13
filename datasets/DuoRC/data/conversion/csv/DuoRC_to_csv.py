import pandas as pd



frame = pd.read_json("../SelfRC_dev.json.txt")

size = len(frame)

plot = []
title = []
id = []
qaid = []
question = []
qa_answer = []
answerable = []

for index, row in frame.iterrows():
    current_plot = row['plot']
    current_title = row['title']
    current_id = row['id']
    qa_num = len(row['qa'])

    for i in range(qa_num):
        current_pair = row['qa'][i]
        qa_id = current_pair['id']
        qa_question = current_pair['question']
        no_answer = current_pair['no_answer']
        answer = current_pair['answers']

        plot.append(current_plot)
        title.append(current_title)
        id.append(current_id)
        qaid.append(qa_id)
        question.append(qa_question)
        qa_answer.append(answer)
        answerable.append(no_answer)

qas = {'title': title,
       'question_text': question,
       'question_id': qaid,
       'answer_text': qa_answer,
       'no_answers': answerable,
       'context': plot,
       'id': id
       }

qas_frame = pd.DataFrame(qas)

print(qas_frame.shape)
print(len(plot))

qas_frame.to_csv(r'./dev_qas.csv')

"""
path in mac and unix:
a / separates elements of the path, 
. as a path element always means the directory indicated by preceding path, 
and .. as a path element always means the parent of the directory indicated by the preceding path. 
A leading ~ in a path is not treated specially, but expand-user-path 
can be used to convert a leading ~ element to a user-specific directory.
"""
