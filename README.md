# MorseTest

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.0.

## Development server

Run `ng serve --open` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Setting up the Node.js Server

Run `node server.js` to start the server on localhost:8080/api/endpoint_name

## Api Documentation

### Get Questions

#### Route Details
| Route | /api/questions
|-|-
| Description | Gets all the questions based on the params
| Request Method | GET
| Request Parameters: | question_type, round
| Sample Return: | { "_id": "1", "question": "BAR", "type": "input", "round": "0", "answer": "BAR","max_score": "3"}

#### Request Parameters
| Parameter | Type | Description
|-|-|-
| question_type | string | Can be either input,audio,visual
| round | integer | Can be either 0,1,2. 0 for pre-test

#### Return Values (JSON Array)
|Key | Type | Description
|-|-|-
| _id | integer | The question id
| question | string | The question containing a string of characters
| type | string | The question type
| round | integer | The round number
| answer | string | The answer to the question

### Submit Score

#### Route Details
| Route | /api/scores
|-|-
| Description | Submits the score of a question from a user
| Request Method | POST
| Request Parameters: | question_id, user_id, score_obtained, start_timestamp, end_timestamp
| Sample Return: | {"question_id": "1", "user_id": "1", "score_obtained": "3", "wrong_answer": "", "start_timestamp": "start time", "end_timestamp": "end time", "_id": "5d9c6ad6b99fc700174ab0ff"}

#### Request Parameters
| Parameter | Type | Description
|-|-|-
| question_id | integer | The question id
| user_id | integer | The user's id in the db
| score_obtained | integer | The score the user obtained for question_id
| wrong_answer | string | OPTIONAL. The wrong answers of the user concatenated into a string.
| start_timestamp | time | The time the user started answering this question
| end_timestamp | time | The time the user finished answering this question

#### Return Values (The newly created document)
|Key | Type | Description
|-|-|-
| _id | integer | The score id
| question_id | integer | The question id
| user_id | integer | The user's id in the db
| score_obtained | integer | The score the user obtained for question_id
| wrong_answer | string | The wrong answers of the user concatenated into a string.
| start_timestamp | time | The time the user started answering this question
| end_timestamp | time | The time the user finished answering this question

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
