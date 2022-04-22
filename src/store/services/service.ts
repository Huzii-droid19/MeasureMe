import {
  createApi,
  fetchBaseQuery,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';

interface User {
  id: number;
  name: string;
  DeviceId: number;
}
interface Task {
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
    // getUserByDeviceId: builder.query<User, number>({
    //   query: deviceId => `users?DeviceId=${deviceId}`,
    // }),
    // getTaskByUserId: builder.query<Task, number>({
    //   query: userId => `users/${userId}/Task`,
    // }),
    getTasks: builder.query<Task, number>({
      async queryFn(_arg, _queryApi, _extraOptioins, fetchWithBQ) {
        const user = await fetchWithBQ(`users?DeviceId=${_arg}`);
        if (user.error) {
          throw user.error;
        }
        const taskOwner = user.data.slice(0, 1)[0] as User;
        const result = await fetchWithBQ(`users/${taskOwner.id}/Task`);
        //console.log(result.data);
        return result.data
          ? {data: result.data as Task}
          : {error: result.error as FetchBaseQueryError};
      },
    }),
  }),
});

export const {useGetTasksQuery} = userApi;
