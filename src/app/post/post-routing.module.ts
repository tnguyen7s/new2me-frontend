import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { PostEditComponent } from './post-edit/post-edit.component';
import { PostComponent } from './post.component';


const routes: Routes = [{ path: '', component: PostComponent,
                          children: [
                            {path: "create", component: PostEditComponent, canActivate: [AuthGuard]}, // implement canActivate and canDeactivate
                            {path: ":id/edit", component: PostEditComponent, canActivate: [AuthGuard]},
                            {path: ":idx", component: PostDetailComponent},
                          ]
                        }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostRoutingModule { }
