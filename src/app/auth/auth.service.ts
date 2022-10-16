import { Injectable } from "@angular/core";
import {HttpClient} from "@angular/common/http"
import { User } from "../shared/models/user.model";
import { BehaviorSubject, Observable, tap } from "rxjs";

@Injectable({
  providedIn: "root"
})


export class AuthService
{
  // got user from either login or signup
  public user: BehaviorSubject<User> = new BehaviorSubject(null);
  public afterAuthRoute: string[] = ["/"];

  private timeout: any;

  constructor(private http: HttpClient){
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
   * @param username
   * @param password
   * @returns Observable<User>
   */
  public login(username: string, password: string): Observable<User>{
    return this.http.post<User>("http://localhost:5024/api/account/login", { username: username, password: password})
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
    return this.http.post<User>("http://localhost:5024/api/account/signup", { username: username, password: password, email: email})
                    .pipe(
                      tap(user => this.user.next(user))
                    );
  }
}
