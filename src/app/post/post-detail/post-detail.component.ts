import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialog} from '@angular/material/dialog';
import { ActivatedRoute, Router} from '@angular/router';
import { Subscription } from 'rxjs';
import { Post } from 'src/app/shared/models/post.model';
import { EnumService } from 'src/app/shared/services/enum.service';
import { PostService } from 'src/app/post/posts.service';
import { PostContactDialog } from './post-contact-dialog/post-contact-dialog.component';
import { transition, trigger, useAnimation } from '@angular/animations';
import { bounceIn, bounceOut } from 'src/app/shared/animations/bounce.animation';
import { RecapchaDialogComponent } from 'src/app/shared/dialogs/recapcha-dialog/recapcha-dialog.component';


@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css'],
  animations: [
    trigger('bounce',
    [
      transition('void => *',
        useAnimation(bounceIn, {
          params: {timing: 0.7}
        })
      ),
      transition('* => void',
        useAnimation(bounceOut,{
          params: {timing: 0.6}
        })
      )
    ]),
  ]
})
export class PostDetailComponent implements OnInit, OnDestroy {
  // Source 1 to determine the post: from input, no routing
  @Input() post: Post;

  public conditionDict = {};

  sub: Subscription;
  isPhone = false;

  constructor(private enumService: EnumService,
              private dialog: MatDialog,
              private route: ActivatedRoute,
              private router: Router,
              private postService: PostService
              )
  {}

  /**
   * Handle click "Reply"
   * 1. Implement Capcha
   * 2. Open the Dialog
   */
  onOpenDialog(){
    // implement capcha
    this.openRecapchaDialog()
        .afterClosed()
        .subscribe(
          result =>{
          if (result == true){
            // get the post contact
            this.postService.getPostContact(this.post.id)
            .subscribe(
              resData =>{
                console.log('On Get post Contact', resData);

                // if capcha succeed
                const dialogRef = this.dialog.open(PostContactDialog, {
                  data: {
                    email: resData.contactEmail,
                    phone: resData.contactPhone,
                    nameOfUser: resData.nameOfUser
                  }
                });
              },
              error => {
                // otherwise
                if (error.status==404){
                  const dialogRef = this.dialog.open(PostContactDialog, {
                    data: {
                      email: this.post.contactEmail,
                      phone: this.post.contactPhone
                    }
                  });
                }
              }
            );
          }

        }
      );
  }

  openRecapchaDialog(){
    const dialogRef = this.dialog.open(RecapchaDialogComponent);

    return dialogRef;
  }

  ngOnInit(): void {
    // get the condition Dictionary from enumService
    const conditions = this.enumService.getConditionDict()
    for (let key of Object.keys(conditions)){
      const value = conditions[key];
      this.conditionDict[value] = key;
    }

    // source 2 to determine the post: from route
    this.sub = this.route.params.subscribe((param)=>{
      if (param.idx!=null){
        this.post = this.postService.getPostByIndex(param.idx);
      }
    })


  }

  ngOnDestroy(): void {
      this.sub.unsubscribe();
  }
}


