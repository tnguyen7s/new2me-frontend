import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { PostCardComponent } from './post-card/post-card.component';
import { NoPostsComponent } from '../shared/no-posts/no-posts.component';


@NgModule({
  declarations: [
    HomeComponent,
    PostCardComponent,
    NoPostsComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
    MatPaginatorModule,
  ]
})
export class HomeModule { }
