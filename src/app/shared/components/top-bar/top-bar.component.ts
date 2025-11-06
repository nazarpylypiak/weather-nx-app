import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UnitsDropdownComponent } from '@shared/components/units-dropdown/units-dropdown.component';

@Component({
  selector: 'app-top-bar',
  imports: [UnitsDropdownComponent],
  templateUrl: './top-bar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopBarComponent {}
