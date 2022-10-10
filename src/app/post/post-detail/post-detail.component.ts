import { Component, Input, OnInit } from '@angular/core';
import { MatDialog} from '@angular/material/dialog';
import { ActivatedRoute, Router} from '@angular/router';
import { Post } from 'src/app/shared/models/post.model';
import { EnumService } from 'src/app/shared/services/enum.service';
import { PostService } from 'src/app/shared/services/posts.service';
import { PostContactDialog } from './post-contact-dialog/post-contact-dialog.component';


@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit {
  // Source 1 to determine the post: from input, no routing
  @Input() post: Post;

  public conditionDict = {};
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
    const dialogRef = this.dialog.open(PostContactDialog, {
      data: {
        email: this.post.PostContactEmail,
        phone: this.post.PostContactPhone
      }
    });

  }

  ngOnInit(): void {
    // get the condition Dictionary from enumService
    const conditions = this.enumService.getConditionDict()
    for (let key of Object.keys(conditions)){
      const value = conditions[key];
      this.conditionDict[value] = key;
    }

    // source 2 to determine the post: from route
    this.route.params.subscribe((param)=>{
      if (param.idx!=null){
        this.post = this.postService.getPostByIndex(param.idx);

        if (!this.post){
          this.router.navigate(['not-found']);
        }
      }
    })
  }
}


