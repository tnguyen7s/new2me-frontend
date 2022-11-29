import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';
import { DialogData } from '../dialog-message.interface';

@Component({
  selector: 'app-recapcha-dialog',
  templateUrl: './recapcha-dialog.component.html',
  styleUrls: ['./recapcha-dialog.component.css']
})
export class RecapchaDialogComponent {
  protected formGroup: FormGroup;
  protected siteKey: string = environment.recapchaSiteKey;
  protected capchaSucceeded: boolean = false;

  constructor(public DialogRef: MatDialogRef<RecapchaDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData, private formBuilder: FormBuilder){
    this.DialogRef.addPanelClass('animated');
    this.DialogRef.addPanelClass('bounceInUp');

    this.formGroup = this.formBuilder.group({
      recaptcha: ['', Validators.required]
    })
  }

  protected handleSuccess(e){
    this.capchaSucceeded = true;
  }

  protected onClose(){
    this.DialogRef.close(this.capchaSucceeded);
  }
}
