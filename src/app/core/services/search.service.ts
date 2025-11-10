import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  readonly #search = signal('');

  setSearch(value: string): void {
    this.#search.set(value);
  }

  readonly search = this.#search.asReadonly();
}
