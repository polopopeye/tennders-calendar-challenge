import { Injectable, NotFoundException } from '@nestjs/common';

import { Like, Repository } from 'typeorm';
import {
  CreateTruckDto,
  PaginationTruckDTO,
  UpdateTruckDTO,
} from '../dtos/truck.dtos';
import { InjectRepository } from '@nestjs/typeorm';
import { TruckEntity } from '../entities/truck.entity';

import { RedisProvider } from '../../database/redis.provider';

@Injectable()
export class TruckService {
  constructor(
    @InjectRepository(TruckEntity)
    private truckRepository: Repository<TruckEntity>,
    private redisClient: RedisProvider,
  ) {}

  async findAll(params?: PaginationTruckDTO) {
    const { limit = 100, offset = 0 } = params;
    const tableName = this.truckRepository.metadata.tableName;
    const redisData = await this.redisClient.get(tableName);

    if (!redisData) {
      const dbData = await this.truckRepository.find({
        order: {
          companyName: 'DESC',
        },
        skip: offset,
        take: limit,
      });
      if (dbData) this.redisClient.update(tableName, dbData);
      console.log('served from db');
      return dbData;
    }

    console.log('served from redis');
    return redisData;
  }

  async findOne(id: any) {
    const tableName = this.truckRepository.metadata.tableName + id;
    const redisData = await this.redisClient.get(tableName);

    if (!redisData) {
      const dbData = await this.truckRepository.findOne(id);
      if (dbData) this.redisClient.update(tableName, dbData);
      console.log('served from db');
      return dbData;
    }

    console.log('served from redis');
    return redisData;
  }

  create(data: CreateTruckDto) {
    const newTruck = this.truckRepository.create(data);

    const tableName = this.truckRepository.metadata.tableName;
    this.redisClient.delete(tableName);

    return this.truckRepository.save(newTruck);
  }

  async update(id: any, changes: UpdateTruckDTO) {
    const truck = await this.truckRepository.findOne(id);
    if (!truck) throw new NotFoundException(`Truck #${id} not found`);
    this.truckRepository.merge(truck, changes);
    return this.truckRepository.save(truck);
  }

  async remove(id: any) {
    const truck = await this.truckRepository.findOne(id);
    if (!truck) throw new NotFoundException(`Truck #${id} not found`);
    return this.truckRepository.delete(id);
  }

  async search(searchString: string, limit: number, offset: number) {
    // TODO: ADD REDIS LOGIC FOR THE SEARCH
    let response: string | any[];
    response = await this.truckRepository.find({
      where: {
        companyName: Like(`%${searchString}%`),
      },
      order: {
        companyName: 'DESC',
      },
      take: limit,
      skip: offset,
    });

    // TODO: FIND BY OTHER FIELDS - to Improve this
    if (!response.length) {
      response = await this.truckRepository.find({
        where: {
          driverName: Like(`%${searchString}%`),
        },
        order: {
          driverName: 'DESC',
        },
        take: limit,
        skip: offset,
      });
    }

    if (!response.length) {
      response = await this.truckRepository.find({
        where: {
          plateNumber: Like(`%${searchString}%`),
        },
        order: {
          plateNumber: 'DESC',
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
        response = await this.truckRepository.find({
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
