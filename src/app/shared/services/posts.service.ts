import { Injectable } from "@angular/core";
import { Post } from "../models/post.model";
import { UserPost } from "../models/user-post.model";

@Injectable({
  providedIn: 'root'
})
export class PostService{
  private homePosts: Post[] = [];
  private userCreatedPosts: UserPost[] = [];

  constructor(){
  }

  /**
   * 1. create a Post object
   * 2. send the post to back end to save
   */
  public publishPost(post: UserPost){
    const newPost = post;

    // send the post to back end
    console.log('send post to backend', newPost);

    // TODO: delete the following steps later
    this.userCreatedPosts.push(newPost);
    this.homePosts.push(newPost);
  }
}
