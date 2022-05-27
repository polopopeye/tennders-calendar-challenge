import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { trucksSlice } from './slices/truckSlice';

export const store = configureStore({
  reducer: {
    trucks: trucksSlice.reducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
