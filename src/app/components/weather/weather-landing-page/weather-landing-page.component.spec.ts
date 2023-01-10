import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherLandingPageComponent } from './weather-landing-page.component';

describe('WeatherLandingPageComponent', () => {
  let component: WeatherLandingPageComponent;
  let fixture: ComponentFixture<WeatherLandingPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeatherLandingPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WeatherLandingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
