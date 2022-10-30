import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';



import { AppComponent } from './app.component';
import { LeftNavbarComponent } from './shared/left-navbar/left-navbar.component';
import { AuthComponent } from './auth/auth/auth.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { FormsModule } from '@angular/forms';
import { PostEditComponent } from './post/post-edit/post-edit.component';
import { PostPicturesComponent } from './post/post-pictures/post-pictures.component';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { PostComponent } from './post/post.component';
import { PostDetailComponent } from './post/post-detail/post-detail.component';
import { UserComponent } from './user/user.component';
import { UserProfileComponent } from './user/user-profile/user-profile.component';
import { UserPostsComponent } from './user/user-posts/user-posts.component';
import { PostContactDialog } from './post/post-detail/post-contact-dialog/post-contact-dialog.component';
import { PostCardComponent } from './home/post-card/post-card.component';


import {MatTooltipModule} from '@angular/material/tooltip';
import {MatTabsModule} from '@angular/material/tabs';
import {MatSelectModule} from '@angular/material/select';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatInputModule} from '@angular/material/input';
import {MatDialogModule} from '@angular/material/dialog';
import {MatPaginatorModule} from '@angular/material/paginator';
import { NotFoundComponent } from './not-found/not-found.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterceptorService } from './auth/interceptor.auth';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { UserPostCardComponent } from './user/user-posts/user-post-card/user-post-card.component';
import { AppDialogComponent } from './shared/dialogs/app-dialog/app-dialog.component';
import { AppYesNoDialogComponent } from './shared/dialogs/app-yes-no-dialog/app-yes-no-dialog.component';




@NgModule({
  declarations: [
    AppComponent,
    LeftNavbarComponent,
    AuthComponent,
    LoginComponent,
    SignupComponent,
    PostEditComponent,
    PostPicturesComponent,
    ResetPasswordComponent,
    HomeComponent,
    PostComponent,
    PostDetailComponent,
    UserComponent,
    UserProfileComponent,
    UserPostsComponent,
    PostContactDialog,
    PostCardComponent,
    NotFoundComponent,
    AppDialogComponent,
    LoadingSpinnerComponent,
    UserPostCardComponent,
    AppYesNoDialogComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    MatTooltipModule,
    MatTabsModule,
    MatSelectModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatDialogModule,
    MatPaginatorModule,
    HttpClientModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: InterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
