import {
  createApi,
  fetchBaseQuery,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';
import {User, Task} from '../../types';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://625d362e95cd5855d61d27f0.mockapi.io/api/v1/',
  }),
  endpoints: builder => ({
    getUserByDeviceId: builder.query<User, string>({
      query: deviceId => `users?DeviceId=${deviceId}`,
    }),
    getTasks: builder.query<Task[], string>({
      async queryFn(_arg, _queryApi, _extraOptioins, fetchWithBQ) {
        const {data, error}: {data: User[]; error: FetchBaseQueryError} =
          await fetchWithBQ(`users?DeviceId=${_arg}`);
        if (error) {
          return {error: error as FetchBaseQueryError};
        }
        const taskOwner = data.slice(0, 1)[0] as User;
        const result = await fetchWithBQ(`users/${taskOwner.id}/Task`);
        return result.data
          ? {data: result.data as Task[]}
          : {error: result.error as FetchBaseQueryError};
      },
    }),
    addTask: builder.mutation<Task, Task>({
      query: task => ({
        url: `users/${task.userId}/Task`,
        method: 'POST',
        body: task,
      }),
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
} = userApi;
