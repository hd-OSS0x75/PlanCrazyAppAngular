import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {WeatherDataService} from "../../../services/weather/weather-data.service";
import {AppUserService} from "../../../services/app-user-authentification/app-user.service";

@Component({
  selector: 'app-weather-landing-page',
  templateUrl: './weather-landing-page.component.html',
  styleUrls: ['./weather-landing-page.component.css']
})
export class WeatherLandingPageComponent{

  cityToUpdate!: string;

  selectedCity: string = "";

  dateOfToday = new Date();

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
    },
    sys: {
      sunrise: undefined,
      sunset: undefined
    }
  };

  weatherDataForecast!: [];

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

  fiveDays: string[] = [];

  constructor(private weatherDataService: WeatherDataService, private appUserService: AppUserService) { }

  ngOnInit(): void {
    this.getUserCity();
    setTimeout(() => {
      this.getWeatherForNow(this.selectedCity);
      this.getWeatherForecast(this.selectedCity);
    }, 200)
  }

  updateWithNewLocation(newLocation: string) {
    this.fiveDays = [];
    this.fiveDaysWeatherData = [];
    this.weatherDataOfToday = {
      name: "",
      weather: [
        {
          main: "string",
          description: "string"
        }
      ],
      main: {
        temp: 0,
        pressure: 0,
        feels_like: 0,
        humidity: 0
      },
      sys: {
        sunrise: undefined,
        sunset: undefined
      }
    };
    localStorage.setItem('selectedCity', newLocation);
    this.getWeatherForNow(newLocation);
    this.getWeatherForecast(newLocation);
    this.cityToUpdate = "";
  }

  getUserCity() {
    this.appUserService.get().subscribe({
      next: value => {
        if(localStorage.getItem('selectedCity')) {
          // @ts-ignore
          this.selectedCity = localStorage.getItem('selectedCity');
          return
        }
        this.selectedCity = value.city;
        localStorage.setItem('selectedCity', this.selectedCity);
    },
      error: err => {
        console.log(err);
    }
    });
  }

  getWeatherForNow(location: string) {
    this.weatherDataService.getNow(location).subscribe({
      next: value => {
        this.weatherDataOfToday = value;
        this.weatherDataOfToday.main.temp = Math.round(this.weatherDataOfToday.main.temp - 273.15);
      },
      error: err => {
        console.log(err);
      }
    });
  }

  getWeatherForecast(location: string) {
    this.weatherDataService.getForecast(location).subscribe({
      next: value => {
        this.weatherDataForecast = value.list;
        this.weatherDataForecast.forEach(element => {
          // @ts-ignore
          let day = new Date(Date.parse(element.dt_txt)).getDay();
          if (!this.fiveDays.includes(day.toString())) {
            // @ts-ignore
            element.main.temp = Math.round(element.main.temp - 273.15);
            this.fiveDaysWeatherData.push(element);
            this.fiveDays.push(day.toString());
          }
        });
        this.fiveDaysWeatherData.shift();
      }
    });
  }
}
