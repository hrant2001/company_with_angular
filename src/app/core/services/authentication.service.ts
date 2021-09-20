import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserRequest } from '../interfaces/user-request';
import { UserResponse } from '../interfaces/user-response';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  public foundUser = {} as UserResponse;

  private isValidUser = false;
  constructor(private userService: UserService) { }

  public getUser(user: UserRequest): void {
    this.userService.getUserAuthorization(user).subscribe(
      (response: UserResponse) => {
        this.foundUser = response;
      },
      (error: HttpErrorResponse) => {
        if (error.status == 403) {
          alert("Incorrect login or password")
        }
        else {
          alert("Something went wrong with the server " + error.message);
        }
      });
  }

  authenticate(user: UserRequest) {
    this.getUser(user);
    console.log(this.foundUser);

    if (this.foundUser.token) {
      sessionStorage.setItem('token', this.foundUser.token)
      console.log('In authenticate, token is', this.foundUser.token);
      
      this.isValidUser = true;
      console.log("Is valid?", this.isValidUser);
    }
    console.log("In authenticate", this.foundUser);
    return this.isValidUser;
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem('token')
    return !(user === null)
  }

  logOut() {
    sessionStorage.removeItem('token')
  }
}