import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-no-posts',
  templateUrl: './no-posts.component.html',
})
export class NoPostsComponent implements OnInit {
  @Input() msg: String;
  constructor() { }

  ngOnInit(): void {
  }

}
