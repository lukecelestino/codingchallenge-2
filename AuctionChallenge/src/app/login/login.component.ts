import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router,
              private loginService: LoginService) { }

  ngOnInit() {
  }

  onLoginMyAuctions(event) {
    const user = {
      email: event.login,
      password: event.password
    };

    this.loginService.loginUser(user).subscribe(response => {
      localStorage.setItem('access_token', response.access_token);
      localStorage.setItem('refresh_token', response.refresh_token);
      localStorage.setItem('user', user.email);
      this.router.navigate(['/home/my-auctions']);
    });
  }

}
