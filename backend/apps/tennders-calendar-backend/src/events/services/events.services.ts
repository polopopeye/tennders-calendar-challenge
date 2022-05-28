import { Injectable, NotFoundException } from '@nestjs/common';

import { Like, Repository } from 'typeorm';

import { InjectRepository } from '@nestjs/typeorm';

import { EventEntity } from '../entities/events.entity';
import {
  CreateEventDto,
  PaginationEventDTO,
  UpdateEventDTO,
} from '../dtos/events.dtos';
import { RedisProvider } from '../../database/redis.provider';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(EventEntity)
    private eventRepository: Repository<EventEntity>,
    private redisClient: RedisProvider,
  ) {}

  //   TODO: CHANGE ID BY PROPER OBJECTID

  async findAll(params?: PaginationEventDTO) {
    const { limit = 100, offset = 0 } = params;
    const tableName = this.eventRepository.metadata.tableName;
    const redisData = await this.redisClient.get(tableName);

    if (!redisData) {
      const dbData = await this.eventRepository.find({
        skip: offset,
        take: limit,
      });
      if (dbData) this.redisClient.update(tableName, dbData);

      console.log('served from db');
      return dbData;
    }

    return redisData;
  }

  async findOne(id: any) {
    const tableName = this.eventRepository.metadata.tableName + id;
    const redisData = await this.redisClient.get(tableName);

    if (!redisData) {
      const dbData = await this.eventRepository.findOne(id);
      if (dbData) this.redisClient.update(tableName, dbData);
      if (!dbData) throw new NotFoundException(`Event #${id} not found`);
      console.log('served from db');
      return dbData;
    }

    console.log('served from redis');
    return redisData;
  }

  create(data: CreateEventDto) {
    const newEvent = this.eventRepository.create(data);

    const tableName = this.eventRepository.metadata.tableName;
    this.redisClient.delete(tableName);

    return this.eventRepository.save(newEvent);
  }

  async update(id: any, changes: UpdateEventDTO) {
    const event = await this.eventRepository.findOne(id);
    if (!event) throw new NotFoundException(`Event #${id} not found`);
    this.eventRepository.merge(event, changes);
    return this.eventRepository.save(event);
  }

  async remove(id: any) {
    const event = await this.eventRepository.findOne(id);
    if (!event) throw new NotFoundException(`Event #${id} not found`);
    return this.eventRepository.delete(id);
  }

  // TODO: ADD REDIS LOGIC TO THE SEARCH
  async search(searchString: string, limit: number, offset: number) {
    let response;
    response = await this.eventRepository.find({
      where: {
        truckId: Like(`%${searchString}%`),
      },
      //   TODO: ORDER BY DATE
      //   order: {
      //     companyName: 'DESC',
      //   },
      take: limit,
      skip: offset,
    });

    // TODO: FIND BY OTHER FIELDS - to Improve this
    if (!response.length) {
      response = await this.eventRepository.find({
        where: {
          time: Like(`%${searchString}%`),
        },

        take: limit,
        skip: offset,
      });
    }

    if (!response.length) {
      const findAvailable =
        searchString.toLowerCase() === 'available' ? true : false;

      if (
        searchString.toLowerCase() === 'available' ||
        searchString.toLowerCase() === 'busy'
      ) {
        response = await this.eventRepository.find({
          where: {
            available: findAvailable,
          },
          order: {
            available: 'DESC',
          },
          take: limit,
          skip: offset,
        });
      }
    }

    return response;
  }
}
