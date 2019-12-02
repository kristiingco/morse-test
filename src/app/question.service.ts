import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  questionUrl = 'https://morse-test.herokuapp.com/api/questions';

  constructor(private httpClient: HttpClient) { }

  public getInputQuestions(round) {
    return this.httpClient.get(this.questionUrl + '?round=' + round + '&question_type=input');
  }

  public getAudioQuestions(round) {
    return this.httpClient.get(this.questionUrl + '?round=' + round + '&question_type=audio');
  }

  public getVisualQuestions(round) {
    return this.httpClient.get(this.questionUrl + '?round=' + round + '&question_type=visual');
  }
}
