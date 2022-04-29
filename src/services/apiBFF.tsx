import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { TVaccinesData, TVaccines } from './getExamResultsData.service';
import { IMeasurementsData } from '../services/getMeasurementsData.service';
import { TAllergieResponse } from '@/src/types/services/allergie.types';
import { THabitsResponse } from '@/src/types/services/habit.types';
import { TDiseasesResponse } from '@/src/types/services/diseases.types';
import { TGeneralData } from '@/src/types/services/generalData.types';
import { TFamiliarDiseasesResponse } from '../types/services/familiarDiseases.types';
import {
  TConsultationHistory,
  TConsultationHistoryGroup,
  TConsultationHistoryResponse,
  TGetConsultationHistoryByIdParams
} from '../types/services/consultationHistory.types';

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
    }),
    getConsultationHistoryById: builder.query<
      TConsultationHistory,
      TGetConsultationHistoryByIdParams
    >({
      query: ({ year, userId }: TGetConsultationHistoryByIdParams) => ({
        url: `/patients/${userId}/medicalConsultation/${year}`,
        method: 'get'
      }),
      transformResponse: (
        response: TConsultationHistoryResponse,
        _tag: unknown,
        { medicalConsultationId }: TGetConsultationHistoryByIdParams
      ) => {
        const { consultations } = response;
        const consult = consultations.find(
          item => item.medicalConsultationId === medicalConsultationId
        );
        return consult;
      }
    }),
    getConsultationHistory: builder.query<TConsultationHistoryGroup, number>({
      query: year => ({ url: `/patients/1/medicalConsultation/${year}`, method: 'get' }),
      transformResponse: (response: TConsultationHistoryResponse) => {
        const groups = response.consultations.reduce((groups, curr) => {
          const month = new Date(curr.date).getMonth().toLocaleString();
          if (!groups[month]) {
            groups[month] = [];
          }
          groups[month].push(curr);
          return groups;
        }, {});
        return Object.keys(groups)
          .map(month => {
            return {
              month: month.toString(),
              items: groups[month].reverse()
            };
          })
          .reverse();
      }
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
  useGetVaccineByIdQuery,
  useGetConsultationHistoryQuery,
  useGetConsultationHistoryByIdQuery
} = apiBFF;
