import { Component } from '@angular/core';
import {WeatherDataService} from "../../../services/weather/weather-data.service";
import {formatDate} from '@angular/common';

@Component({
  selector: 'app-weather-main-widget',
  templateUrl: './weather-main-widget.component.html',
  styleUrls: ['./weather-main-widget.component.css']
})
export class WeatherMainWidgetComponent {

  isSunny = false;
  isCloudy = false;
  isRainy = false;
  isSnowy = false;
  private selectedCity = "daun"

  dateOfToday = new Date();
  weatherData!: {
    name: undefined,
    weather: {
      main: undefined,
      description: undefined
    },
    main: {
      temp: number,
      pressure: undefined,
      feels_like: undefined,
      humidity: undefined
    }
    sys: {
      sunrise: undefined,
      sunset: undefined
    }
  };

  constructor(private weatherDataService: WeatherDataService) { }

  ngOnInit(): void {
    this.weatherDataService.getNow(this.selectedCity).subscribe({
      next: value => {
        this.weatherData = value;
        this.weatherData.main.temp = Math.round(this.weatherData.main.temp - 273.15);
        let weatherTemp = value.weather[0].main;
        let sunny = "Clear";
        let clouds = "Clouds";
        let rainy = "Rain"
        let snowy = "Snow"
        this.isSunny = weatherTemp.includes(sunny);
        this.isCloudy = weatherTemp.includes(clouds);
        this.isRainy = weatherTemp.includes(rainy);
        this.isSnowy = weatherTemp.includes(snowy);
      },
      error: err => {
        console.log(err);
      }
    });
  }
}
