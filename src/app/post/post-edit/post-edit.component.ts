import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.css']
})
export class PostEditComponent implements OnInit {
  @ViewChild('postForm') postForm: NgForm;
  public uploadedImages: (string|ArrayBuffer)[] = [];

  private mode = "create";
  public previewed = false;

  constructor(public route: ActivatedRoute, public router: Router) { }

  /**
   * 1. Detect if we are in the create mode or edit mode and set the mode
   * 2. Set the form if in edit mode
   */
  ngOnInit(): void {
    this.route.params.subscribe((params)=>{
      const postId = params['id'];

      if (postId!=undefined){
        this.mode = "edit";
        console.log('load existing post content', postId);
        // set values for the form
      }
    })
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
   * 1. Change the preview flag to be true
   */
   onPreviewPost(){
    this.previewed = true;
   }

   /**
    * 1. Change route to home
    */
   onBackToHome(){
    this.router.navigate(['/'])
   }

}
