declare var require: any;
import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { QuestionService } from '../question.service';
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
  @Input() visible: boolean;
  numberOfItems = 1;
  items = [];
  word: string;
  score = 0;
  showButton = false;
  element: HTMLImageElement;

  constructor(private questionService: QuestionService) { }

  ngOnInit() {
    this.questionService.getVisualQuestions().subscribe((data: any[]) => {
      console.log(data);
      this.items = data;
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
    const dot = 171;
    const dash = 513;

    const morse = morsify.encode(chara);
    console.log(morse);

    for (const morseChara of morse) {
      if (morseChara === '.') {
        // dot --modified
        await this.flashlight('assets/OnLight.png', 0, num);
        // show white light to show when flash is finished
        await this.flashlight('assets/OffLight.png', dot, num);
      } else {
        // dash at 3 X 60 or 180 --modified
        await this.flashlight('assets/OnLight.png', 0, num);
        // show white light to show when flash is finished
        await this.flashlight('assets/OffLight.png', dash, num);
      }
      //pause after each dot or dash --i added
      await this.flashlight('assets/OffLight.png', dot * 2, num);
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

    if (this.numberOfItems < this.items.length) {
      this.word = this.items[this.numberOfItems].question;
      console.log(this.word);
      this.numberOfItems++;
    } else {
      this.visible = false;
      this.showButton = true;
    }

  }

}
