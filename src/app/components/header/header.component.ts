import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserResponse } from 'src/app/core/interfaces/user-response';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { LogoutDialogComponent } from '../logout-dialog/logout-dialog.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public static user = {} as UserResponse;

  constructor(public loginService: AuthenticationService, public dialog: MatDialog) {
  }

  get getUserFullName() {
    return HeaderComponent.user.employeeDto?.fname + " " + HeaderComponent.user.employeeDto?.lname;
  }

  ngOnInit() {
  }

  public logOut(): void {
    const user = HeaderComponent.user;
    const loggedUser = { ...user };
    this.dialog.open(LogoutDialogComponent, {
      width: '610px',
      height: '200px',
      data: loggedUser
    });
  }

}