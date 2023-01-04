import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { UserPostsComponent } from './user-posts/user-posts.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserComponent } from './user.component';

const routes: Routes = [{ path: '', component: UserComponent,canActivate: [AuthGuard],
                          children: [
                            {path: "", redirectTo: "profile", pathMatch: "full"},
                            {path: "profile", component: UserProfileComponent, canActivate: [AuthGuard]}, // implement canActivate
                            {path: "posts", component: UserPostsComponent, canActivate: [AuthGuard]} // implement canActivate
                          ]
                        }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
