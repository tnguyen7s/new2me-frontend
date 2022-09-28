import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LeftNavbarComponent } from './shared/left-navbar/left-navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    LeftNavbarComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
