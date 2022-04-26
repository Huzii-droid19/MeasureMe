import {
  createApi,
  fetchBaseQuery,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';

export interface User {
  id: number;
  name: string;
  DeviceId: string;
}
export interface Task {
  id: number;
  title: null | string;
  description: null | string;
  date: null | Date;
  type: null | number;
  status: null | number;
  userId: null | number;
}

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://625d362e95cd5855d61d27f0.mockapi.io/api/v1/',
  }),
  endpoints: builder => ({
    getUserByDeviceId: builder.query<User, string>({
      query: deviceId => `users?DeviceId=${deviceId}`,
    }),
    getTasks: builder.query<Task, string>({
      async queryFn(_arg, _queryApi, _extraOptioins, fetchWithBQ) {
        const {data: user, error} = await fetchWithBQ(`users?DeviceId=${_arg}`);
        if (error) {
          throw error;
        }
        const taskOwner = user.slice(0, 1)[0] as User;

        const result = await fetchWithBQ(`users/${taskOwner.id}/Task`);
        return result.data
          ? {data: result.data as Task}
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
