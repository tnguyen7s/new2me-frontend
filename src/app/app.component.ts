import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from './auth/auth.service';
import { PostService } from './post/posts.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'new2me-ui';

  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute, private postService: PostService){
  }

  ngOnInit(): void {
      this.authService.autoLogin();

      // when the user refreshes the page, fetch up to date posts
      this.postService.fetchUptodateActivePosts();
  }

  onOpenAccount(){
    console.log('onOpenAccount');
    // in case cannot pass the guard, need to define the route to navigate to after authentication
    this.authService.afterAuthRoute = ["/user"];

    this.router.navigate(this.authService.afterAuthRoute);
  }
}
