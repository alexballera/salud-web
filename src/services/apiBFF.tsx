import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { TVaccinesData } from './getExamResultsData.service';

import { IMeasurementsData } from '../services/getMeasurementsData.service';
const baseUrl = process.env.NEXT_PUBLIC_API_URL_BFF;

type TAllergies = {
  id: string;
  description: string;
  isActive: boolean;
  comments: string;
  performer: string;
  specialization: string;
};

type AllergieResponse = {
  allergies: TAllergies[];
};

type THabits = {
  id: string;
  status?: boolean;
  addictionStatus?: string;
  passive?: boolean;
  quantity?: string;
  frequency?: string;
  period?: string;
  wantsToQuit?: boolean;
  type?: string;
  duration?: string;
  details?: string;
};

type THabitsDrugs = {
  name: string;
  observation: string;
};

type HabitsResponse = {
  smoking?: THabits;
  alcoholism?: THabits;
  physicalActivity?: THabits;
  drugs?: THabitsDrugs[];
};

type DiseasesResponse = {
  childhood?: [];
  adulthood?: [];
};

type TGeneralData = {
  userId: string;
  firstName: string;
  firstLastName: string;
  secondLastName: string;
  birthDate: string;
  height: number;
  weight: number;
  biologicSex: string;
  pronoun: string;
  civilStatus: string;
  sons: string;
  ocupation: string;
  address: string;
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
    getHabits: builder.query<HabitsResponse, void>({
      query: () => ({ url: '/patients/1/habits', method: 'get' })
    }),
    getDiseases: builder.query<DiseasesResponse, void>({
      query: () => ({ url: '/patients/1/diseases', method: 'get' })
    }),
    getVaccines: builder.query<TVaccinesData, string>({
      query: userId => ({ url: `/patients/${userId}/vaccines`, method: 'get' })
    }),
    getMeasurements: builder.query<IMeasurementsData, string>({
      query: userId => ({ url: `/patients/${userId}/measurements`, method: 'get' })
    }),
    getGeneralData: builder.query<TGeneralData, void>({
      query: () => ({ url: '/patients/1/info', method: 'get' })
    })
  })
});

export const {
  useGetAllergiesQuery,
  useGetHabitsQuery,
  useGetDiseasesQuery,
  useGetVaccinesQuery,
  useGetMeasurementsQuery,
  useGetGeneralDataQuery
} = apiBFF;
