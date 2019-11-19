import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-input-instructions',
  templateUrl: './input-instructions.component.html',
  styleUrls: ['./input-instructions.component.scss']
})
export class InputInstructionsComponent implements OnInit {

  visible = true;
  items = ['RT', 'DI'];
  word: string = this.items[0];
  currentLetterIndex = 1;
  numberOfItems = 1;
  currentLetter = this.word[0];

  constructor() { }

  ngOnInit() {
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
    if (this.currentLetterIndex <= this.word.length) {
      this.currentLetter = this.word[this.currentLetterIndex];
      this.currentLetterIndex++;
    }
    if (this.currentLetterIndex > this.word.length) {
      if (this.numberOfItems < this.items.length) {
        this.word = this.items[this.numberOfItems];
        this.currentLetter = this.word[0];
        this.currentLetterIndex = 1;
        this.numberOfItems++;
      } else {
        this.visible = false;
      }
    }
    event.target.value = '';
  }

}
