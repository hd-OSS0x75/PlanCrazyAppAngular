import { Component } from '@angular/core';
import {WeatherDataService} from "../../../services/weather/weather-data.service";

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
  private selectedCity = "paris"

  dateOfToday = new Date();

  weatherData!: {
    name: string,
    weather: {
      main: string,
      description: string
    },
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
