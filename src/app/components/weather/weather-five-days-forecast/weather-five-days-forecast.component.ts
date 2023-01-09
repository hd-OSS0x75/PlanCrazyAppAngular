import {Component, Input} from '@angular/core';
import {WeatherDataService} from "../../../services/weather/weather-data.service";

@Component({
  selector: 'app-weather-five-days-forecast',
  templateUrl: './weather-five-days-forecast.component.html',
  styleUrls: ['./weather-five-days-forecast.component.css']
})
export class WeatherFiveDaysForecastComponent {

  @Input()
  fiveDaysWeatherData: {
    main: {
      temp: number
    },
    weather: [
      {
        main: string
      }
    ],
    dt_txt: string;
  }[] =  [];

}
