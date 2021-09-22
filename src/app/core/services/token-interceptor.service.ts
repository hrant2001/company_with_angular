import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthenticationService } from "./authentication.service";

@Injectable()
export class TokenInterceptor implements HttpInterceptor{
    constructor(private auth: AuthenticationService) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      if (req.url === "http://localhost:8080/auth/login") {
            return next.handle(req);
        }

        console.log("In TOken interceptor", sessionStorage.getItem('token'));
        
        req = req.clone({
            setHeaders: {
                Authorization: `Bearer_${sessionStorage.getItem('token')}`     
            }
        })

        return next.handle(req);
    }
}