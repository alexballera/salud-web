import axios, { AxiosResponse } from 'axios';

export default function loginService(email: string, password: string): Promise<AxiosResponse<any>> {
  return axios.post(`${process.env.NEXT_PUBLIC_API_URL}auth/login`, {
    userEmail: email,
    userPassword: password
  });
}

/// SIGN UP SERVICE & TYPES
type ISignUpBody = {
  email: string;
  gender: string;
  canton: string;
  country: string;
  password: string;
  province: string;
  lastName: string;
  district: string;
  firstName: string;
  birthDate: string;
  documentType: string | number;
  mobilePhone1: string;
  documentNumber: string;
};

export function signUp(body: ISignUpBody): Promise<AxiosResponse<any>> {
  return axios.post(`${process.env.NEXT_PUBLIC_API_URL}user/register-patient`, body);
}
/// SIGN UP SERVICE & TYPES END
