export interface Forecast {
  elevation: number;
  generationtime_ms: number;
  latitude: number;
  longitude: number;
  timezone: string;
  timezone_abbreviation: string;
  utc_offset_seconds: number;
  current: WeatherCurrent;
  hourly?: WeatherHourly;
  daily?: WeatherDaily;
  current_units: CurrentUnits;
  location: WeatherLoctaion;
}

export interface CurrentUnits {
  apparent_temperature: string;
  interval: string;
  precipitation: string;
  relative_humidity_2m: string;
  temperature_2m: string;
  time: string;
  wind_speed_10m: string;
}

export interface WeatherLoctaion {
  country: string;
  city: string;
}

export interface WeatherCurrent {
  interval: number;
  time: string;
  temperature_2m: number;
  apparent_temperature: number;
  relative_humidity_2m: number;
  wind_speed_10m: number;
  precipitation: number;
}

export interface WeatherHourly {
  time: string[];
  weather_code: number[];
  temperature_2m: number[];
}

export interface WeatherDaily {
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  time: string[];
  weather_code: number[];
}
