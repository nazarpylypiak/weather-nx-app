import { Route } from '@angular/router';
import { LayoutComponent } from './core/layout/layout.component';

export const appRoutes: Route[] = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'weather-now',
        loadComponent: () =>
          import('./features/weather-now/weather-now.component').then(
            (m) => m.WeatherNowComponent
          ),
      },
      {
        path: '',
        redirectTo: 'weather-now',
        pathMatch: 'full',
      },
    ],
  },
];
