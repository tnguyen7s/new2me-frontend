import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public route: ActivatedRoute) { }

  /**
   * 1. Listen to any change in the route's query params
   */
  ngOnInit(): void {
    this.route.queryParams.subscribe((param)=>{
      // filter the list of item posts in the Home page

      const by = Object.keys(param);
      if (by.includes('keyword')){
        console.log('on filter by keyword', param);
        // filter by keyword


      }
      else if (by.includes('tag')){
        console.log('on filter by tag', param);
        // filter by tag
      }
    });


  }

}
