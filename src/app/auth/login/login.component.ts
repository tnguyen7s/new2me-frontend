import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  @ViewChild('loginForm') loginForm: NgForm;

  protected validLogin:boolean = true;
  protected loading:boolean = false;
  private sub: Subscription;
  constructor(public router: Router, public authService: AuthService) { }

  ngOnInit(): void {
  }

  /**
   * 1. Request AuthService to send login POST httprequest
   * 2. set this.validLogin = false if login fails
   * 3. Allow access after login succeeds
   */
  protected onLogin(){
    this.loading = true;
    console.log('onLogin', this.loginForm);

    const {usernameOrEmail, password} = this.loginForm.value;

    this.sub = this.authService.login(usernameOrEmail, password)
                    .subscribe(resData => {
                      console.log("onLogin", resData);
                      this.router.navigate(this.authService.afterAuthRoute);
                      this.loading = false;
                    },
                    (error) => {
                      console.log("onLogin", error);
                      this.validLogin = false;
                      this.loading = false;
                    });
  }


  /**
   * 1. Switch the route to auth/signup
   */
  protected onSwitchSignUp(){
    this.router.navigate(['auth', 'signup']);
  }

  /**
   * 1. Switch the route to auth/reset-password
   */
  protected onSwitchResetPassword(){
    this.router.navigate(['auth', 'request-reset-password'])
  }

  ngOnDestroy(){
    if (this.sub){
      this.sub.unsubscribe();
    }
  }
}
