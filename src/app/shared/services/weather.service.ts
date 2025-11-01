import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, switchMap } from 'rxjs';
import { Forecast } from '../models/forecast';

interface Location {
  lat: number;
  lng: number;
}
@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  http = inject(HttpClient);
  #location$ = new BehaviorSubject<Location | null>(null);

  #baseUrl = 'https://api.open-meteo.com/v1/forecast';

  setLocation(location: Location) {
    this.#location$.next(location);
  }

  getWeather({ hourly, daily }: { hourly?: any[]; daily?: any } = {}) {
    return this.#location$.pipe(
      switchMap(({ lat, lng }) => {
        let params = new HttpParams()
          .set('latitude', lat)
          .set('longitude', lng);

        if (hourly) {
          const hourlyArr = Array.isArray(hourly) ? hourly : [hourly];
          hourlyArr.forEach((h) => {
            params = params.append('hourly', h);
          });
        }
        if (daily) params = params.append('daily', daily);
        return this.http.get<Forecast>(this.#baseUrl, { params });
      })
    );
  }
}
