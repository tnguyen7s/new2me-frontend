import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  email: string = "";
  constructor(public router: Router) { }

  ngOnInit(): void {
  }

  /**
   * Reset password in action
   */
  onResetPassword(){
    console.log('on reset password', this.email);
  }

  /**
   * 1. Change the route back to auth/login
   */
  onBackToLogin(){
    this.router.navigate(['auth'])
  }
}
