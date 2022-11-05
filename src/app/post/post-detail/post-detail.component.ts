import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialog} from '@angular/material/dialog';
import { ActivatedRoute, Router} from '@angular/router';
import { Subscription } from 'rxjs';
import { Post } from 'src/app/shared/models/post.model';
import { EnumService } from 'src/app/shared/services/enum.service';
import { PostService } from 'src/app/post/posts.service';
import { PostContactDialog } from './post-contact-dialog/post-contact-dialog.component';


@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit, OnDestroy {
  // Source 1 to determine the post: from input, no routing
  @Input() post: Post;

  public conditionDict = {};

  sub: Subscription;
  constructor(public enumService: EnumService,
              public dialog: MatDialog,
              public route: ActivatedRoute,
              public router: Router,
              public postService: PostService)
  {}

  /**
   * Handle click "Reply"
   * 1. Implement Capcha
   * 2. Open the Dialog
   */
  onOpenDialog(){
    // implement capcha

    // open the dialog
    this.postService.getPostContact(this.post.id)
                    .subscribe(
                      resData =>{
                        console.log('On Get post Contact', resData);
                        const dialogRef = this.dialog.open(PostContactDialog, {
                          data: {
                            email: resData.contactEmail,
                            phone: resData.contactPhone,
                            nameOfUser: resData.nameOfUser
                          }
                        });
                      },
                      error => {
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


