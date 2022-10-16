import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { map, Observable, take } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: "root"
})
export class AuthGuard implements CanActivate
{

  constructor(private authService: AuthService, private router: Router){}

  /**
   * to guard certain pages
   * 1. take 1 from user
   * 2. if it is not null, user has logined, allow access
   * 3. otherwise, redirect to /auth
   * @param route
   * @param state
   * @returns Observable<UrlTree> or Observable<boolean>
   */
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.authService.user.pipe(
      (
        take(1),
        map(user=>{
          return user? true: this.router.parseUrl("/auth");
        })
      )
    );
  }
}
