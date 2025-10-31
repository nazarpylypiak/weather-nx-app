import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-hourly-forecast',
  imports: [],
  templateUrl: './hourly-forecast.component.html',
  styleUrl: './hourly-forecast.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HourlyForecastComponent {}
