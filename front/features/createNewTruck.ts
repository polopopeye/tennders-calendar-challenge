import constants from 'app/constants';

import axios from 'axios';
import { TruckInterface } from 'interfaces/truckInterface';

const createNewTruck = (truck: TruckInterface, next?: Function) => {
  axios
    .post(constants.api.truck, truck)
    .then((res) => {
      console.log('🚀 ~ file: createNewTruck.ts ~ line 10 ~ .then ~ res', res);
      if (next) next();
    })
    .catch((err) => {
      console.log(
        '🚀 ~ file: createNewEvent.ts ~ line 8 ~ axios.put ~ err',
        err
      );
    });
};

export default createNewTruck;
