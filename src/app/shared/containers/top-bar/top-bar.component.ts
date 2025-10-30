import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UnitsDropdownComponent } from '../../components/units-dropdown/units-dropdown.component';

@Component({
  selector: 'app-top-bar',
  imports: [UnitsDropdownComponent],
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopBarComponent {}
