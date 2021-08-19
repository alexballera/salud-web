import axios, { AxiosResponse } from 'axios';
/// TYPES
import { IPersonalVerificatorResponse } from '../containers/SignUp/index.types';

export const personVerifier = (
  documentType: string | number,
  documentNumber: string
): Promise<AxiosResponse<IPersonalVerificatorResponse>> => {
  return axios.post(`${process.env.NEXT_PUBLIC_API_URL}user/validate-person`, {
    documentType,
    documentNumber
  });
};
