import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, forwardRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Dropdown } from '@shared/components/dropdown/dropdown.component';
import { DROPDOWN } from '@shared/components/dropdown/dropdown.token';
import { Subject } from 'rxjs';

type WeekDay =
  | 'Sunday'
  | 'Monday'
  | 'Tuesday'
  | 'Wednesday'
  | 'Thursday'
  | 'Friday'
  | 'Saturday';

@Component({
  selector: 'app-week-day-dropdown',
  imports: [CommonModule],
  templateUrl: './week-day-dropdown.component.html',
  styleUrl: './week-day-dropdown.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: DROPDOWN,
      useExisting: forwardRef(() => WeekDayDropdownComponent),
    },
  ],
})
export class WeekDayDropdownComponent implements Dropdown {
  weekDays: WeekDay[] = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];
  weekDay = new FormControl<WeekDay | null>(this.weekDays[0]);
  selected: string = this.weekDays[0];
  onSelect(v: string) {
    this.selected = v;
    this.valueChanges.next();
  }

  valueChanges = new Subject<void>();
}
