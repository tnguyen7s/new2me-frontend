import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { NotFoundComponent } from "./not-found/not-found.component";

const routes: Routes = [
  {path: "", loadChildren: () => import('./home/home.module').then(m => m.HomeModule)}, // need to implement resolver
  {path: "not-found", component: NotFoundComponent},
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
  { path: 'user', loadChildren: () => import('./user/user.module').then(m => m.UserModule) },
  { path: 'post', loadChildren: () => import('./post/post.module').then(m => m.PostModule) },
  {path: "**", redirectTo: "not-found"}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule{

}
