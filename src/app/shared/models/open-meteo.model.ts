import {
  PrecipitationUnit,
  TemperatureUnit,
  WindSpeedUnit,
} from '@shared/models/unit.model';

export interface OpenMeteoReq {
  lat: number;
  lng: number;
  current?: string[];
  hourly?: string[];
  daily?: string[];
  timezone?: string;
  temperature_unit?: TemperatureUnit;
  wind_speed_unit?: WindSpeedUnit;
  precipitation_unit?: PrecipitationUnit;
  locale?: string;
}

export interface OpenMeteoGeoRes {
  generationtime_ms: number;
  results: {
    admin1: string;
    country: string;
    name: string;
    latitude: number;
    longitude: number;
  }[];
}
