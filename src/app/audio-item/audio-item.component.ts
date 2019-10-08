declare var require: any;
import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
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
  @Input() visible: boolean;
  numberOfItems = 1;
  otherItems: Array<string> = ['EARTH', 'DINOS', 'STARE', 'TEASE', 'DARTS'];
  word: string = this.otherItems[0];
  score = 0;
  showButton = false;

  constructor() { }

  ngOnInit() {
  }

  playAudio(event, chara) {
    const audio = morsify.audio(chara, { unit: 0.15 });
    audio.play();
  }

  nextWord(event) {
    if (this.word[0] === this.letter1.value) {
      this.score += 1;
    }

    if (this.word[1] === this.letter2.value) {
      this.score += 1;
    }

    if (this.word[2] === this.letter3.value) {
      this.score += 1;
    }

    if (this.word[3] === this.letter4.value) {
      this.score += 1;
    }

    if (this.word[4] === this.letter5.value) {
      this.score += 1;
    }

    this.letter1.setValue('');
    this.letter2.setValue('');
    this.letter3.setValue('');
    this.letter4.setValue('');
    this.letter5.setValue('');

    if (this.numberOfItems < 5) {
      this.word = this.otherItems[this.numberOfItems];
      this.numberOfItems++;
    } else {
      this.visible = false;
      this.showButton = true;
    }

  }

}
