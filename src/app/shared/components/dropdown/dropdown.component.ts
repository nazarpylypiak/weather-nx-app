import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  HostListener,
  input,
  model,
  OnInit,
} from '@angular/core';
import { DROPDOWN } from '@shared/components/dropdown/dropdown.token';
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
  styleUrl: './dropdown.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DropdownComponent implements OnInit {
  @HostListener('document:keydown.escape')
  onEscape() {
    if (this.isOpen) {
      this.closeDropdown();
    }
  }

  @ContentChild(DROPDOWN, { static: true })
  content: Dropdown;

  isOpen = false;

  buttonClasses = input<string | null>(null);
  iconUrl = input<string | null>(null);
  selected = model<unknown>(null);

  ngOnInit(): void {
    this.selected.set(this.content.selected);
    this.content.valueChanges.subscribe({
      next: () => {
        this.selected.set(this.content.selected);
        this.closeDropdown();
      },
    });
  }

  toggleDropdown(): void {
    this.isOpen = !this.isOpen;
  }

  closeDropdown(): void {
    this.isOpen = false;
  }
}
