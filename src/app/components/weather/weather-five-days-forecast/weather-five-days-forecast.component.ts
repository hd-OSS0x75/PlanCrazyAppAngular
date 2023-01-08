import { Component } from '@angular/core';
import {WeatherDataService} from "../../../services/weather/weather-data.service";

@Component({
  selector: 'app-weather-five-days-forecast',
  templateUrl: './weather-five-days-forecast.component.html',
  styleUrls: ['./weather-five-days-forecast.component.css']
})
export class WeatherFiveDaysForecastComponent {

  selectedCity = "paris";
  weatherData!: [];
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
  days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  fiveDays: string[] = [];

  constructor(private weatherDataService: WeatherDataService) {
  }

  ngOnInit(): void {

    this.weatherDataService.getForecast(this.selectedCity).subscribe({
      next: value => {
        this.weatherData = value.list;
        this.weatherData.forEach(element => {
          // @ts-ignore
          let day = this.days[new Date(Date.parse(element.dt_txt)).getDay()];
          if (!this.fiveDays.includes(day)) {
                // @ts-ignore
            element.main.temp = Math.round(element.main.temp - 273.15);
                this.fiveDaysWeatherData.push(element);
                this.fiveDays.push(day);
              }
        })
      }
    });
  }
}
