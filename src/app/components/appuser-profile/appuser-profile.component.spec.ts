import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppuserProfileComponent } from './appuser-profile.component';

describe('AppuserProfileComponent', () => {
  let component: AppuserProfileComponent;
  let fixture: ComponentFixture<AppuserProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppuserProfileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppuserProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
