import axios, { AxiosResponse } from 'axios';
/// TYPES

export const getPersonalData = (email: string): Promise<AxiosResponse<any>> => {
  return axios.post(`${process.env.NEXT_PUBLIC_API_URL}user/get-personal-data`, {
    userEmail: email
  });
};
