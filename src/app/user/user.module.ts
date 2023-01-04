import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { UserComponent } from './user.component';
import { UserRoutingModule } from './user-routing.module';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserPostsComponent } from './user-posts/user-posts.component';
import { UserPostCardComponent } from './user-posts/user-post-card/user-post-card.component';
import { MatTabsModule } from '@angular/material/tabs';


@NgModule({
  declarations: [
    UserComponent,
    UserProfileComponent,
    UserPostsComponent,
    UserPostCardComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule,
    MatTabsModule,
  ]
})
export class UserModule { }
