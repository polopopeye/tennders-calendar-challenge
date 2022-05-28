import { useAppDispatch, useAppSelector } from 'app/hooks';
import { listEventsApp } from 'app/slices/eventsSlice';
import { listTrucks, listTrucksApp, trucksSlice } from 'app/slices/truckSlice';
import { store } from 'app/store';
import { BackIcon } from 'components/commons/BackIcon';
import createNewEvent from 'features/createNewEvent';
import { EventInterface } from 'interfaces/eventInterface';
import { TruckInterface } from 'interfaces/truckInterface';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

const Create = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  useAppSelector(listTrucksApp);

  const [truckId, setTruckId] = useState('');
  const [event, setEventName] = useState('');
  const [time, setTime] = useState('' as EventInterface['time']);

  const [date, setDate] = useState(
    undefined as unknown as EventInterface['date']
  );

  const [trucks, setTrucks] = useState(
    store.getState().trucks.data as TruckInterface[]
  );

  store.subscribe(() => {
    setTrucks(store.getState().trucks.data as TruckInterface[]);
  });

  useEffect(() => {
    store.dispatch(listTrucks());
  }, []);

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
          <span> Select Truck: </span>
          <select
            id="selectTruck"
            onChange={(e) => {
              setTruckId(e.target.value);
            }}
          >
            <option value=""></option>
            {trucks.map((truck: TruckInterface, i) => {
              const { id, driverName, companyName, location, available } =
                truck;
              console.log(
                '🚀 ~ file: create.tsx ~ line 158 ~ {trucks.map ~ truck',
                truck
              );

              return (
                <option value={id} key={i}>
                  {driverName} - Company: {companyName} - Country:
                  {location.country} - City: {location.city} -{' '}
                  {available ? 'Available' : 'Not Available'}
                </option>
              );
            })}
          </select>
        </div>

        <div>
          <span> Event name: </span>
          <input
            type="text"
            placeholder="Event Name"
            onChange={(e) => {
              setEventName(e.target.value);
            }}
          ></input>
        </div>

        <div>
          <span> Select Time: </span>
          <select
            id="selectTime"
            onChange={(e) => {
              setTime(e.target.value as EventInterface['time']);
            }}
          >
            <option value=""></option>
            <option value="morning">Morning</option>
            <option value="evening">Evening</option>
            <option value="fulltime">Fulltime</option>
          </select>
        </div>
        <div>
          <span> Select Date of the event: </span>
          <input
            type="date"
            onChange={(e) => {
              const datum = new Date(e.target.value).toISOString();

              setDate(datum as unknown as EventInterface['date']);
            }}
          />
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
          id="createEventBtn"
          onClick={() => {
            createNewEvent(
              {
                truckId,
                event,
                time,
                date: date as string,
                available: true,
              },
              () => {
                dispatch(listTrucks());
                router.push('/');
              }
            );
          }}
        >
          Create Event
        </button>
      </div>
    </>
  );
};

export default Create;
