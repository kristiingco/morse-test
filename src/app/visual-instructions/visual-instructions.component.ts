declare var require: any;
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

const morsify = require('morsify');

@Component({
  selector: 'app-visual-instructions',
  templateUrl: './visual-instructions.component.html',
  styleUrls: ['./visual-instructions.component.scss']
})
export class VisualInstructionsComponent implements OnInit {

  letter1 = new FormControl('');
  letter2 = new FormControl('');
  letters = [this.letter1, this.letter2];
  flashlights = ['flashlight1', 'flashlight2'];
  visible = true;
  numberOfItems = 1;
  items = ['HE', 'IN'];
  word: string = this.items[0];
  element: HTMLImageElement;

  constructor() { }

  ngOnInit() {
  }

  async transmit(event, chara, num) {
    // time = 1200 / words per minute
    // 20 words per minute
    // follows a 3 to 1 ratio
    // 60 milliseconds for one dot
    // 180 milliseconds for a dash
    // multiplied by factor of 4 to slow it down here
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
    if (this.numberOfItems < this.items.length) {
      this.word = this.items[this.numberOfItems];
      this.numberOfItems++;
      console.log(this.word);
    } else {
      this.visible = false;
    }

    this.letter1.setValue('');
    this.letter2.setValue('');

  }

}
