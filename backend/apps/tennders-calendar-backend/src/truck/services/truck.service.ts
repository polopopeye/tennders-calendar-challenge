import { Injectable, NotFoundException } from '@nestjs/common';

import { Like, Repository } from 'typeorm';
import {
  CreateTruckDto,
  PaginationTruckDTO,
  UpdateTruckDTO,
} from '../dtos/truck.dtos';
import { InjectRepository } from '@nestjs/typeorm';
import { TruckEntity } from '../entities/truck.entity';
import { response } from 'express';

@Injectable()
export class TruckService {
  constructor(
    @InjectRepository(TruckEntity)
    private truckRepository: Repository<TruckEntity>,
  ) {}

  //   TODO: CHANGE ID BY PROPER OBJECTID

  async findAll(params?: PaginationTruckDTO) {
    const { limit = 100, offset = 0 } = params;
    return this.truckRepository.find({
      order: {
        companyName: 'DESC',
      },
      skip: offset,
      take: limit,
    });
  }

  async findOne(id: any) {
    const truck = await this.truckRepository.findOne(id);
    if (!truck) throw new NotFoundException(`Tea #${id} not found`);

    return truck;
  }

  create(data: CreateTruckDto) {
    const newTruck = this.truckRepository.create(data);

    return this.truckRepository.save(newTruck);
  }

  async update(id: any, changes: UpdateTruckDTO) {
    const tea = await this.truckRepository.findOne(id);
    if (!tea) throw new NotFoundException(`Truck #${id} not found`);
    this.truckRepository.merge(tea, changes);
    return this.truckRepository.save(tea);
  }

  async remove(id: any) {
    const tea = await this.truckRepository.findOne(id);
    if (!tea) throw new NotFoundException(`Tea #${id} not found`);
    return this.truckRepository.delete(id);
  }

  async search(searchString: string, limit: number, offset: number) {
    let response;
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
