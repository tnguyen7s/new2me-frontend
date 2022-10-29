import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @ViewChild('loginForm') loginForm: NgForm;

  validLogin = true;
  loading = false;

  constructor(public router: Router, public authService: AuthService) { }

  ngOnInit(): void {
  }

  /**
   * 1. Request AuthService to send login POST httprequest
   * 2. set this.validLogin = false if login fails
   * 3. Allow access after login succeeds
   */
  onLogin(){
    this.loading = true;
    console.log('onLogin', this.loginForm);

    const {username, password} = this.loginForm.value;

    this.authService.login(username, password)
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
  onSwitchSignUp(){
    this.router.navigate(['auth', 'signup']);
  }

  /**
   * 1. Switch the route to auth/reset-password
   */
  onSwitchResetPassword(){
    this.router.navigate(['auth', 'reset-password'])
  }
}
