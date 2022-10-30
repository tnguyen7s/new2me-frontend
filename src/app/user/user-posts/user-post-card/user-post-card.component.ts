import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { PostService } from 'src/app/post/posts.service';
import { AppYesNoDialogComponent } from 'src/app/shared/dialogs/app-yes-no-dialog/app-yes-no-dialog.component';
import { PostStatusEnum } from 'src/app/shared/enums/PostStatusEnum';
import { Post } from 'src/app/shared/models/post.model';

@Component({
  selector: 'app-user-post-card',
  templateUrl: './user-post-card.component.html',
  styleUrls: ['./user-post-card.component.css']
})
export class UserPostCardComponent implements OnInit {
  @Input() post: Post;
  @Output() loading = new EventEmitter<Number>();

  imageShown = true;
  constructor(private router: Router,
              private postService: PostService,
              private dialog: MatDialog) { }

  ngOnInit(): void {
    console.log(this.post);
  }

  onShowImage(){
    this.imageShown = true;
  }

  onShowDetail(){
    this.imageShown = false;
  }

  onOpenConfirmDialog(msg){
    const dialogRef = this.dialog.open(AppYesNoDialogComponent, {
      data : {
        message: msg
      }
    });

    return dialogRef;
  }

  /**
   * 1. Open the confirm dialog
   * 2. Notify the user post page that a post is deleted
   * 3. Delete the post from the database
   * 4. Refetch the user list of posts
   * 5. Refetch the list of active posts
   */
  onDeletePost(){
    this.onOpenConfirmDialog("This action will cause you no longer have access to it. Are you sure you want to delete it?")
      .afterClosed().subscribe((result)=>
        {
          if (result==true){

            this.loading.emit(this.post.status);

            this.postService.deleteUserPostFromDb(this.post.id);
          }
        }
      )
  }

  /**
   * 1. Open the confirm dialog
   * 2. Notify the user post page that a post is updated
   * 3. Update Post with status=Done
   * 4. Refetch the user list of posts
   * 3. refetch the active posts
   */
  onMarkPostDone(){
    this.onOpenConfirmDialog("This action will remove the post from home page. Other users will no longer have access to it. Are you sure that you want to perform this action?")
      .afterClosed()
      .subscribe((result)=>{
        if (result==true){
          this.loading.emit(this.post.status);

          this.post.status = PostStatusEnum.Done;

          this.postService.updateUserPostInDb(this.post);
        }
      })
  }
}
