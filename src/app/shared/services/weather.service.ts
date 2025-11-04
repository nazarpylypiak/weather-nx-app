import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
  PrecipitationUnit,
  TemperatureUnit,
  WindSpeedUnit,
} from '@shared/models/unit.model';
import { BehaviorSubject, map, switchMap } from 'rxjs';
import { Forecast } from '../models/forecast';

interface Location {
  lat: number;
  lng: number;
}
@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  #http = inject(HttpClient);
  #location$ = new BehaviorSubject<Location | null>(null);

  #baseUrl = 'https://api.open-meteo.com/v1/forecast';

  setLocation(location: Location) {
    this.#location$.next(location);
  }

  getWeather({
    hourly,
    daily,
    current,
    timezone,
    temperature_unit,
    wind_speed_unit,
    precipitation_unit,
  }: {
    current?: string[];
    hourly?: string[];
    daily?: string[];
    timezone?: 'auto';
    temperature_unit?: TemperatureUnit;
    wind_speed_unit?: WindSpeedUnit;
    precipitation_unit?: PrecipitationUnit;
  } = {}) {
    return this.#location$.pipe(
      switchMap(({ lat, lng }) =>
        this.getCityAndCountry(lat, lng).pipe(
          map(({ address }) => ({
            lat,
            lng,
            city: address.city || address.town || address.village || 'Unknown',
            country: address.country || 'Unknown',
          }))
        )
      ),
      switchMap(({ lat, lng, ...rest }) => {
        let params = new HttpParams()
          .set('latitude', lat)
          .set('longitude', lng);

        if (current) {
          const currentArr = Array.isArray(current) ? current : [current];
          currentArr.forEach((c) => {
            params = params.append('current', c);
          });
        }
        if (hourly) {
          const hourlyArr = Array.isArray(hourly) ? hourly : [hourly];
          hourlyArr.forEach((h) => {
            params = params.append('hourly', h);
          });
        }
        if (daily) {
          const dailyArr = Array.isArray(daily) ? daily : [daily];
          dailyArr.forEach((d) => {
            params = params.append('daily', d);
          });
        }
        if (timezone) params = params.append('timezone', timezone);
        if (temperature_unit)
          params = params.append('temperature_unit', temperature_unit);
        if (wind_speed_unit)
          params = params.append('wind_speed_unit', wind_speed_unit);
        if (precipitation_unit)
          params = params.append('precipitation_unit', precipitation_unit);

        return this.#http.get<Forecast>(this.#baseUrl, { params }).pipe(
          map((res) => ({
            ...res,
            location: rest,
          }))
        );
      })
    );
  }

  getCityAndCountry(lat: number, lng: number) {
    return this.#http.get<any>(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
    );
  }
}
