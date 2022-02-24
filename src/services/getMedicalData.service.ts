import axios, { AxiosResponse } from 'axios';
/// TYPES
export type IMedicalData = {
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
  ocupation: string;
  address: string;
};

export const mockData = {
  userId: 'ee957013-b02f-45b2-b837-092b490242ea',
  firstName: 'Tatiana',
  firstLastName: 'Vega',
  secondLastName: 'Madrigal',
  birthDate: '1984-05-16T00:00:00Z',
  height: 170,
  weight: 80,
  biologicSex: 'Femenino',
  pronoun: 'Ella',
  civilStatus: 'Soltera',
  ocupation: 'Agente de Ventas',
  address: 'Montes de Oca'
};

export const getMedicalData = (): Promise<AxiosResponse<any>> => {
  //TODO GET DATA FROM API
  return axios.get(`${process.env.NEXT_PUBLIC_API_URL}general/medical`);
};
