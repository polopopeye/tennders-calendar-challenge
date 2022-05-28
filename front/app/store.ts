import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { eventsSlice } from './slices/eventsSlice';
import { trucksSlice } from './slices/truckSlice';

export const store = configureStore({
  reducer: {
    trucks: trucksSlice.reducer,
    events: eventsSlice.reducer,
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
