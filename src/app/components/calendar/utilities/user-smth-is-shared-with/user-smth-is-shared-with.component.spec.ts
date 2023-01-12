import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSmthIsSharedWithComponent } from './user-smth-is-shared-with.component';

describe('UserSmthIsSharedWithComponent', () => {
  let component: UserSmthIsSharedWithComponent;
  let fixture: ComponentFixture<UserSmthIsSharedWithComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserSmthIsSharedWithComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserSmthIsSharedWithComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
