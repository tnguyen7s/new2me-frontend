import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ObjectUnsubscribedError } from 'rxjs';
import { TagEnum } from '../enums/TagEnum';

@Component({
  selector: 'app-left-navbar',
  templateUrl: './left-navbar.component.html',
  styleUrls: ['./left-navbar.component.css']
})
export class LeftNavbarComponent implements OnInit {
  public searchBarInput = "";
  private tagValues = {'🛋️Furniture': TagEnum.Furniture,
          '👕Apparel': TagEnum.Apparel,
          '📱Electronics': TagEnum.Electronics,
          '⛰️Outdoor': TagEnum.Outdoor,
          '🎮Gaming': TagEnum.Gaming,
          '🏃‍♂️Sports': TagEnum.Sports,
          '🐾Pet Supplies': TagEnum.PetSupplies}

  public tags: string[];
  constructor(public router: Router, public route: ActivatedRoute) { }

  ngOnInit(): void {
    this.tags = Object.keys(this.tagValues);
  }

  /**
   * 1. Change the route to Home
   * 2. Associates the route with the tag number
   * @param tag: the tag key
   */
  public onFilterByTag(tag){
    console.log('onFilterByTag', tag, this.tagValues[tag])

    // change the route, associate with the tag
    this.router.navigate(['/'], {queryParams: {'tag': this.tagValues[tag]}})
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
    this.router.navigate(['/post', 'create']);
  }
}
