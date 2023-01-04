import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsTaskComponent } from './details-task.component';

describe('DetailsTaskComponent', () => {
  let component: DetailsTaskComponent;
  let fixture: ComponentFixture<DetailsTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsTaskComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
