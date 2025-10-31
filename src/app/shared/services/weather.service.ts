import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Forecast } from '../models/forecast';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  http = inject(HttpClient);

  #baseUrl = 'https://api.open-meteo.com/v1/forecast';

  getWeather(lat: number, lng: number) {
    const params = new HttpParams().set('latitude', lat).set('longitude', lng);

    return this.http.get<Forecast>(this.#baseUrl, { params });
  }
}
