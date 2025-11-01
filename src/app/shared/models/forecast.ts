export interface Forecast {
  elevation: number;
  generationtime_ms: number;
  latitude: number;
  longitude: number;
  timezone: string;
  timezone_abbreviation: string;
  utc_offset_seconds: number;
  hourly?: Hourly;
}

export interface Hourly {
  time: string[];
  weather_code: number[];
  temperature_2m: number[];
}
