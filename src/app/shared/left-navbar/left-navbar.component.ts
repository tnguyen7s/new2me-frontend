import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-left-navbar',
  templateUrl: './left-navbar.component.html',
  styleUrls: ['./left-navbar.component.css']
})
export class LeftNavbarComponent implements OnInit {
  tags = ['🛋️Furniture', '👕Apparel', '📱Electronics', '⛰️Outdoor', '🎮Gaming', '🏃‍♂️Sports', '🐾Pet Supplies']
  constructor() { }

  ngOnInit(): void {
  }

}
