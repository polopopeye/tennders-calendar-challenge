import constants from 'app/constants';

import axios from 'axios';
import { EventInterface } from 'interfaces/eventInterface';

const createNewEvent = (event: EventInterface, next?: Function) => {
  axios
    .post(constants.api.event, event)
    .then((res) => {
      console.log('🚀 ~ file: createNewTruck.ts ~ line 10 ~ .then ~ res', res);
      if (next) next();
    })
    .catch((err) => {
      console.log(
        '🚀 ~ file: createNewEvent.ts ~ line 8 ~ axios.post ~ err',
        err
      );
    });
};

export default createNewEvent;
