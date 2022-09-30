import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostPicturesComponent } from './post-pictures.component';

describe('PostPicturesComponent', () => {
  let component: PostPicturesComponent;
  let fixture: ComponentFixture<PostPicturesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostPicturesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostPicturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
