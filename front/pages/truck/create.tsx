/* eslint-disable @next/next/no-img-element */
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { listTrucks, listTrucksApp } from 'app/slices/truckSlice';
import { BackIcon } from 'components/commons/BackIcon';
import createNewTruck from 'features/createNewTruck';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useRef, useState } from 'react';

const Create = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  useAppSelector(listTrucksApp);

  const [driverName, setDriverName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [plateNumber, setPlateNumber] = useState('');

  const randomNumber = Math.floor(Math.random() * 99999);
  const [image, setImage] = useState(
    'https://picsum.photos/seed/' + randomNumber + '/200/200'
  );

  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');

  return (
    <>
      <Link href="/">
        <button style={{ padding: '2px', margin: '10px' }}>
          <BackIcon /> Go back to calendar
        </button>
      </Link>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          gap: '10px',
          padding: '10px',
          margin: '10px',
        }}
      >
        <div>
          <span> Driver Name: </span>
          <input
            type="text"
            placeholder="driver name"
            onChange={(e) => {
              setDriverName(e.target.value);
            }}
          ></input>
        </div>

        <div>
          <span> Company Name: </span>
          <input
            type="text"
            placeholder="company name"
            onChange={(e) => {
              setCompanyName(e.target.value);
            }}
          ></input>
        </div>

        <div>
          <span> Plate Number: </span>
          <input
            type="text"
            placeholder="plate number"
            onChange={(e) => {
              setPlateNumber(e.target.value);
            }}
          ></input>
        </div>

        <div>
          <span>Preview Profile Image: </span>
          <br />
          <img
            src={image}
            style={{ width: '200px', height: '200px' }}
            alt=""
          ></img>
          <hr />
          <span>Profile Image Link: </span>

          <input
            type="text"
            placeholder="image src"
            defaultValue={image}
            onChange={(e) => {
              setImage(e.target.value);
            }}
          ></input>
        </div>

        <div>
          <span>Country: </span>
          <input
            type="text"
            placeholder="country"
            onChange={(e) => {
              setCountry(e.target.value);
            }}
          ></input>
        </div>

        <div>
          <span>City: </span>
          <input
            type="text"
            placeholder="city"
            onChange={(e) => {
              setCity(e.target.value);
            }}
          ></input>
        </div>
      </div>
      <div
        style={{
          width: '100%',
          margin: 'auto',
          textAlign: 'center',
          padding: '10px',
        }}
      >
        <button
          onClick={() => {
            createNewTruck(
              {
                driverName,
                companyName,
                plateNumber,
                image,
                location: {
                  country,
                  city,
                },
                available: true,
              },
              () => {
                dispatch(listTrucks());
                router.push('/');
              }
            );
          }}
        >
          Create new Truck
        </button>
      </div>
    </>
  );
};

export default Create;
