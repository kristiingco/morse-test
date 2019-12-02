declare var require: any;
import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { QuestionService } from '../question.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const morsify = require('morsify');

@Component({
  selector: 'app-audio-item',
  templateUrl: './audio-item.component.html',
  styleUrls: ['./audio-item.component.scss']
})
export class AudioItemComponent implements OnInit {

  letter1 = new FormControl('');
  letter2 = new FormControl('');
  letter3 = new FormControl('');
  letter4 = new FormControl('');
  letter5 = new FormControl('');
  letters = [this.letter1, this.letter2, this.letter3, this.letter4, this.letter5];
  done = [];
  @Input() visible: boolean;
  numberOfItems = 1;
  items = [];
  word: string;
  score = 0;
  showButton = false;
  counter = 0;
  startTime = new Date().toLocaleTimeString();
  endTime;

  constructor(private questionService: QuestionService, private httpClient: HttpClient) { }

  ngOnInit() {
    let round = parseInt(localStorage.getItem('round'));

    this.questionService.getAudioQuestions(round).subscribe((data: any[]) => {
      console.log(data);
      this.items = data;
      const currentQuestion = localStorage.getItem('question_id');
      for (let i = 0; i < data.length; i++) {
        if (data[i]._id === currentQuestion) {
          this.word = data[i].question;
          this.numberOfItems = i + 1;
        }
      }
      console.log(this.word);
    });
  }

  playAudio(event, chara) {
    if (!this.done.includes(chara)) {
      const audio = morsify.audio(chara, { unit: 0.171 });
      audio.play();
      this.done.push(chara);
    }
  }

  nextWord(event) {
    if (this.word[0] === this.letter1.value.toUpperCase()) {
      this.score += 1;
    }

    if (this.word[1] === this.letter2.value.toUpperCase()) {
      this.score += 1;
    }

    if (this.word[2] === this.letter3.value.toUpperCase()) {
      this.score += 1;
    }

    if (this.word[3] === this.letter4.value.toUpperCase()) {
      this.score += 1;
    }

    if (this.word[4] === this.letter5.value.toUpperCase()) {
      this.score += 1;
    }

    const values = [this.letter1.value.toUpperCase(), this.letter2.value.toUpperCase(), this.letter3.value.toUpperCase(), this.letter4.value.toUpperCase(), this.letter5.value.toUpperCase()];

    let userId = localStorage.getItem('user_id');

    const data = {
      question_id: this.items[this.numberOfItems - 1]._id,
      user_id: userId.toString(), // alter after login api
      score_obtained: this.score.toString(),
      wrong_answer: (this.score !== this.word.length ? values.join('') : null),
      start_timestamp: this.startTime,
      end_timestamp: new Date().toLocaleTimeString()
    };

    console.log(data);

    this.startTime = new Date().toLocaleTimeString();

    const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');

    this.httpClient.post<any>('https://morse-test.herokuapp.com/api/scores', JSON.stringify(data), {headers})
      .subscribe(res => console.log(res));

    if (this.numberOfItems < this.items.length) {
      this.word = this.items[this.numberOfItems].question;
      localStorage.setItem('question_id', this.items[this.numberOfItems]._id);
      this.numberOfItems++;
      this.score = 0;
    } else {
      let question = parseInt(localStorage.getItem('question_id'));
      localStorage.setItem('question_id', (question + 1).toString());
      console.log(localStorage.getItem('question_id'));
      this.visible = false;
      this.showButton = true;
    }

    this.done = [];
    this.letter1.setValue('');
    this.letter2.setValue('');
    this.letter3.setValue('');
    this.letter4.setValue('');
    this.letter5.setValue('');

  }

  logOut() {
    localStorage.removeItem('user_id');
  }

}
