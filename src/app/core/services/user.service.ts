import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { UserRequest } from "../interfaces/user-request";
import { UserResponse } from "../interfaces/user-response";

@Injectable({
    providedIn: 'root'
  })
  export class UserService {
  
    private apiServerUrl = environment.apiBaseUrl;
    
    constructor(private http: HttpClient) { }

    public getUserAuthorization(user: UserRequest): Observable<UserResponse> {    
        return this.http.post<UserResponse>(`${this.apiServerUrl}/auth/login`, user);
    }
}