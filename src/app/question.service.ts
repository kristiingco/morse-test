import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  questionUrl = 'https://morse-test.herokuapp.com/api/questions';
  round = 0;

  constructor(private httpClient: HttpClient) { }

  public getInputQuestions() {
    return this.httpClient.get(this.questionUrl + '?round=' + this.round + '&question_type=input');
  }

  public getAudioQuestions() {
    return this.httpClient.get(this.questionUrl + '?round=' + this.round + '&question_type=audio');
  }

  public getVisualQuestions() {
    return this.httpClient.get(this.questionUrl + '?round=' + this.round + '&question_type=visual');
  }
}
