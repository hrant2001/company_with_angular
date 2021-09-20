import { Component, OnInit } from '@angular/core';
import { UserRequest } from 'src/app/core/interfaces/user-request';
import { UserResponse } from 'src/app/core/interfaces/user-response';
import { AuthenticationService } from 'src/app/core/services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public user = {} as UserResponse;
  public alo = 'asdasd';
  constructor(public loginService: AuthenticationService) {
   }

  ngOnInit() {
    this.user = this.loginService.foundUser;
  }

}