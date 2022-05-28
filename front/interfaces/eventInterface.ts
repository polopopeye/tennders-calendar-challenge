export type EventInterface = {
  id?: string;

  truckId: string;

  event: string;

  available: boolean;

  time: 'morning' | 'fulltime' | 'evening';
  date: string;

  createdAt?: Date;
  updatedAt?: Date;
};
