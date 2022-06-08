// import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
// import {User, Task, CalendarApiParams} from 'types/index';
// import {BASE_URL, GOOGEL_CALENDAR_BASE_URL} from '@env';
// import {first, getCurrentUserId} from 'utils/index';
// import {store} from 'store/index';

// export const userApi = createApi({
//   reducerPath: 'userApi',
//   baseQuery: fetchBaseQuery({
//     baseUrl: BASE_URL,
//   }),
//   tagTypes: ['User', 'Task'],
//   endpoints: builder => ({
//     getUserByDeviceId: builder.query<User, string>({
//       query: deviceId => `users?DeviceId=${deviceId}`,
//       transformResponse: (response: User[]) => first(response),
//     }),
//     getTasks: builder.query<Task[], void>({
//       query: () => `users/${getCurrentUserId(store)}/Task`,
//       providesTags: ['Task'],
//     }),
//     addTask: builder.mutation<Task, Task>({
//       query: task => ({
//         url: `users/${getCurrentUserId(store)}/Task`,
//         method: 'POST',
//         body: task,
//       }),
//       invalidatesTags: ['Task'],
//     }),
//     editTask: builder.mutation<Task, Task>({
//       query: task => ({
//         url: `users/${task.userId}/Task/${task.id}`,
//         method: 'PUT',
//         body: task,
//       }),
//       invalidatesTags: ['Task'],
//     }),
//     deleteTask: builder.mutation<Task, Task>({
//       query: task => ({
//         url: `users/${task.userId}/Task/${task.id}`,
//         method: 'DELETE',
//       }),
//       invalidatesTags: ['Task'],
//     }),
//     addUser: builder.mutation<User, Object>({
//       query: user => ({
//         url: 'users',
//         method: 'POST',
//         body: user,
//       }),
//     }),
//   }),
// });

// export const calendarApi = createApi({
//   reducerPath: 'calendarApi',
//   baseQuery: fetchBaseQuery({
//     baseUrl: GOOGEL_CALENDAR_BASE_URL,
//   }),
//   endpoints: builder => ({
//     addTaskToGoogleCalendar: builder.mutation<Object, CalendarApiParams>({
//       query: params => ({
//         url: `calendars/primary/events`,
//         method: 'POST',
//         body: params.task,
//         headers: {
//           Authorization: `Bearer ${params.accessToken}`,
//           Accept: 'application/json',
//           'Content-Type': 'application/json',
//         },
//       }),
//     }),
//   }),
// });

// export const {
//   useGetTasksQuery,
//   useGetUserByDeviceIdQuery,
//   useAddTaskMutation,
//   useAddUserMutation,
//   useEditTaskMutation,
//   useDeleteTaskMutation,
// } = userApi;

// export const {useAddTaskToGoogleCalendarMutation} = calendarApi;

export {default as Calendar} from './GoogleCalendarApi';
export {default as Todo} from './TodoApi';
