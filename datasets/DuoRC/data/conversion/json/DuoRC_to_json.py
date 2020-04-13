import json

'''
{
    "title": ...,
    "context": ...,
    "qa": [
        {
            "question": ...,
            "id": ...,
            "answers": [
                {
                    "text": ...
                }],
            "unanswerable": ...
        }],
}

'''

file = open("../../SelfRC_train.json.txt", "r")
old_data = json.load(file)

new_data = []

for row in old_data:
    context = row["plot"]
    title = row["title"]
    qa_pair = row["qa"]
    qas = []
    for qa in qa_pair:
        id = qa["id"]
        question = qa["question"]
        answers = qa["answers"]
        unanswerable = qa["no_answer"]
        qas.append({
            'question': question,
            'id': id,
            'answers': answers,
            'unanswerable': unanswerable
        })

    new_data.append({
        'title': title,
        'context': context,
        'qa': qas
    })


with open('train_qas.json', 'w') as outfile:
    json.dump(new_data, outfile)

