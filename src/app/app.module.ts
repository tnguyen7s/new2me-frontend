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
import { PostCardComponent } from './shared/post-card/post-card.component';


import {MatTooltipModule} from '@angular/material/tooltip';
import {MatTabsModule} from '@angular/material/tabs';
import {MatSelectModule} from '@angular/material/select';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatInputModule} from '@angular/material/input';
import {MatDialogModule} from '@angular/material/dialog';
import {MatPaginatorModule} from '@angular/material/paginator';
import { NotFoundComponent } from './shared/not-found/not-found.component';




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
    NotFoundComponent
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
    MatPaginatorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
