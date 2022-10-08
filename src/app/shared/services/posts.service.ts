import { Injectable } from "@angular/core";
import { PostConditionEnum } from "../enums/PostConditionEnum";
import { PostStatusEnum } from "../enums/PostStatusEnum";
import { TagEnum } from "../enums/TagEnum";
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
   * @param title
   * @param location
   * @param condition
   * @param description
   * @param tag
   * @param images
   * @param email
   * @param phone
   */
  public publishPost(title: string, location: string, condition: PostConditionEnum,  description: string, tag: TagEnum,  images: string[], email: string, phone: string){
    const newPost = new UserPost(title, location, condition,  description, tag,  images, email, phone, PostStatusEnum.Active);

    // send the post to back end
    console.log('send post to backend', newPost);

    // TODO: delete the following steps later
    this.userCreatedPosts.push(newPost);
    this.homePosts.push(newPost);
  }
}
