import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-post-pictures',
  templateUrl: './post-pictures.component.html',
  styleUrls: ['./post-pictures.component.css']
})
export class PostPicturesComponent implements OnInit {
  @Input() images = ['https://images.ctfassets.net/i3tkg7dt3kro/63FGq7L4NaWBLjl27vDtdZ/2e076e0c74a7c22ad3ed3bd44ec11086/6-11_Meaning-of-Sunflowers_Images.jpg',
                    'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/summer-flowers-star-flower-1648071187.jpg',
                    'https://empire-s3-production.bobvila.com/slides/21727/original/cosmos.jpg?1591225095',
                    'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/gettyimages-1660671720.jpg?crop=0.668xw:1.00xh;0.167xw,0&resize=640:*']

  curInx = 0;
  constructor() { }

  ngOnInit(): void {
  }

  /**
   * move to the next picture or stay the same if curInx out of bound
   */
  onNextPic(){
    if(this.curInx+1<this.images.length){
      this.curInx++;
    }
  }

    /**
   * move to the previous picture or stay the same if curInx out of bound
   */
  onPreviousPic(){
    if (this.curInx-1>0){
      this.curInx--;
    }
  }

  /*
  *remove picture 
  */
  onRemovePic(){
    // remove the image from the component
    this.images.splice(this.curInx);
    this.curInx = 0;
  }
}
