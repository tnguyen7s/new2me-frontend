import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from '../dialog-message.interface';

@Component({
  selector: 'app-app-yes-no-dialog',
  templateUrl: './app-yes-no-dialog.component.html',
  styleUrls: ['./app-yes-no-dialog.component.css']
})
export class AppYesNoDialogComponent{

  constructor(public DialogRef: MatDialogRef<AppYesNoDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData){
    this.DialogRef.addPanelClass('animated');
    this.DialogRef.addPanelClass('bounceInUp');
  }

  onCloseDialog(yes: boolean){
    this.DialogRef.close(yes);
    console.log('Closed dialog');
  }


}
