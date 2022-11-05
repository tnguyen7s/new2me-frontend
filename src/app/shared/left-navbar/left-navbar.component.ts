import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { PostService } from 'src/app/post/posts.service';
import { PostTagEnum } from '../enums/PostTagEnum';
import { EnumService } from '../services/enum.service';

@Component({
  selector: 'app-left-navbar',
  templateUrl: './left-navbar.component.html',
  styleUrls: ['./left-navbar.component.css']
})
export class LeftNavbarComponent implements OnInit {
  public searchBarInput = "";
  private tagDict: {string: PostTagEnum};
  public tagList: string[];
  public ithButton: Number;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private enumService: EnumService,
              private authService: AuthService,
              private postService: PostService ) { }

  ngOnInit(): void {
    this.tagDict = this.enumService.getTagDict();
    this.tagList = this.enumService.getTagList();
  }

  /**
   * 1. Change the route to Home
   * 2. Associates the route with the tag number
   * 3. Update the ith button that is clicked
   * @param tag: the tag key
   */
  public onFilterByTag(tag, i){
    console.log('onFilterByTag', tag, this.tagDict[tag])

    // change the route, associate with the tag
    this.router.navigate(['/'], {queryParams: {'tag': this.tagDict[tag]}})
    this.ithButton = i;
  }


  /**
   * Handle when user types to the search bar and press "enter"
   * 1. Change the route to Home
   * 2. Associate the keyword to the route
   * @param e
   */
  public onSearch(e){
    if (e.keyCode===13){
      console.log("on search", this.searchBarInput);

      this.searchBarInput = "";
      this.router.navigate(['/'], {queryParams: {'keyword': this.searchBarInput}})
    }
  }

  /**
   * 1. Change to the route post/create
   */
  onCreatePost(){
    // in case cannot pass the guard, need to define the route to navigate to after authentication
    this.authService.afterAuthRoute = ["/post", "create"];

    this.router.navigate(['/post', 'create']);
  }

  onResetHome(){
    this.postService.fetchUptodateActivePosts();

    this.router.navigate(['']);
  }
}
