import { trigger } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PhoneService } from 'src/app/shared/services/phone.service';
import { Post } from '../../shared/models/post.model';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.css']
})
export class PostCardComponent implements OnInit {
  @Input() post: Post;
  @Input() idx: Number;
  imageShown = true;
  date: Date;


  phoneOrIpadDevice = false;
  constructor(private router: Router) { }

  ngOnInit(): void {
    console.log(this.post);
    this.date = new Date(this.post.lastUpdatedOn);
  }

  onOpenPost(){
    this.router.navigate(["post", this.idx])
  }

  onShowImage(){
    this.imageShown = true;
  }

  onShowDetail(){
    this.imageShown = false;
  }
}
