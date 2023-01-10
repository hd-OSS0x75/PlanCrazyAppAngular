import {EventEmitter, Injectable, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment"


const nowUrl = `https://api.openweathermap.org/data/2.5/weather?q={city name}&appid=${environment.openWeatherApiKey}`;

const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=paris&appid=${environment.openWeatherApiKey}`;

@Injectable({
  providedIn: 'root'
})
export class WeatherDataService {

  weatherServiceData!: any;
  public weatherServiceDataEmitter!: EventEmitter<{}>;

  constructor(private http: HttpClient) {
  }

  getNow(city: string): Observable<any> {
    return this.http.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${environment.openWeatherApiKey}`)
  }

  getForecast(city: string): Observable<any> {
    return this.http.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${environment.openWeatherApiKey}`)
  }

}
