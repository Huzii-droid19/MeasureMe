import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {User, Task} from '../../types';
import {BASE_URL} from '@env';
import * as _ from 'lodash';
import {store} from '..';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  tagTypes: ['User', 'Task'],
  endpoints: builder => ({
    getUserByDeviceId: builder.query<User, string>({
      query: deviceId => `users?DeviceId=${deviceId}`,
      transformResponse: (response: User[]) => _.first(response),
    }),
    getTasks: builder.query<Task[], void>({
      query: () => `users/${store.getState().auth.userMeta?.id}/Task`,
      providesTags: ['Task'],
    }),
    addTask: builder.mutation<Task, Task>({
      query: task => ({
        url: `users/${store.getState().auth.userMeta?.id}/Task`,
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
    addUser: builder.mutation<User, Object>({
      query: user => ({
        url: 'users',
        method: 'POST',
        body: user,
      }),
    }),
  }),
});

export const {
  useGetTasksQuery,
  useGetUserByDeviceIdQuery,
  useAddTaskMutation,
  useAddUserMutation,
  useEditTaskMutation,
  useDeleteTaskMutation,
} = userApi;
