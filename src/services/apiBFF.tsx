import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { TVaccinesData } from './getExamResultsData.service';

const baseUrl = process.env.NEXT_PUBLIC_API_URL_BFF;

type TAllergies = {
  description: string;
  isActive: boolean;
  comments: string;
  performer: string;
  specialization: string;
};

type AllergieResponse = {
  allergies: TAllergies[];
};

// Create our baseQuery instance
const baseQuery = fetchBaseQuery({
  baseUrl: baseUrl,
  prepareHeaders: headers => {
    // By default, if we have a token, let's use that for authenticated requests
    const token = null;
    if (token) {
      headers.set('authentication', `Bearer ${token}`);
    }
    return headers;
  }
});

export const apiBFF = createApi({
  baseQuery: baseQuery,
  endpoints: builder => ({
    getAllergies: builder.query<AllergieResponse, void>({
      query: () => ({ url: '/patients/1/allergies', method: 'get' })
    }),
    getVaccines: builder.query<TVaccinesData, string>({
      query: userId => ({ url: `/patients/${userId}/vaccines`, method: 'get' })
    })
  })
});

export const { useGetAllergiesQuery, useGetVaccinesQuery } = apiBFF;
