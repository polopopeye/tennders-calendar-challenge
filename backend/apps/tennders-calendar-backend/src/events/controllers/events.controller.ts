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
  CreateEventDto,
  PaginationEventDTO,
  UpdateEventDTO,
} from '../dtos/events.dtos';
import { EventService } from '../services/events.services';

// CHANGE ID BY PROPER OBJECTID

@ApiTags('Events')
@Controller('events')
export class EventsController {
  constructor(private eventService: EventService) {}

  @Get()
  @ApiOperation({ summary: 'List of Events' })
  getEvents(@Query() params: PaginationEventDTO) {
    return this.eventService.findAll(params);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get the properties of a event by the id given' })
  @HttpCode(HttpStatus.ACCEPTED)
  getOne(@Param('id') id: any) {
    return this.eventService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new event' })
  create(@Body() payload: CreateEventDto) {
    return this.eventService.create(payload);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Edit the properties of an event' })
  update(@Param('id') id: any, @Body() payload: UpdateEventDTO) {
    return this.eventService.update(id, payload);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete event from the database' })
  delete(@Param('id') id: any) {
    return this.eventService.remove(id);
  }

  @Get('search')
  @ApiOperation({ summary: 'Search an event by name' }) //TODO: ADD  other fields of search
  search(
    @Query('s') search: string,
    @Query('limit') limit: number,
    @Query('offset') offset: number,
  ) {
    return this.eventService.search(search, limit, offset);
  }
}
