import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'new2me-ui';

  onOpenAccount(){
    console.log('onOpenAccount');
  }
}
