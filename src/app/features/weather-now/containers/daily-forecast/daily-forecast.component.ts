import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-daily-forecast',
  imports: [],
  templateUrl: './daily-forecast.component.html',
  styleUrl: './daily-forecast.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DailyForecastComponent {}
