import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-start-screen',
  templateUrl: './start-screen.component.html',
  styleUrls: ['./start-screen.component.scss']
})
export class StartScreenComponent implements OnInit {

  userId = new FormControl('');
  password = new FormControl('');

  constructor(private router: Router, private httpClient: HttpClient) { }

  ngOnInit() {
    this.movePage();
  }

  goToPage(pageName: string): void {
    this.router.navigate(['${pageName}']);
  }


  movePage() {
    if (localStorage.getItem('user_id')) {
      const currentQuestion = localStorage.getItem('question_id');
      // tslint:disable-next-line: radix
      if ([1].includes(parseInt(currentQuestion))) {
        this.router.navigate(['/input-instructions']);
      // tslint:disable-next-line: radix
      } else if ([2].includes(parseInt(currentQuestion))) {
        this.router.navigate(['/input-test']);
      // tslint:disable-next-line: radix
      } else if ([3].includes(parseInt(currentQuestion))) {
        this.router.navigate(['/visual-instructions']);
      // tslint:disable-next-line: radix
      } else if ([4].includes(parseInt(currentQuestion))) {
        this.router.navigate(['/visual-test']);
      // tslint:disable-next-line: radix
      } else if ([5].includes(parseInt(currentQuestion))) {
        this.router.navigate(['/audio-instructions']);
      // tslint:disable-next-line: radix
      } else if ([6].includes(parseInt(currentQuestion))) {
        this.router.navigate(['/audio-test']);
      } else if ([7].includes(parseInt(currentQuestion))) {
        this.router.navigate(['/finish']);
      }
    }
  }

  logIn() {

    const data = {
      user_id: this.userId.value,
      password: this.password.value
    };

    const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');

    this.httpClient.post<any>('https://morse-test.herokuapp.com/api/login', JSON.stringify(data), {headers})
      .subscribe(res => {
        if (res) {
          console.log(res.question_id);
          localStorage.setItem('user_id', this.userId.value);
          localStorage.setItem('question_id', res.question_id);
          this.movePage();
        }
      });
  }

}
