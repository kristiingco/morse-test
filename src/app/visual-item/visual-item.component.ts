declare var require: any;
import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { QuestionService } from '../question.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const morsify = require('morsify');

@Component({
  selector: 'app-visual-item',
  templateUrl: './visual-item.component.html',
  styleUrls: ['./visual-item.component.scss']
})
export class VisualItemComponent implements OnInit {

  letter1 = new FormControl('');
  letter2 = new FormControl('');
  letter3 = new FormControl('');
  letter4 = new FormControl('');
  letter5 = new FormControl('');
  letters = [this.letter1, this.letter2, this.letter3, this.letter4, this.letter5];
  flashlights = ['flashlight1', 'flashlight2', 'flashlight3', 'flashlight4', 'flashlight5'];
  done = [];
  @Input() visible: boolean;
  numberOfItems = 1;
  items = [];
  word: string;
  score = 0;
  showButton = false;
  element: HTMLImageElement;
  startTime = new Date().toLocaleTimeString();
  endTime;

  constructor(private questionService: QuestionService, private httpClient: HttpClient) { }

  ngOnInit() {
    this.questionService.getVisualQuestions().subscribe((data: any[]) => {
      console.log(data);
      this.items = data;
      const currentQuestion = localStorage.getItem('question_id');
      if ([4].includes(parseInt(currentQuestion))) {
        this.word = this.items[this.numberOfItems].question;
        this.numberOfItems++;
      } else {
        this.word = this.items[0].question;
      }
      this.word = this.items[0].question;
      console.log(this.word);
    });
  }

  async transmit(event, chara, num) {
    // time = 1200 / words per minute
    // 20 words per minute
    // follows a 3 to 1 ratio
    // 60 milliseconds for one dot
    // 180 milliseconds for a dash
    // multiplied by factor of 4 to slow it down here
    if (!this.done.includes(num)) {
      const dot = 171;
      const dash = 513;
  
      const morse = morsify.encode(chara);
      console.log(morse);
  
      for (const morseChara of morse) {
        if (morseChara === '.') {
          // dot --modified
          await this.flashlight('https://i.imgur.com/3sJr50R.png', 0, num);
          // show white light to show when flash is finished
          await this.flashlight('https://i.imgur.com/g7PUAYI.png', dot, num);
        } else {
          // dash at 3 X 60 or 180 --modified
          await this.flashlight('https://i.imgur.com/3sJr50R.png', 0, num);
          // show white light to show when flash is finished
          await this.flashlight('https://i.imgur.com/g7PUAYI.png', dash, num);
        }
        //pause after each dot or dash --i added
        await this.flashlight('https://i.imgur.com/g7PUAYI.png', dot * 2, num);
      }
      this.done.push(num);
    }
    

  }

  flashlight(image: string, time: any, num: number): Promise<any> {
    return new Promise(resolve => {
      setTimeout(() => {
        const id = 'flashlight' + num;
        console.log(id);
        (<HTMLImageElement>document.getElementById(id)).src = image;
        resolve(true);
      }, time);
    });
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

    this.startTime = new Date().toLocaleTimeString();

    const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');

    this.httpClient.post<any>('https://morse-test.herokuapp.com/api/scores', JSON.stringify(data), {headers})
      .subscribe(res => console.log(res));

    if (this.numberOfItems < this.items.length) {
      this.word = this.items[this.numberOfItems].question;
      localStorage.setItem('question_id', this.items[this.numberOfItems]._id);
      this.numberOfItems++;
      console.log(this.word);
      this.score = 0;
    } else {
      localStorage.setItem('question_id', (localStorage.getItem('question_id') + 1));
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

}
