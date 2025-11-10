import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map } from 'rxjs';

interface Address {
  city: string;
  town: string;
  village: string;
  country: string;
}

@Injectable({
  providedIn: 'root',
})
export class NominatimService {
  #baseUrl = 'https://nominatim.openstreetmap.org/reverse';
  #http = inject(HttpClient);

  getCityAndCountry(lat: number, lng: number) {
    const params = new HttpParams()
      .set('format', 'json')
      .set('lat', lat)
      .set('lon', lng);

    return this.#http
      .get<{
        address: Address;
      }>(this.#baseUrl, {
        params,
      })
      .pipe(
        map(({ address }) => ({
          lat,
          lng,
          address: {
            city: address.city || address.town || address.village || 'Unknown',
            country: address.country || 'Unknown',
          },
        }))
      );
  }
}
