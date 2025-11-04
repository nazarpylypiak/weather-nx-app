import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'weatherCode',
})
export class WeatherCodePipe implements PipeTransform {
  private weatherIcons: Record<number, string> = {
    0: 'icon-sunny.webp', // Clear sky
    1: 'icon-partly-cloudy.webp', // Mainly clear
    2: 'icon-partly-cloudy.webp', // Partly cloudy
    3: 'icon-overcast.webp', // Overcast
    45: 'icon-fog.webp',
    48: 'icon-fog.webp', // Fog
    51: 'icon-drizzle.webp',
    53: 'icon-drizzle.webp',
    55: 'icon-drizzle.webp', // Drizzle
    56: 'icon-drizzle.webp',
    57: 'icon-drizzle.webp', // Freezing drizzle
    61: 'icon-rain.webp',
    63: 'icon-rain.webp',
    65: 'icon-rain.webp', // Rain
    66: 'icon-rain.webp',
    67: 'icon-rain.webp', // Freezing rain
    71: 'icon-snow.webp',
    73: 'icon-snow.webp',
    75: 'icon-snow.webp', // Snow fall
    77: 'icon-snow.webp', // Snow grains
    80: 'icon-rain.webp',
    81: 'icon-rain.webp',
    82: 'icon-rain.webp', // Rain showers
    85: 'icon-snow.webp',
    86: 'icon-snow.webp', // Snow showers
    95: 'icon-storm.webp', // Thunderstorm
    96: 'icon-storm.webp',
    99: 'icon-storm.webp', // Thunderstorm with hail
  };

  transform(weatherCode: number): unknown {
    if (typeof weatherCode !== 'number' || weatherCode < 0) return;
    const iconFile = this.weatherIcons[weatherCode] || 'icon-error.svg';
    return `assets/images/${iconFile}`;
  }
}
