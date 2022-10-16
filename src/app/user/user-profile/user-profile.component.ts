import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit, OnDestroy {
  @ViewChild('userForm') userForm: NgForm;

  public editMode = {
    'username': false,
    'email': false,
    'name': false,
    'phone': false,
    'address': false
  }
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  /**
   * 1. Save user's profile
   */
  onSaveProfile(){
    console.log('onSaveProfile', this.userForm);
  }

  /**
   *1. toggle the edit mode boolean
   * @param field Field to edit
   */
  onEdit(field){
    this.editMode[field] = !this.editMode[field];
  }

  ngOnDestroy(): void {
      this.onSaveProfile();
  }

  onLogout(){
    this.authService.logout();
  }
}
