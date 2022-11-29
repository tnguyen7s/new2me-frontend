import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit, OnDestroy {
  @ViewChild('userForm') userForm: NgForm;
  protected userProfile: User;

  protected editMode = {
    'username': false,
    'email': false,
    'name': false,
    'phone': false,
    'address': false
  }

  private sub1: Subscription;
  private sub2: Subscription;

  protected backendErrorMsg: string;
  constructor(private authService: AuthService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.sub1 = this.authService.user.subscribe(user=>{
      this.userProfile = user;
    });

  }

  /**
   * 1. Save user's profile
   */
  protected onSaveProfile(){
    this.sub2 = this.authService.updateAccount(this.userProfile)
    .subscribe(
      resData =>{
        console.log("OnSaveProfile", resData);
        this.backendErrorMsg = null;
      },
      error => {
        console.error("OnSaveProfile", error);
        this.backendErrorMsg = error.error;
      }
    );
  }

  /**
   *1. toggle the edit mode boolean
   * @param field Field to edit
   */
  protected onEdit(field){
    this.editMode[field] = !this.editMode[field];
  }

  ngOnDestroy(): void {
      this.sub1.unsubscribe();

      if (this.sub2){
        this.sub2.unsubscribe();
      }
  }
}
