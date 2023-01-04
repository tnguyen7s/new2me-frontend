import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { PostComponent } from './post.component';
import { PostRoutingModule } from './post-routing.module';
import { PostEditComponent } from './post-edit/post-edit.component';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { PostPicturesComponent } from './post-pictures/post-pictures.component';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { PostContactDialog } from './post-detail/post-contact-dialog/post-contact-dialog.component';


@NgModule({
  declarations: [
    PostComponent,
    PostEditComponent,
    PostDetailComponent,
    PostPicturesComponent,
    PostContactDialog
  ],
  imports: [
    CommonModule,
    PostRoutingModule,
    SharedModule,
    MatInputModule,
    MatSelectModule
  ]
})
export class PostModule { }
