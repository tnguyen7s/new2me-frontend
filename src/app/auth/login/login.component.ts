import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserLoginModel } from 'src/app/shared/models/user-login.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @ViewChild('loginForm') loginForm: NgForm;

  dummy_user = {
    username: "tnguyen7s",
    password: "hanh312$"
  }

  userLoginData: UserLoginModel;
  validLogin = true;

  constructor() { }

  ngOnInit(): void {
  }

  onLogin(){
    console.log('onLogin', this.loginForm);

    // validate login
    const {username, password} = this.loginForm.value;

    if (this.validateLogin(username, password)){
      this.validLogin = false;
    }
    else{

    }

  }

  /**
   *
   * @param username
   * @param password
   * @returns true if login succeeds and false if login fails
   */
  validateLogin(username: string, password: string){
    return username!=this.dummy_user.username || password!=this.dummy_user.password
  }

  onSwitchSignUp(){

  }

  onSwitchResetPassword(){

  }
}
