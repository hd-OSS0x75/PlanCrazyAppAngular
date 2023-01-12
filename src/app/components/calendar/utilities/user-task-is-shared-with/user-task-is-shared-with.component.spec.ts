import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserTaskIsSharedWithComponent } from './user-task-is-shared-with.component';

describe('UserTaskIsSharedWithComponent', () => {
  let component: UserTaskIsSharedWithComponent;
  let fixture: ComponentFixture<UserTaskIsSharedWithComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserTaskIsSharedWithComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserTaskIsSharedWithComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
