import axios, { AxiosResponse } from 'axios';
/// TYPES
export type IPersonalData = {
  codSAC: number;
  documentNumber: string;
  documentType: number;
  email: string;
  emailId: number;
  firstMedicalRecordComplete: number;
  firstName: string;
  fullName: string;
  secondName: string;
  status: string;
  statusCode: number;
};

export const getPersonalData = (email: string): Promise<AxiosResponse<any>> => {
  return axios.post(`${process.env.NEXT_PUBLIC_API_URL}user/get-local-data`, {
    userEmail: email
  });
};

export const getDocumentsTypes = (): Promise<AxiosResponse<any>> => {
  return axios.get(`${process.env.NEXT_PUBLIC_API_URL}general/document-types`);
};
