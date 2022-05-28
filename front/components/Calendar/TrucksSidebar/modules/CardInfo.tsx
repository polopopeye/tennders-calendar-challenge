import { store } from 'app/store';
import { TruckInterface } from 'interfaces/truckInterface';
import React, { useState } from 'react';
import TruckCard from './TruckCard';

const CardInfo = (props: {
  arrDates: Array<string>;
  truck: TruckInterface;
}) => {
  const { arrDates, truck } = props;

  const [event, setEvent] = useState(
    store.getState().events.data.filter((event) => event?.truckId === truck.id)
  );

  store.subscribe(() => {
    setEvent(
      store
        .getState()
        .events.data.filter((event) => event?.truckId === truck.id)
    );
  });

  return (
    <>
      <div>
        {/* Body1 */}
        <TruckCard truck={truck} />
      </div>
      <div style={{ display: 'flex' }}>
        {/* Body 2 */}
        {arrDates.map((date, index) => {
          const timeStamp = Date.parse(date) + 24 * 60 * 60 * 1000;
          const isoDate = new Date(timeStamp).toISOString().substring(0, 10);

          const eventsThisDay = [];
          for (let i = 0; i < event.length; i++) {
            const eventIsoDate = event[i]?.date.substring(0, 10);
            if (eventIsoDate === isoDate) {
              eventsThisDay.push(event[i]);
            }
          }

          return (
            <div
              key={index}
              style={{
                height: '200px',
                width: '400px',
                padding: '10px',
                margin: '10px',
                border: '1px solid grey',
                borderRadius: '5px',
                display: 'grid',
                gridTemplateRows: '1fr',
              }}
            >
              <div style={{ height: '90px', background: 'rgb(226 232 240)' }}>
                <p
                  style={{
                    textAlign: 'left',
                    marginTop: '-5px',
                    fontSize: '12px',
                  }}
                >
                  Morning:
                </p>
                {eventsThisDay.filter(
                  (event) =>
                    event?.time === 'morning' || event?.time === 'fulltime'
                ).length ? (
                  <>
                    {eventsThisDay
                      .filter(
                        (event) =>
                          event?.time === 'morning' ||
                          event?.time === 'fulltime'
                      )
                      .map((event, i) => {
                        return (
                          <p
                            style={{ paddingLeft: '1em', fontSize: '14px' }}
                            key={i}
                          >
                            {event?.event}
                          </p>
                        );
                      })}
                  </>
                ) : (
                  <>
                    <p style={{ paddingLeft: '1em' }}>FREE</p>
                  </>
                )}
              </div>
              <div style={{ height: '90px', background: 'rgb(241 245 249)' }}>
                <p
                  style={{
                    textAlign: 'left',
                    marginTop: '-5px',
                    fontSize: '12px',
                  }}
                >
                  Evening:
                </p>

                {eventsThisDay.filter(
                  (event) =>
                    event?.time === 'evening' || event?.time === 'fulltime'
                ).length ? (
                  <>
                    {eventsThisDay
                      .filter(
                        (event) =>
                          event?.time === 'evening' ||
                          event?.time === 'fulltime'
                      )
                      .map((event, i) => {
                        return (
                          <p style={{ paddingLeft: '1em' }} key={i}>
                            {event?.event}
                          </p>
                        );
                      })}
                  </>
                ) : (
                  <>
                    <p style={{ paddingLeft: '1em' }}>FREE</p>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default CardInfo;
