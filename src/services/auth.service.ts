import axios, { AxiosResponse } from 'axios';

export const loginService = (email: string, password: string): Promise<AxiosResponse> => {
  return axios.post(`${process.env.NEXT_PUBLIC_API_URL}auth/login`, {
    userEmail: email,
    userPassword: password
  });
};
