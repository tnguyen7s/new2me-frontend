import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from '../dialog-message.interface';

@Component({
  selector: 'app-recapcha-dialog',
  templateUrl: './recapcha-dialog.component.html',
  styleUrls: ['./recapcha-dialog.component.css']
})
export class RecapchaDialogComponent {
  protected formGroup: FormGroup;
  protected siteKey: string = "6LcL8OEiAAAAALGG0og06qfongqZ_gmC9RbIcR1d";
  protected capchaSucceeded = false;

  constructor(public DialogRef: MatDialogRef<RecapchaDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData, private formBuilder: FormBuilder){
    this.DialogRef.addPanelClass('animated');
    this.DialogRef.addPanelClass('bounceInUp');

    this.formGroup = this.formBuilder.group({
      recaptcha: ['', Validators.required]
    })
  }

  handleSuccess(e){
    this.capchaSucceeded = true;
  }

  onClose(){
    this.DialogRef.close(this.capchaSucceeded);
  }
}
