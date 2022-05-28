import { Truck } from './truck';

it('is a valid Truck', () => {
  expect(
    new Truck({
      companyName: 'Test1',
      driverName: 'Test2',
      plateNumber: 'Test3',
      image: 'http://test.com/test.jpg',
      location: {
        country: 'Test4',
        city: 'Test5',
      },
      position: {
        longitude: 1,
        latitude: 1,
      },
      createdAt: new Date(2022, 1, 1),
    }).companyName
  ).toEqual('Test1');

  expect(
    new Truck({
      companyName: 'Test1',
      driverName: 'Test2',
      plateNumber: 'Test3',
      image: 'http://test.com/test.jpg',
      location: {
        country: 'Test4',
        city: 'Test5',
      },
      position: {
        longitude: 1,
        latitude: 1,
      },
      createdAt: new Date(2022, 1, 1),
    }).image
  ).toEqual('http://test.com/test.jpg');
});

it('getDate', () => {
  const getDate = new Truck({
    companyName: 'Test1',
    driverName: 'Test2',
    plateNumber: 'Test3',
    image: 'http://test.com/test.jpg',
    location: {
      country: 'Test4',
      city: 'Test5',
    },
    position: {
      longitude: 1,
      latitude: 1,
    },
    createdAt: new Date(2022, 1, 1),
  }).getDate();
  const expectedDate = jest.fn(() => new Date(2022, 1, 1));

  expect(getDate).toEqual(expectedDate());
});

it('getTitle', () => {
  const newTruck = new Truck({
    companyName: 'Test1',
    driverName: 'Test2',
    plateNumber: 'Test3',
    image: 'http://test.com/test.jpg',
    location: {
      country: 'Test4',
      city: 'Test5',
    },
    position: {
      longitude: 1,
      latitude: 1,
    },
    createdAt: new Date(2022, 1, 1),
  }).getDriverName();

  expect(newTruck).toEqual('Test2');
});
