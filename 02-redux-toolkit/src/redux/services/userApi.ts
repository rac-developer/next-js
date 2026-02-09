import {createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { get } from 'http';

type User = {
  id: number;
  name: string;
  username: string;
  email: string;
}

export const userAPI = createApi({
  reducerPath: 'userAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://jsonplaceholder.typicode.com/'
  }),
  endpoints: (builder) => ({
    // .query: Cuando queramos pedir datos (Es como un query)
    // .mutation: CCuando queramos alterar datos en el backend
    getUsers: builder.query<User[], null>({
      query: () => 'users'
    }),
    getUserById: builder.query<User, {id: string}>({
      query: (id) => `users/${id}`
    })
  })
})

// Esto es lo que realmente vamos a ejecutar en codigo de react
export const {useGetUsersQuery, useGetUserByIdQuery} = userAPI;

