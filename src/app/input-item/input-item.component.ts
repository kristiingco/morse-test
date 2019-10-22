declare var require: any;
import { Component, OnInit, Input } from '@angular/core';
import { QuestionService } from '../question.service';
const morsify = require('morsify');
import * as $ from 'jquery';

@Component({
  selector: 'app-input-item',
  templateUrl: './input-item.component.html',
  styleUrls: ['./input-item.component.scss']
})
export class InputItemComponent implements OnInit {

  @Input() visible: boolean;
  numberOfItems = 1;
  items = [];
  word: string;
  currentLetter;
  currentLetterIndex = 1;
  score = 0;
  showButton = false;

  constructor(private questionService: QuestionService) { }

  ngOnInit() {
    this.questionService.getInputQuestions().subscribe((data: any[]) => {
      console.log(data);
      this.items = data;
      this.word = this.items[0].question;
      this.currentLetter = this.word[0];
      console.log(this.word);
    });

    $(document).ready(function() {
      let lastKeyUpAt: Date = new Date();
      let holdOnce = true;
      let pressedDown = false;
      let elem = $('input');

      elem.on('keypress', function(e) {
        if (e.keyCode === 32) {
          elem.val(elem.val() + '.');
          e.preventDefault();
          return false;
        }
      });

      elem.keydown(function(e) {
        if (e.keyCode === 32) {
        // Set key down time to the current time
        let keyDownAt = new Date();

        setTimeout(function() {
            // Compare key down time with key up time
            if (+keyDownAt > +lastKeyUpAt) {
              if (holdOnce) {
                elem.val(elem.val() + '-');
                holdOnce = false;
              }
              pressedDown = true;
              lastKeyUpAt = new Date();

          }
            // Key has been held down for x seconds
          }, 600);

        return false;

        }
    });

      elem.keyup(function(e) {
          // Set lastKeyUpAt to hold the time the last key up event was fired
          if (e.keyCode === 32) {

          if (pressedDown) {
            pressedDown = false;
            holdOnce = true;
          } else {
            elem.val(elem.val() + '.');
          }

          lastKeyUpAt = new Date();
          return false;
        }
          });
      });
  }

  onKey(event) {
    const inputValue = event.target.value;
    const decode = morsify.decode(inputValue);
    if (this.currentLetterIndex <= this.word.length) {
      if (decode === this.currentLetter) {
        this.score += 1;
      }
      this.currentLetter = this.word[this.currentLetterIndex];
      this.currentLetterIndex++;
    }

    if (this.currentLetterIndex > this.word.length) {
      if (this.numberOfItems < this.items.length) {
        this.word = this.items[this.numberOfItems].question;
        this.currentLetter = this.word[0];
        this.currentLetterIndex = 1;
        this.numberOfItems++;
      } else {
        this.visible = false;
        this.showButton = true;
      }
    }
    event.target.value = '';
  }

}
