import {
  ObjectIdColumn,
  ObjectID,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Entity,
} from 'typeorm';

@Entity({ name: 'Event' })
export class EventEntity {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  truckId: string;

  @Column()
  event: string;

  @Column()
  available: boolean;

  @Column()
  time: string;

  @Column()
  date: string;

  @CreateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
