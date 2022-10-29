import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { PostService } from 'src/app/post/posts.service';
import { PostStatusEnum } from 'src/app/shared/enums/PostStatusEnum';
import { Post } from 'src/app/shared/models/post.model';

@Component({
  selector: 'app-user-post-card',
  templateUrl: './user-post-card.component.html',
  styleUrls: ['./user-post-card.component.css']
})
export class UserPostCardComponent implements OnInit {
  @Input() post: Post;
  @Output() loading = new EventEmitter<Number>();

  imageShown = true;
  constructor(private router: Router, private postService: PostService) { }

  ngOnInit(): void {
    console.log(this.post);
  }

  onShowImage(){
    this.imageShown = true;
  }

  onShowDetail(){
    this.imageShown = false;
  }

  /**
   * 1. Delete the post from the database
   * 2. Refetch the user list of posts
   * 3. Notify the user post page that a post is deleted
   */
  onDeletePost(){
    this.loading.emit(this.post.status);

    this.postService.deleteUserPostFromDb(this.post.id);

    this.postService.fetchUserPosts();
  }

  /**
   * 1. Update Post with status=Done
   * 2. Refetch the user list of posts
   * 3. Notify the user post page that a post is updated
   */
  onMarkPostDone(){
    this.loading.emit(this.post.status);

    this.post.status = PostStatusEnum.Done;

    this.postService.updateUserPostInDb(this.post);

    this.postService.fetchUserPosts();
  }
}
