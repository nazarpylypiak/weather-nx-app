import { DatePipe, DecimalPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Forecast } from '@shared/models/forecast';

@Component({
  selector: 'app-current-weather',
  imports: [DatePipe, DecimalPipe, MatIconModule],
  templateUrl: './current-weather.component.html',
  styleUrl: './current-weather.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CurrentWeatherComponent {
  weather = input<Forecast | null>(null);
  loading = input<boolean>(false);

  city = computed(() => this.weather()?.location?.city ?? 'N/A');
  country = computed(() => this.weather()?.location?.country ?? 'N/A');
  date = computed(() => {
    const time = this.weather()?.current?.time;
    return time ? new Date(time) : null;
  });
  temp = computed(() => this.weather()?.current?.temperature_2m ?? 0);
}
