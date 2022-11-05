import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostContactDialog } from './post-contact-dialog.component';

describe('PostContactDialog', () => {
  let component: PostContactDialog;
  let fixture: ComponentFixture<PostContactDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostContactDialog ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostContactDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
