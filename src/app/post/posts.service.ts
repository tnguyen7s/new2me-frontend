import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Route, Router } from "@angular/router";
import { BehaviorSubject, Subject, take, tap } from "rxjs";
import { AuthService } from "src/app/auth/auth.service";
import { Contact } from "../shared/models/contact.model";
import { Post } from "../shared/models/post.model";

@Injectable({
  providedIn: 'root'
})
export class PostService{
  public homePosts: BehaviorSubject<Post[]> = new BehaviorSubject(null);
  public homePostsLength: Number;

  public userCreatedPosts: BehaviorSubject<Post[]> = new BehaviorSubject(null);

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


  public fetchUptodateActivePostsByTag(tag: number){
    this.http.get<Post[]>("http://localhost:5024/api/post/filter?tag=" + tag)
      .subscribe(
        resData => {
          console.log("fetch posts", resData);

          this.homePosts.next(resData);
          this.homePostsLength = resData.length
        },
        error=> {
          console.error("fetch posts", error);
        }
      )
  }

  /**
   * Fetch user created posts
   */
  public fetchUserPosts(){
    this.http.get<Post[]>("http://localhost:5024/api/post/user")
    .subscribe(
      resData=> {
        console.log("fetch posts", resData);

        this.userCreatedPosts.next(resData);
      },
      error=> {
        console.error("fetch posts", error);
      }
    );
  }

  /**
   * Delete the user's post from db
   */
  public deleteUserPostFromDb(postId: Number){
    this.http.delete("http://localhost:5024/api/post/"+postId)
      .subscribe(
        (resData) =>{
          console.log("deleteUserPostFromDb", postId, resData);

          this.fetchUserPosts();

          this.fetchUptodateActivePosts();
        },
        (error) => {
          console.error("deleteUserPostFromDb", error);
        }
      )
  }

  /**
   * Update the user's post in db
   * Refetch the user list of posts
   * Refetch the active posts
   */
  public updateUserPostInDb(post: Post){
    this.http.put("http://localhost:5024/api/post/"+post.id, post)
    .subscribe(
      (resData) =>{
        console.log("updateUserPostInDb", post.id, resData)

        this.fetchUserPosts();

        this.fetchUptodateActivePosts();
      },
      (error) => {
        console.error("updateUserPostInDb", error);
      }
    )
  }

  public getPostContact(postId){
    return this.http.get<Contact>("http://localhost:5024/api/post/contact/"+postId);
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
