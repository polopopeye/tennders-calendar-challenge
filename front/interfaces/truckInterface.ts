export type TruckInterface = {
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
  position?: {
    longitude: number;
    latitude: number;
  };

  createdAt: Date;
  updatedAt: Date;
};
