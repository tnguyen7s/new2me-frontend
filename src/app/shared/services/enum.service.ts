import { Injectable } from "@angular/core";
import { PostConditionEnum } from "../enums/PostConditionEnum";
import { PostTagEnum } from "../enums/PostTagEnum";

@Injectable({
  providedIn: "root"
})
export class EnumService{
  // CONDITION
  private conditionList: string[] = [];
  private conditionDict = {
    'New': PostConditionEnum.New,
    'Like New': PostConditionEnum.LikeNew,
    'Good': PostConditionEnum.Good,
    'Quite Good': PostConditionEnum.QuiteGood
  }

  /**
   * 1. If the condition description list is empty, send a request to backend to get the list
   * 2. Return a copy of the "conditionList"
   */
  public getConditionList(): string[]{
    if (this.conditionList.length==0){
      this.readConditions();
    }

    // console.log('getconditionList', this.conditionList.slice());
    return this.conditionList.slice();
  }


  /**
   * 1. If the conditionDict is empty, send a request to backend to get the list
   * 2. Return a copy of the "conditionDict"
   */
  public getConditionDict(): {string: PostConditionEnum}{
    if (!this.conditionDict){
      this.readConditions();
    }

    // console.log('getconditionDict', JSON.parse(JSON.stringify(this.conditionDict)));
    return JSON.parse(JSON.stringify(this.conditionDict));
  }

  /**
   * Read PostConditionEnum Table from the backend
   */
  private readConditions(){
    this.conditionDict = this.conditionDict;
    this.conditionList = Object.keys(this.conditionDict);
  }

  // TAGS
  private tagList: string[] = [];
  private tagDict = {
    '🛋️Furniture': PostTagEnum.Furniture,
    '👕Apparel': PostTagEnum.Apparel,
    '📱Electronics': PostTagEnum.Electronics,
    '⛰️Outdoor': PostTagEnum.Outdoor,
    '🎮Gaming': PostTagEnum.Gaming,
    '🏃‍♂️Sports': PostTagEnum.Sports,
    '🐾Pet Supplies': PostTagEnum.PetSupplies
  }


  /**
   * 1. If the taglist is empty, send a request to backend to get the list
   * 2. Return a copy of the "tagList"
   */
   public getTagList(): string[]{
    if (this.tagList.length==0){
      this.readTags();
    }

    console.log('getTagList', this.tagList.slice());
    return this.tagList.slice();
  }


  /**
   * 1. If the tagDict is empty, send a request to backend to get the list
   * 2. Return a copy of the "tagDict"
   */
  public getTagDict(): {string: PostTagEnum}{
    if (!this.tagDict){
      this.readTags();
    }

    console.log('getTagDict', JSON.parse(JSON.stringify(this.tagDict)));
    return JSON.parse(JSON.stringify(this.tagDict));
  }

  /**
   * Read PostConditionEnum Table from the backend
   */
  private readTags(){
    this.tagDict = this.tagDict;
    this.tagList = Object.keys(this.tagDict);
  }
}
