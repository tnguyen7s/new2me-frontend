import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppYesNoDialogComponent } from './app-yes-no-dialog.component';

describe('AppYesNoDialogComponent', () => {
  let component: AppYesNoDialogComponent;
  let fixture: ComponentFixture<AppYesNoDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppYesNoDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppYesNoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
