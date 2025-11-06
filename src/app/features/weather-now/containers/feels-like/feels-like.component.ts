import {
  ChangeDetectionStrategy,
  Component,
  effect,
  input,
  signal,
} from '@angular/core';
import { Forecast } from '@shared/models/forecast';
interface FeelsLikeItem {
  label: string;
  value: string;
}
@Component({
  selector: 'app-feels-like',
  imports: [],
  templateUrl: './feels-like.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeelsLikeComponent {
  weather = input<Forecast | null>(null);
  loading = input<boolean>(false);

  items = signal<FeelsLikeItem[]>([
    { label: 'Feels Like', value: '—' },
    { label: 'Humidity', value: '—' },
    { label: 'Wind', value: '—' },
    { label: 'Precipitation', value: '—' },
  ]);

  constructor() {
    effect(() => {
      const weather = this.weather();
      if (!weather) return;
      const {
        current_units,
        current: {
          apparent_temperature,
          relative_humidity_2m,
          wind_speed_10m,
          precipitation,
        },
      } = weather;
      this.items.set([
        {
          label: 'Feels Like',
          value: `${Math.floor(apparent_temperature)}${current_units.apparent_temperature}`,
        },
        {
          label: 'Humidity',
          value: `${relative_humidity_2m}${current_units.relative_humidity_2m}`,
        },
        {
          label: 'Wind',
          value: `${wind_speed_10m} ${current_units.wind_speed_10m}`,
        },
        {
          label: 'Precipitation',
          value: `${precipitation} ${current_units.precipitation}`,
        },
      ]);
    });
  }
}
