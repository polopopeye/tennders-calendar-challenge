import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  Min,
} from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';

export class CreateEventDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: `Truck UID owner of the event` })
  truckId: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: `Event Name` })
  event: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: `date of the event` })
  date: string;

  @IsNotEmpty()
  @ApiProperty({ description: `time type` })
  time: 'morning' | 'evening' | 'fulltime';

  @IsNotEmpty()
  @ApiProperty({ description: `is truck available? for this event` })
  available: boolean;
}

export class UpdateEventDTO extends PartialType(CreateEventDto) {}

export class PaginationEventDTO {
  @IsOptional()
  @IsPositive()
  @ApiProperty()
  limit: number;

  @IsOptional()
  @Min(0)
  @ApiProperty()
  offset: number;
}
