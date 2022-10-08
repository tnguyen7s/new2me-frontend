import { Post } from "../models/post.model";
import { UserPost } from "../models/user-post.model";

export class PostService{
  private homePosts: Post[] = [];
  private userCreatedPosts: UserPost[] = [];

  constructor(){
  }
}
