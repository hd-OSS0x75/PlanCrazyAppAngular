import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherMainWidgetComponent } from './weather-main-widget.component';

describe('WeatherMainWidgetComponent', () => {
  let component: WeatherMainWidgetComponent;
  let fixture: ComponentFixture<WeatherMainWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeatherMainWidgetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WeatherMainWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
