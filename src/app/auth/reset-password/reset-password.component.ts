import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AppDialogComponent } from 'src/app/shared/dialogs/app-dialog/app-dialog.component';
import { ErrorMessageEnum } from 'src/app/shared/enums/ErrorMessageEnum';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit, OnDestroy{
  @ViewChild('form') form: NgForm;

  private strongRegex:RegExp = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})");
  protected strongPassRequirements:string = "Your password must have at least: *8 characters \ *1 uppercase letter \ *1 lowercase letter \ *1 digit"
  protected errorMsg: ErrorMessageEnum;
  protected validPass:boolean = true;

  private token: string;


  private sub: Subscription;

  constructor(private authService: AuthService,
              private route: ActivatedRoute,
              private router: Router,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.token = this.route.snapshot.queryParams["token"];
    console.log('reset-password', this.token);
  }


  private openDialog(message: string){
    this.dialog.open(AppDialogComponent, {
      data: {
        message: message
      }
    })
  }

  protected onResetPassword(){
    const {password, repassword} = this.form.value;
    this.validatePassword(password, repassword);

    if (this.validPass){
     this.sub = this.authService.resetPassword(password, this.token)
                      .subscribe(
                        (resData)=>{
                          console.log('on reset password', resData);
                          this.openDialog('Your password has been reset.');
                          this.router.navigate(['auth', 'login']);
                        },
                        (error)=>{
                          console.log('on reset password', error);
                          if (error.status==400){
                            this.errorMsg = error.error;
                          }
                        }
                      );
    }
  }

    /**
   * validate password and set error msg if any
   * @param password
   * @param repassword
   * @returns true for secure password and false for insecure password
   */
    private validatePassword(password:string, repassword: string){
      if (!this.strongRegex.test(password)){
        this.errorMsg = ErrorMessageEnum.InsecurePass;
        this.validPass = false
      }
      else if (password!=repassword){
        this.errorMsg = ErrorMessageEnum.UnmatchedPass;
        this.validPass = false;
      }
      else{
        this.validPass = true;
        this.errorMsg = null;
      }
    }

    ngOnDestroy(): void {
        if (this.sub){
          this.sub.unsubscribe();
        }
    }
}
