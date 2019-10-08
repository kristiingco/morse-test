declare var require: any;
import { Component, OnInit, Input } from '@angular/core';
const morsify = require('morsify');

@Component({
  selector: 'app-input-item',
  templateUrl: './input-item.component.html',
  styleUrls: ['./input-item.component.scss']
})
export class InputItemComponent implements OnInit {

  @Input() visible: boolean;
  numberOfItems = 1;
  otherItems: Array<string> = ['EARTH', 'DINOS', 'STARE', 'TEASE', 'DARTS'];
  word: string = this.otherItems[0];
  score = 0;
  showButton = false;

  constructor() { }

  ngOnInit() {
  }

  onKey(event) {
    const inputValue = event.target.value;
    const decode = morsify.decode(inputValue);
    for (let i = 0; i < decode.length; i++) {
      if (decode[i] === this.word[i]) {
        this.score += 1;
      }
    }
    if (this.numberOfItems < 5) {
      this.word = this.otherItems[this.numberOfItems];
      this.numberOfItems++;
    } else {
      this.visible = false;
      this.showButton = true;
    }

    event.target.value = '';
  }

}
