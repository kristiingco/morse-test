declare var require: any;
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

const morsify = require('morsify');

@Component({
  selector: 'app-audio-instructions',
  templateUrl: './audio-instructions.component.html',
  styleUrls: ['./audio-instructions.component.scss']
})
export class AudioInstructionsComponent implements OnInit {

  letter1 = new FormControl('');
  letter2 = new FormControl('');
  letters = [this.letter1, this.letter2];
  visible = true;
  done = [];
  numberOfItems = 1;
  items = ['DO', 'EA'];
  word: string = this.items[0];

  constructor() { }

  ngOnInit() {
  }

  playAudio(event, chara) {
    if (!this.done.includes(chara)) {
      const audio = morsify.audio(chara, { unit: 0.171 });
      audio.play();
      this.done.push(chara);
    }
  }

  nextWord(event) {
    if (this.numberOfItems < this.items.length) {
      this.word = this.items[this.numberOfItems];
      this.numberOfItems++;
    } else {
      this.visible = false;
    }

    this.done = [];
    this.letter1.setValue('');
    this.letter2.setValue('');
  }

}
