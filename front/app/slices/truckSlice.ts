import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import type { RootState } from '../../app/store';
import { TruckInterface } from '../../interfaces/truckInterface';

import constants from '../constants';

export type TrucksState = {
  data: [TruckInterface?];
  pending: boolean;
  error: boolean;
};

const initialState: TrucksState = {
  data: [],
  pending: false,
  error: false,
};

export const listTrucks = createAsyncThunk('truck', async () => {
  const response = await axios.get(constants.api.truck);

  return response.data;
});

export const trucksSlice = createSlice({
  name: 'trucks',
  initialState,
  reducers: {},
  extraReducers: (builder: any) => {
    builder
      .addCase(listTrucks.pending, (state: TrucksState) => {
        state.pending = true;
      })
      .addCase(
        listTrucks.fulfilled,
        (state: TrucksState, response: { payload: any }) => {
          const { payload } = response;
          state.pending = false;
          state.data = payload;
        }
      )
      .addCase(listTrucks.rejected, (state: TrucksState) => {
        state.pending = false;
        state.error = true;
      });
  },
});

export const listTrucksApp = (storeState: RootState) => storeState.trucks;
