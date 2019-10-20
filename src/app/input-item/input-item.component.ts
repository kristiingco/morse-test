declare var require: any;
import { Component, OnInit, Input } from '@angular/core';
import { QuestionService } from '../question.service';
const morsify = require('morsify');

@Component({
  selector: 'app-input-item',
  templateUrl: './input-item.component.html',
  styleUrls: ['./input-item.component.scss']
})
export class InputItemComponent implements OnInit {

  @Input() visible: boolean;
  numberOfItems = 1;
  items = [];
  word: string = this.items[0];
  score = 0;
  showButton = false;

  constructor(private questionService: QuestionService) { }

  ngOnInit() {
    this.questionService.getInputQuestions().subscribe((data: any[]) => {
      console.log(data);
      this.items = data;
      this.word = this.items[0].question;
      console.log(this.word);
    });
  }

  onKey(event) {
    const inputValue = event.target.value;
    const decode = morsify.decode(inputValue);
    for (let i = 0; i < decode.length; i++) {
      if (decode[i] === this.word[i]) {
        this.score += 1;
      }
    }
    if (this.numberOfItems < this.items.length) {
      this.word = this.items[this.numberOfItems].question;
      this.numberOfItems++;
    } else {
      this.visible = false;
      this.showButton = true;
    }

    event.target.value = '';
  }

}
