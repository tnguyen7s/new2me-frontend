import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EnumService } from 'src/app/shared/services/enum.service';
import { PostService } from 'src/app/shared/services/posts.service';

@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class PostEditComponent implements OnInit {
  @ViewChild('postForm') postForm: NgForm;
  private postValue: any;
  public uploadedImages: (string|ArrayBuffer)[] = [];

  private mode = "create";
  public previewed = false;

  public conditionList: string[];
  public conditionDict = {};

  public tagDict = {}
  public tagList: string [];

  constructor(public route: ActivatedRoute,
              public router: Router,
              public postsService: PostService,
              public enumService: EnumService)
  {
    this.conditionList = this.enumService.getConditionList();
    this.conditionDict = this.enumService.getConditionDict();

    this.tagList =  this.enumService.getTagList();
    this.tagDict = this.enumService.getTagDict();
  }

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
      this.uploadedImages.reverse();
      console.log("on upload image", this.uploadedImages)
    }
  }

  /**
   * 1. save the post information and images to the db
   * 2. navigate to home
   */
  onPublishPost(){
    console.log('on publish post', this.postValue);

    const {title, location, condition, tag, email, phone, description} = this.postValue;

    this.postsService.publishPost(title, location, condition, description, tag, this.uploadedImages as string[], email, phone);

    this.router.navigate([''])
  }

  /**
   * 1. Change the preview flag to be true
   */
   onPreviewPost(){
    console.log('on preview post', this.postForm.value);
    this.postValue = this.postForm.value;
    this.previewed = true;
   }

   /**
    * 1. Change route to home
    */
   onBackToHome(){
    this.router.navigate(['/'])
   }

}
