import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  Min,
} from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';

export class CreateTruckDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: `truck Company Name` })
  companyName: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: `truck driver name` })
  driverName: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: `truck plate number` })
  plateNumber: string;

  @IsOptional()
  @ApiProperty({ description: `truck GPS Position` })
  position: {
    longitude: number;
    latitude: number;
  };

  @IsNotEmpty()
  @ApiProperty({ description: `truck country & city location` })
  location: {
    country: string;
    city: string;
  };

  @IsNotEmpty()
  @ApiProperty({ description: `is truck available?` })
  available: boolean;

  @IsNotEmpty()
  @ApiProperty({ description: `Truck image` })
  readonly image: string;
}

export class UpdateTruckDTO extends PartialType(CreateTruckDto) {}

export class PaginationTruckDTO {
  @IsOptional()
  @IsPositive()
  @ApiProperty()
  limit: number;

  @IsOptional()
  @Min(0)
  @ApiProperty()
  offset: number;
}
