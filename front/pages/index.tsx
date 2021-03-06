/* eslint-disable react-hooks/exhaustive-deps */
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { listEvents } from 'app/slices/eventsSlice';
import { listTrucks, listTrucksApp } from 'app/slices/truckSlice';
import TrucksSidebar from 'components/Calendar/TrucksSidebar/TrucksSidebar';
import Link from 'next/link';

import { useEffect } from 'react';

const Home = () => {
  const dispatch = useAppDispatch();

  const { data, pending, error } = useAppSelector(listTrucksApp);

  useEffect(() => {
    dispatch(listTrucks());
    dispatch(listEvents());
  }, []);

  if (pending) return 'loading... ';

  return (
    <>
      <h1 className="title"> TRUCKS</h1>
      <Link href="/truck/create">
        <button id="createTruckBtn" style={{ padding: '10px', margin: '10px' }}>
          Create New Truck
        </button>
      </Link>

      <Link href="/event/create">
        <button id="createEventBtn" style={{ padding: '10px', margin: '10px' }}>
          Create New Event
        </button>
      </Link>

      <TrucksSidebar></TrucksSidebar>

      {error && <p>Oops, something went wrong</p>}
    </>
  );
};

export default Home;
