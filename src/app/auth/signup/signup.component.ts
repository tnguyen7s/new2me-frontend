import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ErrorMessageEnum } from 'src/app/shared/enums/ErrorMessageEnum';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  @ViewChild('signUpForm') signUpForm: NgForm;

  validForm = true;
  errorMsg = "";
  strongRegex:RegExp = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})");
  strongPassRequirements = "Your password must have at least: *8 characters \ *1 uppercase letter \ *1 lowercase letter \ *1 digit"

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
    console.log("onSignUp", this.signUpForm);

    const {username, password, repassword, email} = this.signUpForm.value;

    // validate the form value
    this.validForm = this.validatePassword(password, repassword)

    // sign up in action
    if (this.validForm){
      this.authService.signup(username, password, email)
                      .subscribe(
                        (resData) =>{
                          console.log("onSignup", resData)
                          this.router.navigate(this.authService.afterAuthRoute);
                        },
                        (error) => {
                          console.log("onSignup", error['error'])
                          this.validForm = false;
                          this.errorMsg = error['error'];
                        }
                      )
    }
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

    if (!this.strongRegex.test(password)){
      this.errorMsg = ErrorMessageEnum.InsecurePass;
      return false;
    }

    return true;
  }

  /**
   * 1. switch to login route
   */
  onSwitchToLogin(){
    this.router.navigate(['auth']);
  }

}
