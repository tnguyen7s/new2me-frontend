import { Component, HostListener, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { NgForm} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AppDialogComponent } from 'src/app/shared/dialogs/app-dialog/app-dialog.component';
import { PostStatusEnum } from 'src/app/shared/enums/PostStatusEnum';
import { Post } from 'src/app/shared/models/post.model';
import { EnumService } from 'src/app/shared/services/enum.service';
import { PostService } from 'src/app/post/posts.service';
import { AuthService } from 'src/app/auth/auth.service';
import { AppYesNoDialogComponent } from 'src/app/shared/dialogs/app-yes-no-dialog/app-yes-no-dialog.component';
import { transition, trigger, useAnimation } from '@angular/animations';
import { bounceIn } from 'src/app/shared/animations/bounce.animation';

@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.css'],
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('bounce', [
      transition("void => *",
        useAnimation(bounceIn, {
          params: { timing: 0.7}
        })
      )
    ])
  ]
})
export class PostEditComponent implements OnInit, OnDestroy {
  @ViewChild('postForm') postForm: NgForm;
  protected post: Post;
  protected postId: number = 0;
  protected uploadedImages: (string|ArrayBuffer)[] = [];

  protected mode: string = "create";
  protected previewed: boolean = false;

  protected conditionList: string[];
  protected conditionDict = {};

  protected tagDict = {}
  protected tagList: string [];

  private sub1: Subscription;
  private sub2: Subscription;
  private sub3: Subscription;
  private sub4: Subscription;

  protected postSaved: boolean = false;

  protected dialogSavedMsg: string = "Your post is uploaded successfully."

  constructor(private route: ActivatedRoute,
              private router: Router,
              private postsService: PostService,
              private enumService: EnumService,
              private dialog: MatDialog,
              private authService: AuthService)
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
    this.sub2 = this.route.params.subscribe((params)=>{
      this.postId = +params['id'];

      if (!Number.isNaN(this.postId)){
        this.mode = "edit";
        console.log('load existing post content', this.postId);

        this.postsService.fetchUserPosts();
        this.sub3 = this.postsService.userCreatedPosts.subscribe(
          userPosts => {
            userPosts.forEach(post=>{
              if (post.id==this.postId){
                this.post = post;
                this.uploadedImages = this.post.pictures;
              }
            });

            if (this.post==undefined){
              this.router.navigate(["not-found"]);
            }
          }
        )
      }
      else{
        this.postId = 0;

        var user = this.authService.user.getValue();
        this.post = new Post("", user.address, 0, "", 0, [], user.email, user.phoneNum, this.postId, 0);
      }
    })
  }

  /**
   *read image and store it in the uploadedImages array
   * @param event
   */
  protected async onUploadImage(event){
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


  protected onOpenDialog(msg: string){
    // open the dialog
    const dialogRef = this.dialog.open(AppDialogComponent, {
      data: {
        message: msg
      }
    });
  }

  protected onOpenConfirmDialog(msg){
    const dialogRef = this.dialog.open(AppYesNoDialogComponent, {
      data : {
        message: msg
      }
    });

    return dialogRef;
  }

  /**
   * 1. save the post information and images to the db
   * 2. navigate to home
   * 3. Display app mesg
   */
  protected onSavePost(){
    console.log('on publish post', this.post);

    if (this.mode=="create" || this.mode=="editting"){
      this.sub1 = this.postsService.publishPost(this.post)
        .subscribe(
          resData=>{
            console.log("publishPost to db", resData);
            this.postSaved = true;

            this.onOpenDialog(this.dialogSavedMsg);

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
      this.postsService.updateUserPostInDb(this.post);
      this.onOpenDialog("Your post has been updated!");
      this.router.navigate(["user", "posts"])
    }
  }

  /**
   * 1. Change the preview flag to be true
   * 2. Create a post
   */
   protected onPreviewPost(){
    console.log('on preview post', this.postForm.value);

    const {title, location, condition, tag, email, phone, description} = this.postForm.value;

    this.post = new Post(title, location, condition,  description, tag,  this.uploadedImages.slice() as string[], email, phone, this.postId, PostStatusEnum.Active);

    this.previewed = true;
   }

   /**
    * 1. Change route to home or user
    */
   protected onBackToPreviousPage(){
    if (this.mode=='create'){
      this.router.navigate(['/'])
    }
    else{
      this.router.navigate(['/user', 'posts'])
    }
   }

   /***
    * 1. set previewed to be false
    */
   protected onBackToPostEdit(){
    this.previewed = false;
   }

  //  @HostListener('window:beforeunload', ['$event'])
  //  beforeUnload($event: any) {
  //     event.preventDefault();
  //   }

    @HostListener('window:beforeunload', ['$event'])
    protected unload($event){
      if (this.mode=="create" && !this.postSaved && this.postForm.value.title){
        this.mode = "editting";

        this.post = this.createEdittingPost();

        this.onSavePost();
      }
    }

  // create post whose status=editting
  protected createEdittingPost(){
    let {title, location, condition, tag, email, phone, description} = this.postForm.value;

    if (!location){
      location = "...";
    }

    if (!email){
      email = "@domain.com";
    }

    if (!phone){
      phone = "123-456-7890";
    }

    return new Post(title, location, condition,  description, tag,  this.uploadedImages.slice() as string[], email, phone, this.postId, PostStatusEnum.InEditting);
  }

   ngOnDestroy() {
    if (this.mode=="create" && !this.postSaved && this.postForm.value.title){
      this.mode = "editting";

      this.post = this.createEdittingPost();

      this.sub4 = this.onOpenConfirmDialog("Do you want to save this post to continue editting it later?")
      .afterClosed()
      .subscribe((result)=>{
        if (result==true){
          console.log("save editting", this.post);
          this.dialogSavedMsg = "Your post has been saved.";
          this.onSavePost();
        }
      })
    }

    if (this.sub1){
      this.sub1.unsubscribe();
    }
    if (this.sub2){
      this.sub2.unsubscribe();
    }
    if (this.sub3){
      this.sub2.unsubscribe();
    }
    if (this.sub4){
      this.sub2.unsubscribe();
    }
  }
}
