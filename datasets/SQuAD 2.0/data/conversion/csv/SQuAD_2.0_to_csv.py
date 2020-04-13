import json
import matplotlib.pyplot as plt
import numpy as ny
import pandas as pd
from pandas.io.json import json_normalize


frame = pd.read_json("../dev-v2.0.json") # dev/train

size = len(frame)


SQuAD_frame = frame.drop(columns=['version'])

title = []
paragraphs_nums = []

for index, row in SQuAD_frame.iterrows():
    title.append(row['data']['title'])
    paragraphs_nums.append(len(row['data']['paragraphs']))

paragraphs_count_data = {'title': title, 'paragraphs_nums': paragraphs_nums}

paragraph_count = pd.DataFrame(paragraphs_count_data)

# print(paragraph_count.head())

title_count1 = []
paragraph_seq1 = []
question_nums = []

for index, row in SQuAD_frame.iterrows():
    for i in range(0, len(row['data']['paragraphs'])):
        current_para = row['data']['paragraphs'][i]
        title_count1.append(row['data']['title'])
        paragraph_seq1.append(i)
        question_nums.append(len(current_para))

qa_nums = {'title_count': title_count1, 'paragraph_seq': paragraph_seq1, 'question_nums': question_nums}

qa_nums_frame = pd.DataFrame(qa_nums)

# print(qa_nums_frame.head())


title_count = []
paragraph_seq = []
question_text = []
question_id = []
answer_text_span_count = []
answer_text = []
answer_start = []
answer_is_impossible =[]
context = []

for index, row in SQuAD_frame.iterrows():
    for i in range(0, len(row['data']['paragraphs'])):
        current_para = row['data']['paragraphs'][i]

        for j in range(0, len(current_para['qas'])):

            current_qa_pair = current_para['qas'][j]

            title_count.append(row['data']['title'])
            paragraph_seq.append(i)

            current_question = current_qa_pair['question']
            question_text.append(current_question)
            question_id.append(current_qa_pair['id'])

            current_answer = current_qa_pair['answers']
            answer_text_span_count.append(len(current_answer))

            if len(current_answer) == 0:
                answer_text.append("")
                answer_start.append(0)
            else:
                answer_text.append(current_answer[0]["text"])
                answer_start.append(current_answer[0]["answer_start"])

            answer_is_impossible.append(current_qa_pair['is_impossible'])
            context.append(current_para['context'])

qas = {'title': title_count,
       'question_text': question_text,
       'question_id': question_id,
       'answer_text': answer_text,
       'answer_start': answer_start,
       'answer_is_impossible': answer_is_impossible,
       'context': context
       }

qas_frame = pd.DataFrame(qas)

print(qas_frame.shape)

qas_frame.to_csv(r'./dev_qas.csv')

"""
path in mac and unix:
a / separates elements of the path, 
. as a path element always means the directory indicated by preceding path, 
and .. as a path element always means the parent of the directory indicated by the preceding path. 
A leading ~ in a path is not treated specially, but expand-user-path 
can be used to convert a leading ~ element to a user-specific directory.
"""
