import { mongoObjectId } from 'features/utils/mongoObjectGenerator';

export class Truck {
  id: string;
  available: boolean;
  companyName: string;
  driverName: string;
  plateNumber: string;
  image: string;
  location: {
    country: string;
    city: string;
  };
  position: {
    longitude: number;
    latitude: number;
  };

  private createdAt: Date;
  updatedAt: Date;

  constructor(data: any) {
    this.id = mongoObjectId();
    this.available = true;
    this.companyName = data.companyName;
    this.driverName = data.driverName;
    this.plateNumber = data.plateNumber;
    this.image = data.image;
    this.location = data.location;
    this.position = data.position;
    this.createdAt = data.createdAt;
    this.updatedAt = new Date();
  }

  getDate() {
    return this.createdAt;
  }
  getDriverName() {
    return this.driverName;
  }
}
