import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostContactDialogComponent } from './post-contact-dialog.component';

describe('PostContactDialogComponent', () => {
  let component: PostContactDialogComponent;
  let fixture: ComponentFixture<PostContactDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostContactDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostContactDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
