import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from '../auth/auth/auth.component';
import { LoginComponent } from './login/login.component';
import { ResetPasswordRequestComponent } from './reset-password-request/reset-password-request.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [{ path: '', component: AuthComponent,
                          children: [
                            {path: "", redirectTo: "login", pathMatch: "full"},
                            {path: "login", component: LoginComponent},
                            {path: "signup", component: SignupComponent},
                            {path: "request-reset-password", component: ResetPasswordRequestComponent},
                            {path: "reset-password", component: ResetPasswordComponent}
                          ]
                        }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
