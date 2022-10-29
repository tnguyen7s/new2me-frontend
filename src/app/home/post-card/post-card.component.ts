import { Component, Input, OnInit } from '@angular/core';
import { Post } from '../../shared/models/post.model';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.css']
})
export class PostCardComponent implements OnInit {
  @Input() post: Post;
  constructor() { }

  ngOnInit(): void {
    console.log(this.post);
  }

}
