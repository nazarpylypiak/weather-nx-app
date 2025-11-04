import { AsyncPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
} from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { UnitsService } from '@shared/services/units.service';
import {
  BehaviorSubject,
  catchError,
  distinctUntilChanged,
  map,
  mergeMap,
  of,
  shareReplay,
  startWith,
  switchMap,
  tap,
} from 'rxjs';
import { GeolocationService } from '../../shared/services/geolocation.service';
import { WeatherService } from '../../shared/services/weather.service';
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
  geolocation = inject(GeolocationService);
  weatherService = inject(WeatherService);

  #retry$ = new BehaviorSubject<void>(undefined);
  error: boolean;

  weather$ = this.#retry$.pipe(
    switchMap(() =>
      this.geolocation.getCurrentPosition().pipe(
        tap((res) => this.weatherService.setLocation(res)),
        mergeMap(() =>
          this.weatherService.getWeather({
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
          })
        ),
        catchError((err) => {
          console.error('Error fetching weather:', err);
          this.error = true;
          return of(null);
        })
      )
    ),
    shareReplay(1)
  );
  isLoading$ = this.weather$.pipe(
    map((weather) => weather === null && !this.error), // or use startWith(true)
    startWith(true),
    distinctUntilChanged()
  );

  #unitsService = inject(UnitsService);

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
      this.retry();
    });
  }

  retry() {
    this.error = false;
    this.#retry$.next();
  }
}
