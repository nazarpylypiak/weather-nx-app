import { DatePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  effect,
  input,
  signal,
} from '@angular/core';
import { Forecast } from '@shared/models/forecast';
import { WeatherCodePipe } from '@shared/pipes/weather-code.pipe';

interface Day {
  time: Date;
  tMax: string;
  tMin: string;
  wCode: number;
}
@Component({
  selector: 'app-daily-forecast',
  imports: [DatePipe, WeatherCodePipe],
  templateUrl: './daily-forecast.component.html',
  styleUrl: './daily-forecast.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DailyForecastComponent {
  weather = input<Forecast | null>(null);
  loading = input<boolean>(false);

  items = signal<Day[]>(Array.from({ length: 7 }));

  constructor() {
    effect(() => {
      const weather = this.weather();
      if (!weather) return Array.from({ length: 7 });
      const { daily, current_units } = weather;
      const items = daily.time.map((t, i) => ({
        time: new Date(t),
        tMax: `${Math.floor(daily.temperature_2m_max[i])}${current_units.temperature_2m.slice(0, 1)}`,
        tMin: `${Math.floor(daily.temperature_2m_min[i])}${current_units.temperature_2m.slice(0, 1)}`,
        wCode: daily.weather_code[i],
      }));
      this.items.set(items);
    });
  }
}
