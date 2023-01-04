import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppuserSignupComponent } from './appuser-signup.component';

describe('AppuserSignupComponent', () => {
  let component: AppuserSignupComponent;
  let fixture: ComponentFixture<AppuserSignupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppuserSignupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppuserSignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
