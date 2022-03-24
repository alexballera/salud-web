import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { TVaccinesData, TVaccines } from './getExamResultsData.service';
import { IMeasurementsData } from '../services/getMeasurementsData.service';
import { TAllergieResponse } from '@/src/types/services/allergie.types';
import { THabitsResponse } from '@/src/types/services/habit.types';
import { TDiseasesResponse } from '@/src/types/services/diseases.types';
import { TGeneralData } from '@/src/types/services/generalData.types';
import { TFamiliarDiseasesResponse } from '../types/services/familiarDiseases.types';

type TGetVaccineByIdParams = {
  userId: string;
  vaccineId: string;
};

const baseUrl = process.env.NEXT_PUBLIC_API_URL_BFF;

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
    getAllergies: builder.query<TAllergieResponse, void>({
      query: () => ({ url: '/patients/1/allergies', method: 'get' })
    }),
    getHabits: builder.query<THabitsResponse, void>({
      query: () => ({ url: '/patients/1/habits', method: 'get' })
    }),
    getDiseases: builder.query<TDiseasesResponse, void>({
      query: () => ({ url: '/patients/1/diseases', method: 'get' })
    }),
    getVaccines: builder.query<TVaccinesData, string>({
      query: userId => ({ url: `/patients/${userId}/vaccines`, method: 'get' })
    }),
    getVaccineById: builder.query<TVaccines, TGetVaccineByIdParams>({
      query: ({ userId }: TGetVaccineByIdParams) => ({
        url: `/patients/${userId}/vaccines`,
        method: 'get'
      }),
      transformResponse: (
        response: TVaccinesData,
        _tag: unknown,
        { vaccineId }: TGetVaccineByIdParams
      ) => {
        const { vaccines } = response;
        return vaccines.find(item => item.vaccineId === vaccineId);
      }
    }),
    getMeasurements: builder.query<IMeasurementsData, string>({
      query: userId => ({ url: `/patients/${userId}/measurements`, method: 'get' })
    }),
    getGeneralData: builder.query<TGeneralData, void>({
      query: () => ({ url: '/patients/1/info', method: 'get' })
    }),
    getFamiliarDiseases: builder.query<TFamiliarDiseasesResponse, void>({
      query: () => ({ url: '/patients/1/familiarDiseases', method: 'get' })
    })
  })
});

export const {
  useGetAllergiesQuery,
  useGetHabitsQuery,
  useGetDiseasesQuery,
  useGetVaccinesQuery,
  useGetMeasurementsQuery,
  useGetGeneralDataQuery,
  useGetFamiliarDiseasesQuery,
  useGetVaccineByIdQuery
} = apiBFF;
