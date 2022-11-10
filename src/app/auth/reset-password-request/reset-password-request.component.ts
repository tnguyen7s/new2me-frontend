import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password-request.component.html',
  styleUrls: ['./reset-password-request.component.css']
})
export class ResetPasswordRequestComponent implements OnInit, OnDestroy {
  email: string = "";
  validEmail = true;
  succeeded = false;

  private sub: Subscription;
  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
  }

  /**
   * Reset password in action
   */
  onResetPassword(){
    this.sub=this.authService.requestResetPassword(this.email)
                    .subscribe(
                        (resData) => {
                          console.log('on reset password', resData);
                          this.succeeded = true;
                        },
                        (error) =>{
                          console.error('on reset password', error);
                          if (error.status==404){
                            this.validEmail = false;
                          }
                        }
                    )
  }

  /**
   * 1. Change the route back to auth/login
   */
  onBackToLogin(){
    this.router.navigate(['auth'])
  }

  ngOnDestroy(): void {
      if (this.sub){
        this.sub.unsubscribe();
      }
  }
}