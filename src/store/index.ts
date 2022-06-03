import {configureStore} from '@reduxjs/toolkit';
import {setupListeners} from '@reduxjs/toolkit/query';
import {userApi, calendarApi} from './api';
import authSlice from './slice/authSlice';

export const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    [calendarApi.reducerPath]: calendarApi.reducer,
    auth: authSlice,
  },
  middleware: getDefaultMiddleware => [
    ...getDefaultMiddleware(),
    userApi.middleware,
    calendarApi.middleware,
  ],
});

setupListeners(store.dispatch);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
