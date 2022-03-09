import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = process.env.NEXT_PUBLIC_API_URL_BFF;

type AllergieResponse = [];

export const allergieSlice = createApi({
  reducerPath: 'allergiesApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: builder => ({
    getAllergies: builder.query<AllergieResponse, void>({
      query: () => ({ url: '/patients/1/allergies', method: 'get' })
    })
  })
});

export const { useGetAllergiesQuery } = allergieSlice;
