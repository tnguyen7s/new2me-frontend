import { Component, OnDestroy, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { Subscription, take } from 'rxjs';
import { Post } from '../shared/models/post.model';
import { PostService } from '../post/posts.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  // all posts
  public posts: Post[];

  // how many to display per page
  public pageSize = 8;

  // current page index
  public pageIndex = 0;

  sub1: Subscription;
  sub2: Subscription;

  constructor(public route: ActivatedRoute, public postService: PostService) {
  }

  /**
   * 1. Listen to any change in the route's query params
   */
  ngOnInit(): void {
    this.sub1 = this.route.queryParams.subscribe((param)=>{
      // filter the list of item posts in the Home page

      const by = Object.keys(param);
      if (by.includes('keyword')){
        console.log('on filter by keyword', param);
        // filter by keyword


      }
      else if (by.includes('tag')){
        console.log('on filter by tag', param);
        // filter by tag
      }
    });

    // get all posts from postService
    this.sub2 = this.postService.homePosts.subscribe(data => {
      this.posts = data;
    })
  }

  ngOnDestroy(): void {
    this.sub1.unsubscribe();
    this.sub2.unsubscribe();
  }

}
