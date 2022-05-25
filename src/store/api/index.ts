import {
  createApi,
  fetchBaseQuery,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';
import {User, Task} from '../../types';
import {getUniqueId} from 'react-native-device-info';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://625d362e95cd5855d61d27f0.mockapi.io/api/v1/',
  }),
  tagTypes: ['User', 'Task'],
  endpoints: builder => ({
    getUserByDeviceId: builder.query<User, string>({
      query: deviceId => `users?DeviceId=${deviceId}`,
      transformResponse: (response: User[]) => {
        const user = response.shift();
        return user;
      },
    }),
    getTasks: builder.query<Task[], string>({
      async queryFn(_arg, _queryApi, _extraOptioins, fetchWithBQ) {
        const response = await fetchWithBQ(`users?DeviceId=${_arg}`);
        if (response.error) {
          return {error: response.error as FetchBaseQueryError};
        }
        const taskOwner = response.data as User[];
        const id = taskOwner.shift()?.id;
        if (id === undefined) {
          return {
            error: {
              status: 404,
              data: undefined,
              error: 'User not found',
            } as FetchBaseQueryError,
          };
        }
        const result = await fetchWithBQ(`users/${id}/Task`);
        return result.data
          ? {data: result.data as Task[]}
          : {error: result.error as FetchBaseQueryError};
      },
      providesTags: ['Task'],
    }),
    addTask: builder.mutation<Task, Object>({
      async queryFn(_arg, _queryApi, _extraOptioins, fetchWithBQ) {
        const response = await fetchWithBQ(`users?DeviceId=${getUniqueId()}`);
        if (response.error) {
          return {error: response.error as FetchBaseQueryError};
        }
        const taskOwner = response.data as User[];
        const id = taskOwner.shift()?.id;
        if (id === undefined) {
          return {
            error: {
              status: 404,
              data: undefined,
              error: 'User not found',
            } as FetchBaseQueryError,
          };
        }
        const result = await fetchWithBQ({
          url: `users/${id}/Task`,
          method: 'POST',
          body: _arg,
        });
        return result.data
          ? {data: result.data as Task}
          : {error: result.error as FetchBaseQueryError};
      },
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
