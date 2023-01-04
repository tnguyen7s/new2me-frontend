import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatDialogModule } from "@angular/material/dialog";
import { MatTooltipModule } from "@angular/material/tooltip";
import { NgxCaptchaModule } from "ngx-captcha";
import { AppDialogComponent } from "./dialogs/app-dialog/app-dialog.component";
import { AppYesNoDialogComponent } from "./dialogs/app-yes-no-dialog/app-yes-no-dialog.component";
import { RecapchaDialogComponent } from "./dialogs/recapcha-dialog/recapcha-dialog.component";
import { LeftNavbarComponent } from "./left-navbar/left-navbar.component";
import { LoadingSpinnerComponent } from "./loading-spinner/loading-spinner.component";

@NgModule({
  imports:      [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule,
    MatTooltipModule,
    NgxCaptchaModule,
  ],
  declarations: [
    LeftNavbarComponent,
    AppDialogComponent,
    LoadingSpinnerComponent,
    AppYesNoDialogComponent,
    RecapchaDialogComponent,
  ],
  exports:      [

    LeftNavbarComponent,
    AppDialogComponent,
    LoadingSpinnerComponent,
    AppYesNoDialogComponent,
    RecapchaDialogComponent,

    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule,
    MatTooltipModule,
    NgxCaptchaModule,
  ]
 })
 export class SharedModule { }
