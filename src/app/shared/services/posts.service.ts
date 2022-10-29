import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Route, Router } from "@angular/router";
import { AuthService } from "src/app/auth/auth.service";
import { Post } from "../models/post.model";

@Injectable({
  providedIn: 'root'
})
export class PostService{
  private homePosts: Post[] = [
  ];

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
    this.http.post("http://localhost:5024/api/post", newPost)
              .subscribe(resData=>{
                console.log("publishPost to db", resData);
              },
              error => {
                console.error("publishPost to db", error);

                if (error.headers.status==401){
                  this.router.navigate(["auth"]);
                }
              })
  }

  public updatePost(post: Post){

  }


  /**
   * 1. return active posts
   */
  public getHomePosts(){
    return this.homePosts.slice();
  }

  /**
   * 1. return post given its index
   */
  public getPostByIndex(idx): Post{
    if (+idx<this.homePosts.length){
      return this.homePosts[+idx];
    }
    else
    {
      return null;
    }
  }
}
