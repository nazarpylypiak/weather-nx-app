import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
} from '@angular/core';

interface UnitOption {
  label: string;
  value: string;
  selected: boolean;
}

interface UnitCategory {
  name: string;
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
  isOpen = false;

  units: UnitCategory[] = [
    {
      name: 'Temperature',
      options: [
        { label: 'Celsius (°C)', value: 'celsius', selected: true },
        { label: 'Fahrenheit (°F)', value: 'fahrenheit', selected: false },
      ],
    },
    {
      name: 'Wind Speed',
      options: [
        { label: 'km/h', value: 'kmh', selected: true },
        { label: 'mph', value: 'mph', selected: false },
      ],
    },
    {
      name: 'Precipitation',
      options: [
        { label: 'Millimeters (mm)', value: 'mm', selected: true },
        { label: 'Inches (in)', value: 'in', selected: false },
      ],
    },
  ];

  toggleDropdown(): void {
    this.isOpen = !this.isOpen;
  }

  closeDropdown(): void {
    this.isOpen = false;
  }

  selectUnit(categoryName: string, optionValue: string): void {
    const category = this.units.find((c) => c.name === categoryName);
    if (category) {
      category.options.forEach((option) => {
        option.selected = option.value === optionValue;
      });
    }
  }
}
