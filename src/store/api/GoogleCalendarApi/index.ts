import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {GOOGEL_CALENDAR_BASE_URL} from '@env';

import {CalendarApiParams} from 'types';

export const CalendarApi = createApi({
  reducerPath: 'calendarApi',
  baseQuery: fetchBaseQuery({
    baseUrl: GOOGEL_CALENDAR_BASE_URL,
    prepareHeaders: headers => {
      headers.set('Content-Type', 'application/json');
      headers.set('Accept', 'application/json');
      return headers;
    },
  }),
  endpoints: builder => ({
    addTaskToGoogleCalendar: builder.mutation<
      Record<string, any>,
      CalendarApiParams
    >({
      query: params => ({
        url: `calendars/primary/events`,
        method: 'POST',
        body: params.task,
        params: {
          conferenceDataVersion: 1,
        },
        headers: {
          Authorization: `Bearer ${params.accessToken}`,
        },
      }),
    }),
  }),
});

const {useAddTaskToGoogleCalendarMutation} = CalendarApi;
export default {
  useAddTaskToGoogleCalendarMutation,
  CalendarApi,
};
