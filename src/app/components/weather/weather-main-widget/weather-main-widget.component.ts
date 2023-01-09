import {Component, Input, Output} from '@angular/core';
import {WeatherDataService} from "../../../services/weather/weather-data.service";

@Component({
  selector: 'app-weather-main-widget',
  templateUrl: './weather-main-widget.component.html',
  styleUrls: ['./weather-main-widget.component.css']
})
export class WeatherMainWidgetComponent {



  @Input()
  dateOfToday!: Date;

  @Input()
  weatherDataOfToday!: {
    name: string,
    weather: [
      {
        main: string,
        description: string
      }
    ],
    main: {
      temp: number,
      pressure: number,
      feels_like: number,
      humidity: number
    }
    sys: {
      sunrise: undefined,
      sunset: undefined
    }
  };





}
