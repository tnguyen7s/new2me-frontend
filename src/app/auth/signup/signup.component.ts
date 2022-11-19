import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ErrorMessageEnum } from 'src/app/shared/enums/ErrorMessageEnum';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {
  @ViewChild('signUpForm') signUpForm: NgForm;

  loading = false;
  validForm = true;
  errorMsg = "";
  //strongRegex:RegExp = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})"); potential DOS
  strongPassRequirements = "Your password must have at least: *8 characters \ *1 uppercase letter \ *1 lowercase letter \ *1 digit"
  sub: Subscription;

  constructor(public router: Router, public authService: AuthService) {

  }

  ngOnInit(): void {

  }

  /**
   * 1. validate password: password matched and password secure
   * 2. send an http request to the server to sign up
   * 3. Allow access if signup succeeds
   */
  onSignUp(){
    this.loading = true;
    console.log("onSignUp", this.signUpForm);

    const {username, password, repassword, email} = this.signUpForm.value;

    // validate the form value
    this.validForm = this.validatePassword(password, repassword)

    // sign up in action
    if (this.validForm){
      this.sub = this.authService.signup(username, password, email)
                      .subscribe(
                        (resData) =>{
                          console.log("onSignup", resData)
                          this.router.navigate(this.authService.afterAuthRoute);
                          this.loading = false;
                        },
                        (error) => {
                          console.log("onSignup", error['error'])
                          this.validForm = false;
                          this.errorMsg = error['error'];
                          this.loading = false;
                        }
                      )
    }
    this.loading = false;
  }


  /**
   * validate password and set error msg if any
   * @param password
   * @param repassword
   * @returns true for secure password and false for insecure password
   */
  validatePassword(password:string, repassword: string): boolean{
    if (password!=repassword){
      this.errorMsg = ErrorMessageEnum.UnmatchedPass;
      return false;
    }

    if (!this.testPasswordSecurity(password)){
      this.errorMsg = ErrorMessageEnum.InsecurePass;
      return false;
    }

    return true;
  }

  /**
   * 8 characters
   * 1 uppercase letter
   * 1 lowercase letter
   * 1 digit
   */
  testPasswordSecurity(password: string): boolean{
    if (password.length<8){
      return false;
    }

    let atLeastOneUpper = false;
    let atLeastOneLower = false;
    let atLeastOneDigit = false;

    password.split('').forEach(c => {
      if (c.charCodeAt(0) >= 'A'.charCodeAt(0) && c.charCodeAt(0)<='Z'.charCodeAt(0)){
        atLeastOneUpper = true;
      }
      else if (c.charCodeAt(0)>='a'.charCodeAt(0) && c.charCodeAt(0)<='z'.charCodeAt(0)){
        atLeastOneLower = true;
      }
      else if (c.charCodeAt(0)>='0'.charCodeAt(0) && c.charCodeAt(0)<='9'.charCodeAt(0)){
        atLeastOneDigit  = true;
      }

    });

    return atLeastOneDigit && atLeastOneLower && atLeastOneUpper;
  }

  /**
   * 1. switch to login route
   */
  onSwitchToLogin(){
    this.router.navigate(['auth']);
  }

  ngOnDestroy(): void {
    if (this.sub){
      this.sub.unsubscribe();
    }
  }

}
