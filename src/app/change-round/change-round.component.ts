import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-change-round',
  templateUrl: './change-round.component.html',
  styleUrls: ['./change-round.component.scss']
})
export class ChangeRoundComponent implements OnInit {

  notification = localStorage.getItem('round') === '0' ? 'You are taking the pre-test.' : 'You are taking the post-test.';

  constructor() { }

  ngOnInit() {
  }

  changeRoundtoPreTest() {
    localStorage.setItem('round', '0');
    this.notification = 'You are taking the pre-test.';
  }

  changeRoundtoPostTest() {
    localStorage.setItem('round', '1');
    this.notification = 'You are taking the post-test.';
  }

}
