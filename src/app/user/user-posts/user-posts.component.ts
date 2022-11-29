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
  protected activePosts: Post[] = [];
  protected donePosts: Post[] = [];
  protected edittingPosts: Post[] = [];

  private sub: Subscription;
  private sub2: Subscription;

  // how many to display per page
  protected pageSize: number = 4;
  protected constant:number = 4;

  // current page index
  protected pageIndexForActive:number = 0;
  protected pageIndexForDone:number = 0;
  protected pageIndexForEditting:number = 0;

  protected spinner:boolean = false;
  protected spinnerType:number = 0;
  protected loading:boolean = false;

  protected isPhoneOrIpadDevice:boolean = false;

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

  protected onTurnOnSpinner(spinnerType: number){
    this.spinner = true;
    this.spinnerType = spinnerType;
  }

  ngOnDestroy(): void {
      this.sub.unsubscribe();
      this.sub2.unsubscribe();
  }

}
