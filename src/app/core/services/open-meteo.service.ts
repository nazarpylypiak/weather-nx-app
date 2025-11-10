import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Forecast } from '@shared/models/forecast';
import { OpenMeteoGeoRes, OpenMeteoReq } from '@shared/models/open-meteo.model';
import { defaultIfEmpty, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OpenMeteoService {
  #http = inject(HttpClient);

  searchByCity(cityName: string) {
    const url = 'https://geocoding-api.open-meteo.com/v1/search';
    const params = new HttpParams()
      .set('name', cityName)
      .set('count', 4)
      .set('language', navigator.language);

    return this.#http.get<OpenMeteoGeoRes>(url, { params }).pipe(
      map((res) =>
        res?.results?.map(
          ({ name, country, latitude, longitude, ...rest }) => ({
            address: {
              city: name,
              country,
            },
            lat: latitude,
            lng: longitude,
            ...rest,
          })
        )
      ),
      defaultIfEmpty([])
    );
  }

  getWeather({
    lat,
    lng,
    hourly,
    daily,
    current,
    timezone,
    temperature_unit,
    wind_speed_unit,
    precipitation_unit,
  }: OpenMeteoReq) {
    const url = 'https://api.open-meteo.com/v1/forecast';
    let params = new HttpParams()
      .set('latitude', lat)
      .set('longitude', lng)
      .set('language', navigator.language);

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

    return this.#http.get<Forecast>(url, { params });
  }
}
