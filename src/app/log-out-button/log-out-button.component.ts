import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-log-out-button',
  templateUrl: './log-out-button.component.html',
  styleUrls: ['./log-out-button.component.scss']
})
export class LogOutButtonComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  logOut() {
    localStorage.removeItem('user_id');
  }

}
