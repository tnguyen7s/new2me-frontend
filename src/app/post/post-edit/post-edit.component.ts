import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.css']
})
export class PostEditComponent implements OnInit {
  @ViewChild('postForm') postForm: NgForm;
  uploadedImages: (string|ArrayBuffer)[] = [];
  
  constructor() { }

  ngOnInit(): void {
  }

  /**
   *read image and store it in the uploadedImages array
   * @param event
   */
  async onUploadImage(event){
    // retrieve from input:img element
    const selectedFile = event.target.files[0];

    // create a file reader
    var reader = new FileReader();

    // read the file
    reader.readAsDataURL(selectedFile);

    // set onload
    reader.onload = (_event) => {
      this.uploadedImages.push(reader.result);
      console.log("on upload image", this.uploadedImages)
    }
  }

  /**
   * save the post information and images to the db
   */
  onPublishPost(){
    console.log('on publish post', this.postForm);
  }

  /**
   *
   */

}
