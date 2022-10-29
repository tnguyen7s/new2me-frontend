import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData{
  message: String;
}

@Component({
  selector: 'app-app-dialog',
  templateUrl: './app-dialog.component.html',
  styleUrls: ['./app-dialog.component.css']
})

export class AppDialogComponent{
  constructor(public DialogRef: MatDialogRef<AppDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData){}

  onCloseDialog(){
    this.DialogRef.close();
    console.log('Closed dialog');
  }

}
