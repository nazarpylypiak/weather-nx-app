import { computed, Injectable, signal } from '@angular/core';
import {
  PrecipitationUnit,
  TemperatureUnit,
  Units,
  UnitType,
  WindSpeedUnit,
} from '@shared/models/unit.model';

@Injectable({
  providedIn: 'root',
})
export class UnitsService {
  #units = signal<{
    temperature: TemperatureUnit;
    windSpeed: WindSpeedUnit;
    precipitation: PrecipitationUnit;
  }>(this.getStoredUnits());

  getStoredUnits() {
    const defaultUnits = {
      temperature: 'celsius',
      windSpeed: 'kmh',
      precipitation: 'mm',
    };
    try {
      const units = localStorage.getItem('units');

      return units ? JSON.parse(units) : defaultUnits;
    } catch {
      return defaultUnits;
    }
  }

  getUnits = computed(() => this.#units());

  setUnit(type: UnitType, unit: Units) {
    this.#units.update((current) => {
      const updated = { ...current, [type]: unit };
      return updated;
    });
    localStorage.setItem('units', JSON.stringify(this.#units()));
  }

  getUnit(type: Units) {
    return this.#units()[type];
  }
}
