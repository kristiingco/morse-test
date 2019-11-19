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
    if (localStorage.getItem('user_id')) {
      this.router.navigate(['/input-instructions']);
    }
  }

  goToPage(pageName: string): void {
    this.router.navigate(['${pageName}']);
  }

  logIn() {

    const data = {
      user_id: this.userId.value,
      password: this.password.value
    };

    console.log(data);

    const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');

    this.httpClient.post<any>('https://morse-test.herokuapp.com/api/login', JSON.stringify(data), {headers})
      .subscribe(res => {
        if (res) {
          this.router.navigate(['/input-instructions']);
          localStorage.setItem('user_id', this.userId.value);
        }
      });
  }

}
