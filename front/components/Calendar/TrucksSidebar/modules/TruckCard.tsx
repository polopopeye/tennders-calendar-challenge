import { TruckInterface } from 'interfaces/truckInterface';
import Image from 'next/image';
import React from 'react';

const TruckCard = (props: { truck: TruckInterface }) => {
  const { truck } = props;
  return (
    <>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          maxWidth: '500px',
          borderRight: '1px solid #ccc',
          borderBottom: '1px solid #ccc',
          padding: '10px',
          margin: '10px',
          maxHeight: '230px',
        }}
      >
        <div style={{ width: '200px' }}>
          <Image
            unoptimized
            src={truck.image || 'https://picsum.photos/id/237/200/200'}
            width="200"
            height="200"
            alt="truck"
            style={{
              borderRadius: '10em',
              maxWidth: '200px',
              maxHeight: '200px',
            }}
          />
        </div>
        <div>
          <h3 className="tittle">{truck.driverName}</h3>
          <h4 style={{ margin: 0, padding: 0 }}>{truck.companyName}</h4>
          <p style={{ margin: 0, padding: 0 }}>
            Plate Number: {truck.plateNumber}
          </p>

          <p style={{ margin: 0, padding: 0 }}>
            country: {truck.location.country}
          </p>
          <p style={{ margin: 0, padding: 0 }}>city: {truck.location.city}</p>
          <p style={{ margin: 0, padding: 0 }}>
            {/* TODO: I WANTED TO MAKE IT ONLINE WITH A WEBSOCKET, THE CURRENT TIME AND THE EVENT DATES OF TODAY */}
            Current Status: {truck.available ? 'Available' : 'Unavailable'}
          </p>
        </div>
      </div>
    </>
  );
};

export default TruckCard;
