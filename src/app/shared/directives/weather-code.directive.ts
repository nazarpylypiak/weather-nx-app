import {
  Directive,
  effect,
  ElementRef,
  inject,
  input,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appWeatherCode]',
})
export class WeatherCodeDirective {
  appWeatherCode = input<number>();

  #el = inject(ElementRef);
  #renderer = inject(Renderer2);

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

  constructor() {
    effect(() => {
      const weatherCode = this.appWeatherCode();
      if (!weatherCode) return;
      const iconFile =
        this.weatherIcons[this.appWeatherCode()] || 'icon-error.svg';
      const imgUrl = `assets/images/${iconFile}`;

      // Clear previous content
      this.#renderer.setProperty(this.#el.nativeElement, 'innerHTML', '');
      const img = this.#renderer.createElement('img');
      this.#renderer.setAttribute(img, 'src', imgUrl);
      this.#renderer.setAttribute(img, 'alt', 'weather icon');
      this.#renderer.setStyle(img, 'width', '24px'); // optional size
      this.#renderer.setStyle(img, 'height', '24px');

      this.#renderer.appendChild(this.#el.nativeElement, img);
    });
  }
}
