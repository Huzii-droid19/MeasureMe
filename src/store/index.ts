import {configureStore} from '@reduxjs/toolkit';
import {setupListeners} from '@reduxjs/toolkit/query';
import {Todo, Calendar} from './api';
import authSlice from './slice/authSlice';

const {TodoApi} = Todo;
const {CalendarApi} = Calendar;

export const store = configureStore({
  reducer: {
    [TodoApi.reducerPath]: TodoApi.reducer,
    [CalendarApi.reducerPath]: CalendarApi.reducer,
    auth: authSlice,
  },
  middleware: getDefaultMiddleware => [
    ...getDefaultMiddleware(),
    TodoApi.middleware,
    CalendarApi.middleware,
  ],
});

setupListeners(store.dispatch);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
