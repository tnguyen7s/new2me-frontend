import { Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { NgForm, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AppDialogComponent } from 'src/app/shared/dialogs/app-dialog/app-dialog.component';
import { PostStatusEnum } from 'src/app/shared/enums/PostStatusEnum';
import { Post } from 'src/app/shared/models/post.model';
import { EnumService } from 'src/app/shared/services/enum.service';
import { PostService } from 'src/app/post/posts.service';

@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class PostEditComponent implements OnInit, OnDestroy {
  @ViewChild('postForm') postForm: NgForm;
  private post: Post;
  public uploadedImages: (string|ArrayBuffer)[] = [];

  private mode = "create";
  public previewed = false;

  public conditionList: string[];
  public conditionDict = {};

  public tagDict = {}
  public tagList: string [];

  sub: Subscription;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private postsService: PostService,
              private enumService: EnumService,
              private dialog: MatDialog)
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


  onOpenDialog(msg){
    // open the dialog
    const dialogRef = this.dialog.open(AppDialogComponent, {
      data: {
        message: msg
      }
    });
  }

  /**
   * 1. save the post information and images to the db
   * 2. navigate to home
   * 3. Display app mesg
   */
  onPublishPost(){
    console.log('on publish post', this.post);

    if (this.mode=="create"){
      this.sub = this.postsService.publishPost(this.post)
        .subscribe(
          resData=>{
            console.log("publishPost to db", resData);
            this.onOpenDialog("Your post is uploaded successfully.");
            this.router.navigate([''])
          },
          error => {
            console.error("publishPost to db", error);

            if (error.status==401){
              this.onOpenDialog("We're sorry, please login again.");
              this.router.navigate(["auth"]);
            }
          }
        );
    }
    else{
      this.postsService.updatePost(this.post);
    }
  }

  /**
   * 1. Change the preview flag to be true
   * 2. Create a post
   */
   onPreviewPost(){
    console.log('on preview post', this.postForm.value);

    const {title, location, condition, tag, email, phone, description} = this.postForm.value;

    this.post = new Post(title, location, condition,  description, tag,  this.uploadedImages.slice() as string[], email, phone, 0, PostStatusEnum.Active);

    this.previewed = true;
   }

   /**
    * 1. Change route to home
    */
   onBackToHome(){
    this.router.navigate(['/'])
   }

   /***
    * 1. set previewed to be false
    */
   onBackToPostEdit(){
    this.previewed = false;
   }


   ngOnDestroy(): void {
    if (this.sub){
      this.sub.unsubscribe();
    }
   }
}
