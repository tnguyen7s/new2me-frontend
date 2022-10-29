import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { PostService } from 'src/app/post/posts.service';
import { PostStatusEnum } from 'src/app/shared/enums/PostStatusEnum';
import { Post } from 'src/app/shared/models/post.model';

@Component({
  selector: 'app-user-posts',
  templateUrl: './user-posts.component.html',
  styleUrls: ['./user-posts.component.css']
})
export class UserPostsComponent implements OnInit, OnDestroy {
  public activePosts: Post[] = [];
  public donePosts: Post[] = [];
  public edittingPosts: Post[] = [];

  private sub: Subscription;

  // how many to display per page
  public pageSize = 4;

  // current page index
  public pageIndexForActive = 0;
  public pageIndexForDone = 0;
  public pageIndexForEditting = 0;

  constructor(private authService: AuthService, private postService: PostService) { }

  ngOnInit(): void {
    this.sub = this.postService.userCreatedPosts.subscribe(
      userPosts => {
        userPosts.forEach(post=> {
          switch(post.status){
            case PostStatusEnum.Active:
              this.activePosts.push(post);
              break;
            case PostStatusEnum.Done:
              this.donePosts.push(post);
              break;
            case PostStatusEnum.InEditting:
              this.edittingPosts.push(post);
          }
        });
      }
    );

    this.postService.fetchUserPosts();
  }

  onLogout(){
    this.authService.logout();
  }

  ngOnDestroy(): void {
      this.sub.unsubscribe();
  }

}
