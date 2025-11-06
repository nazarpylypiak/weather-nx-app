import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SearchComponent } from '../../containers/search/search.component';

@Component({
  selector: 'app-header',
  imports: [SearchComponent],
  templateUrl: './header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {}
