import {
  ObjectIdColumn,
  ObjectID,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Entity,
} from 'typeorm';

class GpsDecorator {
  @Column()
  latitude: number;

  @Column()
  longitude: number;
}

class LocationDecorator {
  @Column()
  country: string;

  @Column()
  city: string;
}

@Entity({ name: 'Truck' })
export class TruckEntity {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  companyName: string;

  @Column()
  driverName: string;

  @Column({ unique: true })
  plateNumber: string;

  @Column((type) => LocationDecorator)
  location: LocationDecorator;

  @Column((type) => GpsDecorator)
  position: GpsDecorator;

  @Column()
  available: boolean;

  @Column()
  image: string;

  @CreateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
