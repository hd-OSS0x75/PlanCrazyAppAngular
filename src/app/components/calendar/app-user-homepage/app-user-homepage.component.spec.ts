import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppUserHomepageComponent } from './app-user-homepage.component';

describe('AppUserHomepageComponent', () => {
  let component: AppUserHomepageComponent;
  let fixture: ComponentFixture<AppUserHomepageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppUserHomepageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppUserHomepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
