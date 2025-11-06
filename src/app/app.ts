import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TopBarComponent } from '@shared/components/top-bar/top-bar.component';

@Component({
  imports: [RouterModule, TopBarComponent],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected title = 'weather-nx-app';
}
