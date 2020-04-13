# QA_benchmark

This repository contains the source code for project: Benchmark development for Question-Answering (QA) Systems.

The project focused on developing a benchmark for QA systems that deal with text based, closed domain question-answering. Ability to identify unanswerable questions is specially targeted.

## Repo structure 
The repository contains three parts:
- datasets: selected QA datasets as benchmark
- systems: state-of-art QA models to test the benchmark
- next-qa-front-end: frontend source code for missing information annotation system developed for next-qa

### QA dataset
Two datasets were selected as the benchmark. They are [SQuAD v2.0](https://rajpurkar.github.io/SQuAD-explorer/), [DuoRC self RC](https://duorc.github.io)  These datasets are text-based, single-turn datasets that contain unanswerable questions. Their original train, dev and test data is included.
To assist the QA model developers, the data was converted to two other formats: csv and unified json format. The unified json format is defined as below:
~~~
{
    "title": ...,
    "context": ...,
    "qas": [
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
~~~

The original evaluation script for each dataset is included as well.

#### Unanswerable analysis
Sample data was randomly selected to analyse reasons for unanwerable question. The xlsx file contains the result.

### QA models
[ALBERT](https://github.com/google-research/albert) was selected as the experiment model. preliminary experiment output can be viewed in the experiment folders. Code used for experiment is included in respective folder.

### Front-end source code
To expand unanswerable questions, follow-up questions can be asked to collect information that is necessary to answer the question. NExT++ center proposed a conversational QA dataset contains follow up questions and corresponding answers for unanswerable questions. Data annotation system will be helpful when collecting the data. The front-end directory contains the source code for the data annotation system. The system contains three main pages:
- login page: page for annotator login
- register page: page for annotator registration 
- annotation page:
   * display context and original question
   * fields for annotator to input: follow-up questions for information required to answer original question, and their answers
   * skip, next, previous button to traverse between annotation tasks

Code to enable front-end and back-end data communication is included as well.