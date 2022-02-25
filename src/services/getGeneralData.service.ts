import axios, { AxiosResponse } from 'axios';
/// TYPES
export type IGeneralData = {
  arterialPressure: IGeneral;
  bloodGlocuse: IGeneral;
  weight: IGeneral;
};

export type IGeneral = {
  name: string;
  unit: string;
  generalData: IGeneralDataObject[];
};

export type IGeneralDataObject = {
  value: number;
  time: string;
  performer: string;
};

export const mockData = {
  arterialPressure : {
    name: 'Presión',
    unit: 'mmHg',
    generalData: {
        systolic: 120,
        diastolic: 80,
        time: '2022-02-17T21:01:03Z',
        performer: 'Dr. Juarez'
      }
  },
  bloodGlocuse : {
    name: 'Glucemia',
    unit: 'mg/dl',
    generalData: {
        value: 98,
        time: '2022-02-17T21:01:03Z',
        performer: 'Dr. Juarez'
      }
  },
  weight : {
    name: 'Peso',
    unit: 'kg',
    generalData: {
        value: 80,
        time: '2022-02-17T21:01:03Z',
        performer: 'Dr. Juarez'
      }
  }
};

export const getGeneralData = (): Promise<AxiosResponse<any>> => {
  // TODO GET DATA FROM API
  return axios.get(`${process.env.NEXT_PUBLIC_API_URL}general/data`);
};
