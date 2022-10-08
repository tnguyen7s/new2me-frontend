import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';



import { AppComponent } from './app.component';
import { LeftNavbarComponent } from './shared/left-navbar/left-navbar.component';
import { AuthComponent } from './auth/auth/auth.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { FormsModule } from '@angular/forms';
import {MatTooltipModule} from '@angular/material/tooltip';
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
import {MatTabsModule} from '@angular/material/tabs';

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
    UserPostsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    MatTooltipModule,
    MatTabsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
