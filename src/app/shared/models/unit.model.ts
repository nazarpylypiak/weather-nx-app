export type TemperatureUnit = 'celsius' | 'fahrenheit';
export type WindSpeedUnit = 'kmh' | 'mph';
export type PrecipitationUnit = 'mm' | 'inch';
export type Units = TemperatureUnit | WindSpeedUnit | PrecipitationUnit;
export enum UnitType {
  TEMPERATURE = 'temperature',
  WIND_SPEED = 'windSpeed',
  PRECIPITATION = 'precipitation',
}

export interface Unit<T> {
  value: T;
  label: string;
}
