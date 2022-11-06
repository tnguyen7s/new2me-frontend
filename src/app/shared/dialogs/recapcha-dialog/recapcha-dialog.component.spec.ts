import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecapchaDialogComponent } from './recapcha-dialog.component';

describe('RecapchaDialogComponent', () => {
  let component: RecapchaDialogComponent;
  let fixture: ComponentFixture<RecapchaDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecapchaDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecapchaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
