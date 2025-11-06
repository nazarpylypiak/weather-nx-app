import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  input,
  model,
} from '@angular/core';
import { Subject } from 'rxjs';

export interface Dropdown {
  selected: unknown;
  onSelect: (v: unknown) => void;
  valueChanges: Subject<void>;
}

@Component({
  selector: 'app-dropdown',
  imports: [CommonModule],
  templateUrl: './dropdown.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DropdownComponent {
  selected = model<string>('—');
  list = input<string[]>([]);
  @HostListener('document:keydown.escape')
  onEscape() {
    if (this.isOpen) {
      this.closeDropdown();
    }
  }

  isOpen = false;

  buttonClasses = input<string | null>(null);
  iconUrl = input<string | null>(null);

  onSelected(weekDay: string) {
    this.selected.set(weekDay);
    this.closeDropdown();
  }

  toggleDropdown(): void {
    this.isOpen = !this.isOpen;
  }

  closeDropdown(): void {
    this.isOpen = false;
  }
}
