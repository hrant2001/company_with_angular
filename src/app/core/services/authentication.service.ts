import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { environment } from 'src/environments/environment';
import { UserRequest } from '../interfaces/user-request';
import { UserResponse } from '../interfaces/user-response';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  public foundUser = {} as UserResponse;

  private isValidUser = false;

  private apiServerUrl = environment.apiBaseUrl;
  
  constructor(private http: HttpClient) { }

  public getAuthorizedUser(user: UserRequest): Observable<UserResponse> {    
      return this.http.post<UserResponse>(`${this.apiServerUrl}/auth/login`, user);
  }

  async authenticate(user: UserRequest) {
     await this.getAuthorizedUser(user).toPromise().then(
      (response: UserResponse) => {
        this.foundUser = response;
        console.log("IS Employee or not?", this.foundUser);
        
        HeaderComponent.user = this.foundUser;
        console.log(this.foundUser);
      },
      (error: HttpErrorResponse) => {
        if (error.status == 403) {
          alert("Incorrect login or password")
        }
        else {
          alert("Something went wrong with the server " + error.message);
        }
      });

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
    this.foundUser = {} as UserResponse;
    sessionStorage.removeItem('token');
  }
}