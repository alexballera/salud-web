import axios, { AxiosResponse } from 'axios';

export default function loginService(email: string, password: string): Promise<AxiosResponse<any>> {
  return axios.post(`${process.env.NEXT_PUBLIC_API_URL}auth/login`, {
    userEmail: email,
    userPassword: password
  });
}
