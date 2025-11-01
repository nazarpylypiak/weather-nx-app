import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  effect,
  inject,
  input,
  signal,
  ViewChild,
} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import {
  Dropdown,
  DropdownComponent,
} from '@shared/components/dropdown/dropdown.component';
import { WeatherCodeDirective } from '@shared/directives/weather-code.directive';
import { Forecast } from '@shared/models/forecast';
import { WeekDayDropdownComponent } from '../../components/week-day-dropdown/week-day-dropdown.component';

@Component({
  selector: 'app-hourly-forecast',
  imports: [
    ReactiveFormsModule,
    MatSelectModule,
    DropdownComponent,
    CommonModule,
    WeekDayDropdownComponent,
    WeatherCodeDirective,
  ],
  templateUrl: './hourly-forecast.component.html',
  styleUrl: './hourly-forecast.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HourlyForecastComponent {
  #cdr = inject(ChangeDetectorRef);

  @ViewChild('dropdown') dropdown: Dropdown;
  weather = input<Forecast>();
  selectedDay = signal<string>(null);
  dayHours = [];

  constructor() {
    effect(() => {
      const weather = this.weather();
      const day = this.selectedDay();

      if (!weather || !day) return;

      const { temperature_2m, time, weather_code } = weather.hourly;

      this.dayHours = time
        .map((t, i) => ({
          time: new Date(t),
          temp: temperature_2m[i],
          weather_code: weather_code[i],
        }))
        .filter(
          (hour) =>
            hour.time.toLocaleDateString('en-US', { weekday: 'long' }) === day
        );

      this.#cdr.markForCheck();
    });
  }

  onChange(selectedDay) {
    this.selectedDay.set(selectedDay);
  }
}
