import { Component, OnInit } from '@angular/core';
import { ObjectUnsubscribedError } from 'rxjs';
import { TagEnum } from '../enums/TagEnum';

@Component({
  selector: 'app-left-navbar',
  templateUrl: './left-navbar.component.html',
  styleUrls: ['./left-navbar.component.css']
})
export class LeftNavbarComponent implements OnInit {
  private tagValues = {'🛋️Furniture': TagEnum.Furniture,
          '👕Apparel': TagEnum.Apparel,
          '📱Electronics': TagEnum.Electronics,
          '⛰️Outdoor': TagEnum.Outdoor,
          '🎮Gaming': TagEnum.Gaming,
          '🏃‍♂️Sports': TagEnum.Sports,
          '🐾Pet Supplies': TagEnum.PetSupplies}

  public tags: string[];
  constructor() { }

  ngOnInit(): void {
    this.tags = Object.keys(this.tagValues);
  }

  public onFilterByTag(tag){
    console.log('onFilterByTag', tag, this.tagValues[tag])
  }

}
