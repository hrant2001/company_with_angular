import { Component, OnInit } from '@angular/core';
import { UserResponse } from 'src/app/core/interfaces/user-response';
import { AuthenticationService } from 'src/app/core/services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public static user = {} as UserResponse;

  constructor(public loginService: AuthenticationService) {
  }

  get getUserFullName() {
    return HeaderComponent.user.employeeDto?.fname + " " + HeaderComponent.user.employeeDto?.lname;
  }

  ngOnInit() {
  }

}