import { store } from 'app/store';
import { EventInterface } from 'interfaces/eventInterface';
import { TruckInterface } from 'interfaces/truckInterface';
import React, { useState } from 'react';
import CardInfo from './modules/CardInfo';

const TrucksSidebar = () => {
  const createArrayOfDates = (startDate: any, endDate: any) => {
    const arr = [];
    let dt = new Date(startDate);
    const de = new Date(endDate);
    while (dt <= de) {
      arr.push(new Date(dt).toDateString());
      dt.setDate(dt.getDate() + 1);
    }
    return arr;
  };

  const now = new Date().toISOString().substring(0, 10);

  const arrDates = createArrayOfDates(now, '2022-07-01');

  const [trucks, setTrucks] = useState(
    store.getState().trucks.data as TruckInterface[]
  );

  store.subscribe(() => {
    setTrucks(store.getState().trucks.data as TruckInterface[]);
  });

  return (
    <>
      <div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '500px 1fr',
            width: '100%',
            overflowX: 'scroll',
            overflowY: 'hidden',
          }}
        >
          <div
            style={{
              maxWidth: '500px',
              backgroundColor: 'rgb(30 41 59)',
              color: 'white',
              margin: 'auto',
              textAlign: 'center',
            }}
          >
            I wanted to put a searcher here... to filter the trucks
            <input
              type="text"
              style={{
                width: '90%',
                padding: '5px',
                borderRadius: '5px',
                margin: '10px',
              }}
            ></input>
          </div>
          <div
            style={{
              background: 'rgb(15 23 42)',
              color: 'white',
              width: '100%',
            }}
          >
            <div
              style={{
                display: 'flex',
                textAlign: 'center',
              }}
            >
              {arrDates.map((date, index) => {
                return (
                  <div
                    key={index}
                    style={{
                      minWidth: '400px',
                      maxWidth: '400px',
                      margin: '10px',
                      padding: '10px',
                    }}
                  >
                    {date}
                  </div>
                );
              })}
            </div>
          </div>
          {trucks.map((truck: TruckInterface, i) => {
            return (
              <>{arrDates && <CardInfo arrDates={arrDates} truck={truck} />}</>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default TrucksSidebar;
