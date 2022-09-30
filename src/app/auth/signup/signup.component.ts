import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ErrorMessageEnum } from 'src/app/shared/enums/ErrorMessageEnum';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  @ViewChild('signUpForm') signUpForm: NgForm;
  dummyExistingUserName = "tnguyen7s";

  validForm = true;
  errorMsg = "";
  strongRegex:RegExp = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})");
  strongPassRequirements = "Your password must have at least: *8 characters \ *1 uppercase letter \ *1 lowercase letter \ *1 digit"

  constructor() {

  }

  ngOnInit(): void {

  }

  onSignUp(){
    console.log("onSignUp", this.signUpForm);

    const {username, password, repassword, email} = this.signUpForm.value;

    // validate the form value
    this.validForm = this.validatePassword(password, repassword) && this.validateUsername(username);

    // sign up in action
    if (this.validForm){
      console.log('Signup succeed!')
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
   *validate usernam and set error msg if any
   * @param username
   * @returns true for unique username, and false for existing username
   */
  validateUsername(username: string): boolean{
    if (username==this.dummyExistingUserName){
      this.errorMsg = ErrorMessageEnum.NonuniqueUsername;
      return false;
    }

    return true;
  }



}
