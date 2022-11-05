import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface ContactDialogData {
  phone: string;
  email: string;
  nameOfUser: string;
}

@Component({
  selector: 'app-post-contact-dialog',
  templateUrl: './post-contact-dialog.component.html',
  styleUrls: ['./post-contact-dialog.component.css']
})

export class PostContactDialog{
  constructor(public DialogRef: MatDialogRef<PostContactDialog>, @Inject(MAT_DIALOG_DATA) public data: ContactDialogData){
    this.DialogRef.addPanelClass('animated');
    this.DialogRef.addPanelClass('bounceInUp');
  }

  onCloseDialog(){
    this.DialogRef.close();
  }
}
