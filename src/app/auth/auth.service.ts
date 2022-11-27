import { Injectable } from "@angular/core";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http"
import { User } from "../shared/models/user.model";
import { BehaviorSubject, Observable, Subscription, tap } from "rxjs";
import { Router } from "@angular/router";
import { environment } from "src/environments/environment";
import { ApiEnum } from "../shared/enums/ApiEnum";

@Injectable({
  providedIn: "root"
})


export class AuthService
{
  private baseUrl = environment.baseUrl;

  // got user from either login or signup
  public user: BehaviorSubject<User> = new BehaviorSubject(null);
  public afterAuthRoute: string[] = ["/"];


  private timeout: any;

  constructor(private http: HttpClient, private router: Router){
    // once login or sign up, save new user to the local storage and call auto logout
    this.user.subscribe(user => {
      if (user){
        localStorage.setItem("new2me_user", JSON.stringify(user));
        this.autoLogout();
      }
    });
  }


  public autoLogout(){
    let expires = this.user.getValue().expires - Date.now();
    console.log("autoLogout after", expires);

    this.timeout = setTimeout(() => {
      this.logout();
    }, expires);
  }

  /**
   * Clear local storage
   * set User null
   * Clear timeout
   */
  public logout(){
    localStorage.removeItem("new2me_user");
    this.user.next(null);

    if (this.timeout){
      clearTimeout(this.timeout);
    }

    this.router.navigate(['auth']);
  }


  /**
   * 1. Get user data from the local storage
   * 2. if user exists and now does not pass expires, login passes
   * 3. Call autologout to logout
   * Called by app.component.ts
   */
  public autoLogin(){
    const user: User = JSON.parse(localStorage.getItem("new2me_user"));
    if (user && +user.expires > Date.now()){
      this.user.next(user);
    }
  }

  /**
   * 1. Send POST api/account/login
   * 2. Set the user to be the one got from the httpResponse
   * @param usernameOrEmail
   * @param password
   * @returns Observable<User>
   */
  public login(usernameOrEmail: string, password: string): Observable<User>{
    return this.http.post<User>(this.baseUrl+ApiEnum.Login, { usernameOrEmail: usernameOrEmail, password: password})
                    .pipe(
                      tap(user => this.user.next(user))
                    );
  }

  /**
   * 1. Send POST api/account/signup
   * 2. Set the user to be the one got from the httpResponse
   * @param username
   * @param password
   * @param email
   * @returns Observable<User>
   */
  public signup(username: string, password: string, email: string): Observable<User>{
    return this.http.post<User>(this.baseUrl + ApiEnum.SignUp, { username: username, password: password, email: email})
                    .pipe(
                      tap(user => this.user.next(user))
                    );
  }

  public updateAccount(user: User){
    return this.http.put<User>(this.baseUrl + ApiEnum.Account, user)
          .pipe(
            tap(user => this.user.next(user))
          )
          .subscribe(
            resData =>{
              console.log("OnSaveProfile", resData);
            },
            error => {
              console.error("OnSaveProfile", error);
            }
          );
  }


  public requestResetPassword(email: string){
    return this.http.get(this.baseUrl + ApiEnum.RequestReset + email);
  }

  public resetPassword(password: string, token: string){
    return this.http.post<User>(this.baseUrl + ApiEnum.ResetPassword,
                                {password: password},
                                {headers: new HttpHeaders().append("Authorization", "Bearer "+token)});
  }
}
