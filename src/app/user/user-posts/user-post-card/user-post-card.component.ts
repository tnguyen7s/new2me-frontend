import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostService } from 'src/app/post/posts.service';
import { Post } from 'src/app/shared/models/post.model';

@Component({
  selector: 'app-user-post-card',
  templateUrl: './user-post-card.component.html',
  styleUrls: ['./user-post-card.component.css']
})
export class UserPostCardComponent implements OnInit {

  @Input() post: Post;
  @Input() idx: Number;
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
   */
  onDeletePost(){
    this.postService.deleteUserPostFromDb(this.post.id);

    this.postService.fetchUserPosts();
  }
}
