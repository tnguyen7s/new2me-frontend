import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  phone: string;
  email: string;
}

@Component({
  selector: 'app-post-contact-dialog',
  templateUrl: './post-contact-dialog.component.html',
  styleUrls: ['./post-contact-dialog.component.css']
})

export class PostContactDialog{
  constructor(public DialogRef: MatDialogRef<PostContactDialog>, @Inject(MAT_DIALOG_DATA) public data: DialogData){}

  onCloseDialog(){
    this.DialogRef.close();
    console.log('Closed dialog');
  }
}