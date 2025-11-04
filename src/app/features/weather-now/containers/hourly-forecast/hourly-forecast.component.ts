import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  effect,
  input,
  model,
  ViewChild,
} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import {
  Dropdown,
  DropdownComponent,
} from '@shared/components/dropdown/dropdown.component';
import { Forecast } from '@shared/models/forecast';
import { WeatherCodePipe } from '@shared/pipes/weather-code.pipe';

interface WeekDay {
  time: Date;
  temp: number;
  wCode: number;
}
@Component({
  selector: 'app-hourly-forecast',
  imports: [
    ReactiveFormsModule,
    MatSelectModule,
    DropdownComponent,
    CommonModule,
    WeatherCodePipe,
  ],
  templateUrl: './hourly-forecast.component.html',
  styleUrl: './hourly-forecast.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HourlyForecastComponent {
  weather = input<Forecast | null>(null);
  loading = input<boolean>(false);
  // #cdr = inject(ChangeDetectorRef);

  @ViewChild('dropdown') dropdown: Dropdown;

  selectedWeekDay = model<string>('—');

  weekDays: Map<string, WeekDay[]> | null = null;
  weekDayNames: string[] = [];

  constructor() {
    effect(() => {
      const weather = this.weather();
      const weekDaySet = new Set<string>();
      if (!weather) return;
      const { hourly } = weather;
      const week = new Map<string, WeekDay[]>();

      hourly.time.forEach((t, i) => {
        const locale = navigator.language || navigator.languages[0];
        const weekDay = {
          time: new Date(t),
          temp: Math.floor(hourly.temperature_2m[i]),
          wCode: hourly.weather_code[i],
        };
        const weekDayStr = weekDay.time.toLocaleDateString(locale, {
          weekday: 'long',
        });

        if (!week.has(weekDayStr)) {
          week.set(weekDayStr, []);
          weekDaySet.add(weekDayStr);
        }
        week.get(weekDayStr).push(weekDay);
      });

      this.weekDays = week;
      this.weekDayNames = [...weekDaySet];
      const firstKey = this.weekDays.size
        ? this.weekDays.keys().next().value
        : null;
      if (firstKey) this.selectedWeekDay.set(firstKey);
    });
  }

  onChange(selectedDay: string) {
    this.selectedWeekDay.set(selectedDay);
  }
}
