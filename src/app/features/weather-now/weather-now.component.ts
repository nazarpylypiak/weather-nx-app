import { AsyncPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
} from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { OpenMeteoReq } from '@shared/models/open-meteo.model';
import { DataService } from '@shared/services/data.service';
import { NominatimService } from '@shared/services/nominatim.service';
import { OpenMeteoService } from '@shared/services/open-meteo.service';
import { UnitsService } from '@shared/services/units.service';
import {
  BehaviorSubject,
  catchError,
  map,
  mergeMap,
  of,
  shareReplay,
  switchMap,
  tap,
} from 'rxjs';
import { GeolocationService } from '../../shared/services/geolocation.service';
import { ErrorMessageComponent } from './components/error-message/error-message.component';
import { HeaderComponent } from './components/header/header.component';
import { CurrentWeatherComponent } from './containers/current-weather/current-weather.component';
import { DailyForecastComponent } from './containers/daily-forecast/daily-forecast.component';
import { FeelsLikeComponent } from './containers/feels-like/feels-like.component';
import { HourlyForecastComponent } from './containers/hourly-forecast/hourly-forecast.component';

@Component({
  selector: 'app-weather-now',
  imports: [
    AsyncPipe,
    HeaderComponent,
    HourlyForecastComponent,
    ErrorMessageComponent,
    FeelsLikeComponent,
    DailyForecastComponent,
    CurrentWeatherComponent,
  ],
  templateUrl: './weather-now.component.html',
  styleUrl: './weather-now.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WeatherNowComponent {
  #geolocation = inject(GeolocationService);
  #openMeteo = inject(OpenMeteoService);
  #nominatim = inject(NominatimService);
  #unitsService = inject(UnitsService);
  #data = inject(DataService);

  #retry$ = new BehaviorSubject<void>(undefined);
  #loading$ = new BehaviorSubject<boolean>(false);
  error: boolean;

  reqParams: Omit<OpenMeteoReq, 'lat' | 'lng'>;

  #currentCity = this.#geolocation
    .getCurrentPosition()
    .pipe(
      mergeMap(({ lat, lng }) => this.#nominatim.getCityAndCountry(lat, lng))
    );

  weather$ = this.#retry$.pipe(
    tap(() => this.#loading$.next(true)),
    switchMap(() => {
      const selectedCity = this.#data.selectedCity();

      if (selectedCity) return of(selectedCity);

      return this.#currentCity;
    }),
    switchMap(({ address, ...rest }) =>
      this.#openMeteo.getWeather({ ...rest, ...this.reqParams }).pipe(
        map((res) => ({
          ...res,
          location: address,
        })),
        tap(() => this.#loading$.next(false))
      )
    ),
    catchError((error) => {
      console.error('Error fetching weather:', error);
      this.error = true;
      this.#loading$.next(false);
      return of(null);
    }),
    shareReplay(1)
  );
  isLoading$ = this.#loading$.asObservable();

  constructor() {
    const iconRegistry = inject(MatIconRegistry);
    const sanitizer = inject(DomSanitizer);

    iconRegistry.addSvgIcon(
      'reload',
      sanitizer.bypassSecurityTrustResourceUrl('assets/images/icon-retry.svg')
    );
    iconRegistry.addSvgIcon(
      'error',
      sanitizer.bypassSecurityTrustResourceUrl('assets/images/icon-error.svg')
    );
    iconRegistry.addSvgIcon(
      'loading',
      sanitizer.bypassSecurityTrustResourceUrl('assets/images/icon-loading.svg')
    );

    effect(() => {
      this.#unitsService.getUnits();
      this.setReqParams();
      this.#data.selectedCity();
      this.retry();
    });
  }

  setReqParams() {
    this.reqParams = {
      current: [
        'temperature_2m',
        'apparent_temperature',
        'relative_humidity_2m',
        'wind_speed_10m',
        'precipitation',
      ],
      hourly: ['weather_code', 'temperature_2m'],
      daily: ['temperature_2m_max', 'temperature_2m_min', 'weather_code'],
      timezone: 'auto',
      temperature_unit: this.#unitsService.getUnits().temperature,
      wind_speed_unit: this.#unitsService.getUnits().windSpeed,
      precipitation_unit: this.#unitsService.getUnits().precipitation,
    };
  }

  retry() {
    this.error = false;
    this.#retry$.next(null);
  }
}
