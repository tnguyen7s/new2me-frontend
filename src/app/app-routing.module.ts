import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "./auth/auth.guard";
import { AuthComponent } from "./auth/auth/auth.component";
import { LoginComponent } from "./auth/login/login.component";
import { ResetPasswordRequestComponent } from "./auth/reset-password-request/reset-password-request.component";
import { SignupComponent } from "./auth/signup/signup.component";
import { HomeComponent } from "./home/home.component";
import { PostDetailComponent } from "./post/post-detail/post-detail.component";
import { PostEditComponent } from "./post/post-edit/post-edit.component";
import { PostComponent } from "./post/post.component";
import { NotFoundComponent } from "./not-found/not-found.component";
import { UserPostsComponent } from "./user/user-posts/user-posts.component";
import { UserProfileComponent } from "./user/user-profile/user-profile.component";
import { UserComponent } from "./user/user.component";
import { ResetPasswordComponent } from "./auth/reset-password/reset-password.component";


const routes: Routes = [
  {path: "", component: HomeComponent}, // need to implement resolver
  {path: "post", component: PostComponent, children: [
    {path: "create", component: PostEditComponent, canActivate: [AuthGuard]}, // implement canActivate and canDeactivate
    {path: ":id/edit", component: PostEditComponent, canActivate: [AuthGuard]},
    {path: ":idx", component: PostDetailComponent},
  ]},
  {path: "auth", component: AuthComponent, children: [
    {path: "", redirectTo: "login", pathMatch: "full"},
    {path: "login", component: LoginComponent},
    {path: "signup", component: SignupComponent},
    {path: "request-reset-password", component: ResetPasswordRequestComponent},
    {path: "reset-password", component: ResetPasswordComponent}
  ]},
  {path: "user", component: UserComponent, canActivate: [AuthGuard], children: [
    {path: "", redirectTo: "profile", pathMatch: "full"},
    {path: "profile", component: UserProfileComponent, canActivate: [AuthGuard]}, // implement canActivate
    {path: "posts", component: UserPostsComponent, canActivate: [AuthGuard]} // implement canActivate
  ]},
  {path: "not-found", component: NotFoundComponent},
  {path: "**", redirectTo: "not-found"}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule{

}
