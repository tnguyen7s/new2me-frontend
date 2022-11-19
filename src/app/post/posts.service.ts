import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Route, Router } from "@angular/router";
import { BehaviorSubject, Subject, take, tap } from "rxjs";
import { AuthService } from "src/app/auth/auth.service";
import { environment } from "src/environments/environment";
import { ApiEnum } from "../shared/enums/ApiEnum";
import { Contact } from "../shared/models/contact.model";
import { Post } from "../shared/models/post.model";

@Injectable({
  providedIn: 'root'
})
export class PostService{
  private baseUrl = environment.baseUrl;

  public homePosts: BehaviorSubject<Post[]> = new BehaviorSubject(null);
  public homePostsLength: Number;

  public userCreatedPosts: BehaviorSubject<Post[]> = new BehaviorSubject(null);

  public fetching: BehaviorSubject<boolean> = new BehaviorSubject(null);

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
    return this.http.post(this.baseUrl + ApiEnum.Post, newPost);
  }


  /**
   * Fetch new posts from the database
   */
  public fetchUptodateActivePosts(){
    this.fetching.next(true);

    this.http.get<Post[]>(this.baseUrl+ApiEnum.Post)
        .subscribe(
          resData=> {
            console.log("fetch posts", resData);

            this.homePosts.next(resData);
            this.homePostsLength = resData.length;

            this.fetching.next(false);
          },
          error=> {
            console.error("fetch posts", error);
          }
        );
  }


  public fetchUptodateActivePostsByTag(tag: number){
    this.fetching.next(true);

    this.http.get<Post[]>(this.baseUrl + ApiEnum.FilterPostByTag + tag)
      .subscribe(
        resData => {
          console.log("fetch posts", resData);

          this.homePosts.next(resData);
          this.homePostsLength = resData.length

          this.fetching.next(false);
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
    this.fetching.next(true);

    this.http.get<Post[]>(this.baseUrl + ApiEnum.UsersPosts)
    .subscribe(
      resData=> {
        console.log("fetch posts", resData);

        this.userCreatedPosts.next(resData);
        this.fetching.next(false);
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
    this.http.delete(this.baseUrl + ApiEnum.Post +postId)
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
    this.http.put(this.baseUrl + ApiEnum.Post + post.id, post)
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
    return this.http.get<Contact>(this.baseUrl + ApiEnum.PostContacts + postId);
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
