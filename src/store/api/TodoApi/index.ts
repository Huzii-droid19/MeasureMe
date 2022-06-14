import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {BASE_URL} from '@env';

import {User, Task} from 'types';
import {first, getCurrentUserId} from 'utils';
import {store} from 'store';

export const TodoApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  tagTypes: ['User', 'Task'],
  endpoints: builder => ({
    getUserByDeviceId: builder.query<User, string>({
      query: deviceId => `users?DeviceId=${deviceId}`,
      transformResponse: (response: User[]) => first(response),
    }),
    getTasks: builder.query<Task[], void>({
      query: () => `users/${getCurrentUserId(store)}/Task`,
      providesTags: ['Task'],
    }),
    addTask: builder.mutation<Task, Task>({
      query: task => ({
        url: `users/${getCurrentUserId(store)}/Task`,
        method: 'POST',
        body: task,
      }),
      invalidatesTags: ['Task'],
    }),
    editTask: builder.mutation<Task, Task>({
      query: task => ({
        url: `users/${task.userId}/Task/${task.id}`,
        method: 'PUT',
        body: task,
      }),
      invalidatesTags: ['Task'],
    }),
    deleteTask: builder.mutation<Task, Task>({
      query: task => ({
        url: `users/${task.userId}/Task/${task.id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Task'],
    }),
    addUser: builder.mutation<User, User>({
      query: user => ({
        url: 'users',
        method: 'POST',
        body: user,
      }),
    }),
  }),
});

const {
  useGetTasksQuery,
  useGetUserByDeviceIdQuery,
  useAddTaskMutation,
  useAddUserMutation,
  useEditTaskMutation,
  useDeleteTaskMutation,
} = TodoApi;
export default {
  useGetTasksQuery,
  useGetUserByDeviceIdQuery,
  useAddTaskMutation,
  useAddUserMutation,
  useEditTaskMutation,
  useDeleteTaskMutation,
  TodoApi,
};
