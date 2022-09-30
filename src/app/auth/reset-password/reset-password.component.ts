import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  email: string = "";
  constructor() { }

  ngOnInit(): void {
  }

  /**
   * Reset password in action
   */
  onResetPassword(){
    console.log('on reset password', this.email);
  }
}
