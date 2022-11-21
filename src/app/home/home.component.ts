import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { Subscription, take } from 'rxjs';
import { Post } from '../shared/models/post.model';
import { PostService } from '../post/posts.service';
import { PhoneService } from '../shared/services/phone.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator) paginator: MatPaginator;

  // all posts
  public posts: Post[];

  // how many to display per page
  public pageSize = 8;

  // current page index
  public pageIndex = 0;

  sub1: Subscription;
  sub2: Subscription;
  sub3: Subscription;

  public phoneOrIpadDevice = false;

  public loading = false;

  public noPostMessage = "";

  constructor(private route: ActivatedRoute, private postService: PostService, private phoneService: PhoneService) {
  }

  /**
   * 1. Listen to any change in the route's query params
   */
  ngOnInit(): void {
    this.sub1 = this.route.queryParams.subscribe((param)=>{
      // reset the page index to be 0
      this.paginator.firstPage();
      console.log('Page index', this.pageIndex);


      // filter the list of item posts in the Home page
      const by = Object.keys(param);
      if (by.includes('keyword')){
        console.log('on filter by keyword', param);
        this.noPostMessage = "It looks like there is no give-away item matching with your search."

        // filter by keyword
        this.postService.fetchUptodateActivePostsByKeywords(param['keyword']);

      }
      else if (by.includes('tag')){
        console.log('on filter by tag', param);
        this.noPostMessage = "It looks like there is no give-away item of this tag."

        // filter by tag
        this.postService.fetchUptodateActivePostsByTag(+param['tag']);
      }
      else{
        this.noPostMessage = "It looks like there is no give-away item posted at this time. Please check out New2Me later."

      }
    });

    // get all posts from postService
    this.sub2 = this.postService.homePosts.subscribe(data => {
      this.posts = data;
    })

    // listen to fetching
    this.sub3 =  this.postService.fetching.subscribe(state => {
      this.loading = state;
    })

    // depends on the user agent to decide how to display the content
    this.phoneOrIpadDevice = this.phoneService.isPhoneOrIpad();
    if (this.phoneOrIpadDevice){
      this.pageSize = 4;
    }
  }

  ngOnDestroy(): void {
    this.sub1.unsubscribe();
    this.sub2.unsubscribe();
    this.sub3.unsubscribe();
  }

}
