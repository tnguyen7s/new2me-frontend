import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { PostService } from 'src/app/post/posts.service';
import { PostStatusEnum } from 'src/app/shared/enums/PostStatusEnum';
import { Post } from 'src/app/shared/models/post.model';
import { PhoneService } from 'src/app/shared/services/phone.service';

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
  private sub2: Subscription;

  // how many to display per page
  public pageSize = 4;
  public constant = 4;

  // current page index
  public pageIndexForActive = 0;
  public pageIndexForDone = 0;
  public pageIndexForEditting = 0;

  public spinner = false;
  public spinnerType = 0;
  public loading = false;

  public isPhoneOrIpadDevice = false;

  constructor(private authService: AuthService, private postService: PostService, private phoneService: PhoneService) { }

  ngOnInit(): void {
    this.sub = this.postService.userCreatedPosts.subscribe(
      userPosts => {
        this.activePosts.splice(0, this.activePosts.length);
        this.donePosts.splice(0, this.donePosts.length);
        this.edittingPosts.splice(0, this.edittingPosts.length);

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

        this.spinner = false;
      }
    );

    this.sub2 = this.postService.fetching.subscribe(state=>{
      this.loading = state;
    });

    this.postService.fetchUserPosts();

    this.isPhoneOrIpadDevice = this.phoneService.isPhoneOrIpad();
    if (this.isPhoneOrIpadDevice){
      this.pageSize = 2;
      this.constant = 2;
    }
  }

  onTurnOnSpinner(spinnerType){
    this.spinner = true;
    this.spinnerType = spinnerType;
  }

  ngOnDestroy(): void {
      this.sub.unsubscribe();
      this.sub2.unsubscribe();
  }

}
