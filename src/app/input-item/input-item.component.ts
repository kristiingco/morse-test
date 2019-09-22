import { Component, OnInit, Input } from '@angular/core';

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

  constructor() { }

  ngOnInit() {
  }

  onKey(event) {
    const inputValue = event.target.value;
    for (let i = 0; i < inputValue.length; i++) {
      if (inputValue[i] === this.word[i]) {
        this.score += 1;
      }
    }
    if (this.numberOfItems < 5) {
      this.word = this.otherItems[this.numberOfItems];
      this.numberOfItems++;
    } else {
      this.visible = false;
    }

    event.target.value = '';
  }

}
