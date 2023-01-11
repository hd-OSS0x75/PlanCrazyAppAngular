import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherFiveDaysForecastComponent } from './weather-five-days-forecast.component';

describe('WeatherFiveDaysForecastComponent', () => {
  let component: WeatherFiveDaysForecastComponent;
  let fixture: ComponentFixture<WeatherFiveDaysForecastComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeatherFiveDaysForecastComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WeatherFiveDaysForecastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
