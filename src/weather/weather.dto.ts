import { IsNumber, IsString } from 'class-validator';

export class WeatherItemDto {
  @IsNumber()
  value: number;

  @IsString()
  time: string;

  @IsString()
  location: string;
}

export class WeatherDataDto {
  @IsNumber()
  temperature: number;

  @IsNumber()
  humidity: number;

  @IsNumber()
  precipitation: number;

  @IsNumber()
  windSpeed: number;

  @IsNumber()
  windDirection: number;

  @IsNumber()
  visibility: number;

  @IsNumber()
  airPressure: number;

  @IsNumber()
  weatherCode: number;
}
