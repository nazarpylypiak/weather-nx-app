import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-weather-now',
  imports: [],
  templateUrl: './weather-now.component.html',
  styleUrl: './weather-now.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WeatherNowComponent {}
