import axios, { AxiosResponse } from 'axios';
/// TYPES
export type IMeasurementsData = {
  userId: string;
  records: IMeasurement[];
};

export type IMeasurement = {
  name: string;
  type: string;
  unit: string;
  measurements: any[];
};

export const mockData = {
  userId: 'ee957013-b02f-45b2-b837-092b490242ea',
  records: [
    {
      name: 'Presión',
      type: 'arterialPressure',
      unit: 'mmHg',
      measurements: [
        {
          systolic: 100,
          diastolic: 60,
          time: '2022-02-17T21:01:03Z',
          performer: 'Dr. Juarez'
        },
        {
          systolic: 120,
          diastolic: 90,
          time: '2022-02-17T21:01:03Z',
          performer: 'Dr. Juarez'
        }
      ]
    },
    {
      name: 'Glucemia',
      type: 'bloodGlocuse',
      unit: 'mgdl',
      measurements: [
        {
          value: 70,
          time: '2022-02-17T21:01:03Z',
          performer: 'Dr. Juarez'
        },
        {
          value: 70,
          time: '2022-02-17T21:01:03Z',
          performer: 'Dr. Juarez'
        }
      ]
    },
    {
      name: 'Peso',
      type: 'weight',
      unit: 'kg',
      measurements: [
        {
          value: 80,
          time: '2022-02-17T21:01:03Z',
          performer: 'Dr. Juarez'
        },
        {
          value: 81,
          time: '2022-02-17T21:01:03Z',
          performer: 'Dr. Juarez'
        }
      ]
    }
  ]
};

export const getMeasurementsData = (): Promise<AxiosResponse<any>> => {
  // TODO GET DATA FROM API
  return axios.get(`${process.env.NEXT_PUBLIC_API_URL}general/measurements`);
};
