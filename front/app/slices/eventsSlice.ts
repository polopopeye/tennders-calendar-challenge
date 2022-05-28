import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import type { RootState } from '../store';

import constants from '../constants';
import { EventInterface } from 'interfaces/eventInterface';

export type EventsState = {
  data: [EventInterface?];
  pending: boolean;
  error: boolean;
};

const initialState: EventsState = {
  data: [],
  pending: false,
  error: false,
};

export const listEvents = createAsyncThunk('event', async () => {
  const response = await axios.get(constants.api.event);

  return response.data;
});

export const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {},
  extraReducers: (builder: any) => {
    builder
      .addCase(listEvents.pending, (state: EventsState) => {
        state.pending = true;
      })
      .addCase(
        listEvents.fulfilled,
        (state: EventsState, response: { payload: any }) => {
          const { payload } = response;
          state.pending = false;
          state.data = payload;
        }
      )
      .addCase(listEvents.rejected, (state: EventsState) => {
        state.pending = false;
        state.error = true;
      });
  },
});

export const listEventsApp = (storeState: RootState) => storeState.events;
