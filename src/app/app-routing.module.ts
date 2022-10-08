import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthComponent } from "./auth/auth/auth.component";
import { LoginComponent } from "./auth/login/login.component";
import { ResetPasswordComponent } from "./auth/reset-password/reset-password.component";
import { SignupComponent } from "./auth/signup/signup.component";
import { HomeComponent } from "./home/home.component";
import { PostDetailComponent } from "./post/post-detail/post-detail.component";
import { PostEditComponent } from "./post/post-edit/post-edit.component";
import { PostComponent } from "./post/post.component";
import { UserPostsComponent } from "./user/user-posts/user-posts.component";
import { UserProfileComponent } from "./user/user-profile/user-profile.component";
import { UserComponent } from "./user/user.component";


const routes: Routes = [
  {path: "", component: HomeComponent}, // need to implement resolver
  {path: "post", component: PostComponent, children: [
    {path: "create", component: PostEditComponent}, // implement canActivate and canDeactivate
    {path: ":id/edit", component: PostEditComponent},
    {path: ":id", component: PostDetailComponent},
  ]},
  {path: "auth", component: AuthComponent, children: [
    {path: "", redirectTo: "login", pathMatch: "full"},
    {path: "login", component: LoginComponent},
    {path: "signup", component: SignupComponent},
    {path: "reset-password", component: ResetPasswordComponent}
  ]},
  {path: "user", component: UserComponent, children: [
    {path: "", redirectTo: "profile", pathMatch: "full"},
    {path: "profile", component: UserProfileComponent}, // implement canActivate
    {path: "posts", component: UserPostsComponent} // implement canActivate
  ]}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule{

}
