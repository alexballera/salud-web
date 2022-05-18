import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { TVaccinesData, TVaccines } from './getExamResultsData.service';
import { IMeasurementsData } from '../services/getMeasurementsData.service';
import { TAllergieResponse } from '@/src/types/services/allergie.types';
import { THabitsResponse } from '@/src/types/services/habit.types';
import { TDiseasesResponse } from '@/src/types/services/diseases.types';
import { TGeneralData } from '@/src/types/services/generalData.types';
import { TFamiliarDiseasesResponse } from '../types/services/familiarDiseases.types';
import { TSearchHistoryResponse } from '../types/services/searchHistory.types';
import {
  TConsultationHistory,
  TConsultationHistoryGroup,
  TConsultationHistoryResponse,
  TGetConsultationHistoryByIdParams
} from '../types/services/consultationHistory.types';
import { DoctorSearchAppt, queryDoctor, TDoctors } from './doctors.type';
import api from '../api/api';
import { decodeToken } from '../utils/helpers';

type TGetVaccineByIdParams = {
  userId: string;
  vaccineId: string;
};

const baseUrl = process.env.NEXT_PUBLIC_API_URL_BFF;

// Create our baseQuery instance
const baseQuery = fetchBaseQuery({
  baseUrl: baseUrl,
  prepareHeaders: async (headers, { endpoint }) => {
    if (endpoint !== 'createAccount') {
      let token = '';

      const { exp } = decodeToken(localStorage.getItem('ospiSecurity'));

      if (Date.now() >= exp * 1000) {
        const reGetToken = await api.getJWT();
        token = reGetToken;
      } else {
        token = localStorage.getItem('ospiSecurity');
      }

      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
    }

    return headers;
  }
});

export const apiBFF = createApi({
  baseQuery: baseQuery,
  tagTypes: ['patient'],
  endpoints: builder => ({
    createAccount: builder.mutation({
      query(body) {
        return {
          url: `/patients/register`,
          method: 'POST',
          body
        };
      },
      invalidatesTags: [{ type: 'patient', id: 'LIST' }]
    }),
    getAllergies: builder.query<TAllergieResponse, void>({
      query: () => ({ url: '/patients/allergies', method: 'get' })
    }),
    getHabits: builder.query<THabitsResponse, void>({
      query: () => ({ url: '/patients/habits', method: 'get' })
    }),
    getDiseases: builder.query<TDiseasesResponse, void>({
      query: () => ({ url: '/patients/diseases', method: 'get' })
    }),
    getVaccines: builder.query<TVaccinesData, string>({
      query: () => ({ url: `/patients/vaccines`, method: 'get' })
    }),
    getVaccineById: builder.query<TVaccines, TGetVaccineByIdParams>({
      query: () => ({
        url: `/patients/vaccines`,
        method: 'get'
      }),
      transformResponse: (
        response: TVaccinesData,
        _tag: unknown,
        { vaccineId }: TGetVaccineByIdParams
      ) => {
        const { vaccines } = response;
        return vaccines.find(item => item.id === vaccineId);
      }
    }),
    getMeasurements: builder.query<IMeasurementsData, string>({
      query: () => ({ url: `/patients/measurements`, method: 'get' })
    }),
    getGeneralData: builder.query<TGeneralData, void>({
      query: () => ({ url: '/patients/info', method: 'get' })
    }),
    getFamiliarDiseases: builder.query<TFamiliarDiseasesResponse, void>({
      query: () => ({ url: '/patients/familiar-diseases', method: 'get' })
    }),
    getConsultationHistoryById: builder.query<
      TConsultationHistory,
      TGetConsultationHistoryByIdParams
    >({
      query: ({ year }: TGetConsultationHistoryByIdParams) => ({
        url: `/patients/medical-consultation/${year}`,
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
      query: year => ({ url: `/patients/medical-consultation/${year}`, method: 'get' }),
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
    }),
    getSearchHistory: builder.query<TSearchHistoryResponse, void>({
      query: () => ({ url: '/guide/search-history', method: 'get' })
    }),
    getDoctors: builder.query<TDoctors, queryDoctor>({
      query: ({
        latitude,
        longitude,
        type,
        detail = '',
        range = 5000,
        order,
        price = 0,
        appt = DoctorSearchAppt.next,
        mode,
        date = ''
      }) => ({
        url: `/guide/doctors?latitude=${latitude}&longitude=${longitude}&type=${type}&detail=${detail}&range=${range}&order=${order}&price=${price}&appt=${appt}&mode=${mode}&date=${date}`,
        method: 'get'
      })
    })
  })
});

export const {
  useCreateAccountMutation,
  useGetAllergiesQuery,
  useGetHabitsQuery,
  useGetDiseasesQuery,
  useGetVaccinesQuery,
  useGetMeasurementsQuery,
  useGetGeneralDataQuery,
  useGetFamiliarDiseasesQuery,
  useGetVaccineByIdQuery,
  useGetConsultationHistoryQuery,
  useGetConsultationHistoryByIdQuery,
  useGetSearchHistoryQuery,
  useGetDoctorsQuery
} = apiBFF;
