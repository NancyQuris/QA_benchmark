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

file = open("../../train-v2.0.json", "r")
old_data = json.load(file)

new_data = []

for row in old_data["data"]:
    title = row["title"]
    paragraphs = row["paragraphs"]
    for paragraph in paragraphs:
        qa_pair = paragraph["qas"]
        qas = []
        for qa in qa_pair:
            id = qa["id"]
            question = qa["question"]
            answers = []
            for answer in qa["answers"]:
                current_text = answer["text"]
                # current_answer_start = answer["answer_start"]
                answers.append(current_text)
            unanswerable = qa["is_impossible"]

            qas.append({
                'question': question,
                'id': id,
                'answers': answers,
                'unanswerable': unanswerable
            })
        context = paragraph["context"]

        new_data.append({
            'title': title,
            'context': context,
            'qa': qas
        })


with open('train_qas.json', 'w') as outfile:
    json.dump(new_data, outfile)

