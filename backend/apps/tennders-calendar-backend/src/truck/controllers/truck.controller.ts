import {
  Controller,
  Get,
  Query,
  Param,
  Post,
  Body,
  Put,
  Delete,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import {
  CreateTruckDto,
  PaginationTruckDTO,
  UpdateTruckDTO,
} from '../dtos/truck.dtos';
import { TruckService } from '../services/truck.service';

// CHANGE ID BY PROPER OBJECTID

@ApiTags('truck')
@Controller('truck')
export class TruckController {
  constructor(private truckService: TruckService) {}

  @Get()
  @ApiOperation({ summary: 'List of trucks' })
  getTrucks(@Query() params: PaginationTruckDTO) {
    return this.truckService.findAll(params);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get the properties of a truck by the id given' })
  @HttpCode(HttpStatus.ACCEPTED)
  getOne(@Param('id') id: any) {
    return this.truckService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new truck' })
  create(@Body() payload: CreateTruckDto) {
    console.log(
      '🚀 ~ file: truck.controller.ts ~ line 44 ~ TruckController ~ create ~ payload',
      payload,
    );
    return this.truckService.create(payload);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Edit the properties of a truck' })
  update(@Param('id') id: any, @Body() payload: UpdateTruckDTO) {
    return this.truckService.update(id, payload);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete truck from the database' })
  delete(@Param('id') id: any) {
    return this.truckService.remove(id);
  }

  @Get('search')
  @ApiOperation({ summary: 'Search a truck by name' }) //TODO: ADD  other fields of search
  search(
    @Query('s') search: string,
    @Query('limit') limit: number,
    @Query('offset') offset: number,
  ) {
    return this.truckService.search(search, limit, offset);
  }
}
