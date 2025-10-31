import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { BehaviorSubject, catchError, mergeMap, of, switchMap } from 'rxjs';
import { GeolocationService } from '../../shared/services/geolocation.service';
import { WeatherService } from '../../shared/services/weather.service';
import { ErrorMessageComponent } from './components/error-message/error-message.component';
import { HeaderComponent } from './components/header/header.component';
import { SearchComponent } from './containers/search/search.component';

@Component({
  selector: 'app-weather-now',
  imports: [AsyncPipe, HeaderComponent, SearchComponent, ErrorMessageComponent],
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
        mergeMap(({ lat, lon }) => this.weatherService.getWeather(lat, lon)),
        catchError((err) => {
          console.error('Error fetching weather:', err);
          this.error = true;
          return of(null);
        })
      )
    )
  );

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
  }

  retry() {
    this.error = false;
    this.#retry$.next();
  }
}
