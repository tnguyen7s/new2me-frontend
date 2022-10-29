import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Route, Router } from "@angular/router";
import { BehaviorSubject, Subject, take, tap } from "rxjs";
import { AuthService } from "src/app/auth/auth.service";
import { Post } from "../models/post.model";

@Injectable({
  providedIn: 'root'
})
export class PostService{
  public homePosts: BehaviorSubject<Post[]> = new BehaviorSubject(null);
  public homePostsLength: Number;

  private userCreatedPosts: Post[] = [];

  constructor(private http: HttpClient, private authService: AuthService, private router: Router){
  }

  /**
   * 1. create a Post object
   * 2. send the post to back end to save
   */
  public publishPost(post: Post){
    const newPost = post;

    // send the post to back end
    console.log('send post to backend', newPost);
    return this.http.post("http://localhost:5024/api/post", newPost);
  }

  public updatePost(post: Post){

  }


  /**
   * Fetch new posts from the database
   */
  public fetchUptodateActivePosts(){
    this.http.get<Post[]>("http://localhost:5024/api/post")
        .subscribe(
          resData=> {
            console.log("fetch posts", resData);

            this.homePosts.next(resData);
            this.homePostsLength = resData.length;
          },
          error=> {
            console.error("fetch posts", error);
          }
        );
  }

  /**
   * 1. return post given its index
   */
  public getPostByIndex(idx): Post{
    if (+idx<this.homePostsLength){
      return this.homePosts.getValue()[+idx];
    }
    else
    {
      return null;
    }
  }
}
