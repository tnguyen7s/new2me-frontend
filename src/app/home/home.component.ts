import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { Post } from '../shared/models/post.model';
import { PostService } from '../shared/services/posts.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  // all posts
  public posts: Post[];

  // how many to display per page
  public pageSize = 8;

  // current page index
  public pageIndex = 0;


  constructor(public route: ActivatedRoute, public postService: PostService) {
  }

  /**
   * 1. Listen to any change in the route's query params
   */
  ngOnInit(): void {
    this.route.queryParams.subscribe((param)=>{
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
    this.posts = this.postService.getHomePosts();
  }

}
