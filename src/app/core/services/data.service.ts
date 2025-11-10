import { Injectable, Signal, signal } from '@angular/core';
import { WeatherLoctaion } from '@shared/models/forecast';

export interface SelectedCityData {
  address: WeatherLoctaion;
  lat: number;
  lng: number;
}

@Injectable({
  providedIn: 'root',
})
export class DataService {
  #selectedCity = signal<SelectedCityData | null>(null);

  set selectedCity(v: SelectedCityData) {
    this.#selectedCity.set(v);
  }

  get selectedCity(): Signal<SelectedCityData> {
    return this.#selectedCity.asReadonly();
  }
}
