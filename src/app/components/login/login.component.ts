import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserRequest } from 'src/app/core/interfaces/user-request';
import { AuthenticationService } from 'src/app/core/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username = ''
  password = ''
  validLogin = false

  constructor(private router: Router,
    private loginService: AuthenticationService) { }

  ngOnInit(): void {
  }

  async checkLogin() {
    if (await this.loginService.authenticate({ username: this.username, password: this.password } as UserRequest)) {
      this.router.navigate([''])
      console.log("REDIRECTED");
      this.validLogin = true
    }
    else {
      console.log("NOT REDIRECTED");
    }
    return this.validLogin;
  }
}