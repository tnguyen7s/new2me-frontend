import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "src/app/auth/auth.service";

@Injectable({
  providedIn: "root"
})
export class InterceptorService implements HttpInterceptor{
  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute){
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if(!this.authService.user.value){
      return next.handle(req);
    }

    // if the token has not been expired
    if (this.authService.user.value.token!=null){
      const newReq = req.clone({headers: new HttpHeaders({"Authorization": "Bearer "+this.authService.user.value.token})});
      return next.handle(newReq);
    }

    return next.handle(req);
  }
}
