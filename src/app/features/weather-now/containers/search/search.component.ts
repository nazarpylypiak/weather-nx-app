import { AsyncPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {
  MAT_AUTOCOMPLETE_DEFAULT_OPTIONS,
  MatAutocompleteModule,
} from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_FORM_FIELD_DEFAULT_OPTIONS,
  MatFormFieldModule,
} from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { DataService } from '@shared/services/data.service';
import { OpenMeteoService } from '@shared/services/open-meteo.service';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  Observable,
  switchMap,
  tap,
} from 'rxjs';

@Component({
  selector: 'app-search',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    MatIconModule,
    MatButtonModule,
    AsyncPipe,
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: {
        subscriptSizing: 'dynamic',
      },
    },
    {
      provide: MAT_AUTOCOMPLETE_DEFAULT_OPTIONS,
      useValue: {
        overlayPanelClass: 'search-autocomplete-panel',
      },
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class SearchComponent implements OnInit {
  searchCtrl = new FormControl<string>('');

  #openMeteo = inject(OpenMeteoService);
  #data = inject(DataService);

  filteredOptions: Observable<any[]>;

  ngOnInit(): void {
    this.filteredOptions = this.searchCtrl.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      filter((v) => typeof v === 'string'),
      tap((v) => {
        if (!v) this.#data.selectedCity = null;
      }),
      filter((v) => !!v),
      map((v) => v?.toLowerCase().trim()),
      switchMap((val) => this.#openMeteo.searchByCity(val))
    );
  }

  onSelected(value) {
    this.#data.selectedCity = value;
    this.searchCtrl.setValue(value.address.city, { emitEvent: false });
  }
}
