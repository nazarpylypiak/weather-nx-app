import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  inject,
  signal,
} from '@angular/core';
import { Units, UnitType } from '@shared/models/unit.model';
import { UnitsService } from '@shared/services/units.service';

interface UnitOption {
  label: string;
  value: Units;
}

interface UnitCategory {
  name: string;
  type: UnitType;
  options: UnitOption[];
}

@Component({
  selector: 'app-units-dropdown',
  imports: [CommonModule],
  templateUrl: './units-dropdown.component.html',
  styleUrl: './units-dropdown.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UnitsDropdownComponent {
  @HostListener('document:keydown.escape')
  onEscape() {
    if (this.isOpen) {
      this.closeDropdown();
    }
  }

  #unitsService = inject(UnitsService);

  isOpen = signal(false);
  selectedUnits = this.#unitsService.getUnits;

  units: UnitCategory[] = [
    {
      name: 'Temperature',
      type: UnitType.TEMPERATURE,
      options: [
        { label: 'Celsius (°C)', value: 'celsius' },
        { label: 'Fahrenheit (°F)', value: 'fahrenheit' },
      ],
    },
    {
      name: 'Wind Speed',
      type: UnitType.WIND_SPEED,
      options: [
        { label: 'km/h', value: 'kmh' },
        { label: 'mph', value: 'mph' },
      ],
    },
    {
      name: 'Precipitation',
      type: UnitType.PRECIPITATION,
      options: [
        { label: 'Millimeters (mm)', value: 'mm' },
        { label: 'Inches (in)', value: 'inch' },
      ],
    },
  ];

  selectUnit(unitType: UnitType, value: Units): void {
    this.#unitsService.setUnit(unitType, value);
  }

  toggleDropdown(): void {
    this.isOpen.update((v) => !v);
  }

  closeDropdown(): void {
    this.isOpen.set(false);
  }
}
