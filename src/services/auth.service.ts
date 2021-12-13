import axios, { AxiosResponse } from 'axios';
import { User, ISignUpBody } from '../types/auth.types';

/// LOGIN
export function loginService(email: string, password: string): Promise<AxiosResponse<any>> {
  return axios.post(`${process.env.NEXT_PUBLIC_API_URL}auth/login`, {
    userEmail: email,
    userPassword: password
  });
}
/// LOGIN END

export function signUp(body: ISignUpBody): Promise<AxiosResponse<any>> {
  return axios.post(`${process.env.apiUrl}user/register-patient`, body);
}
export function logoutService(email: string): Promise<AxiosResponse<any>> {
  return axios.get(`${process.env.NEXT_PUBLIC_API_URL}auth/logout/${email}`);
}
/// SIGN UP SERVICE & TYPES END
/// FORGOT PASSWORD
export function forgotPasswordSendEmailService(email: string): Promise<AxiosResponse<any>> {
  return axios.post(`${process.env.NEXT_PUBLIC_API_URL}user/password-reset`, {
    userEmail: email
  });
}

export function setDataToLocalstorage(key: string, user: User): void {
  window.localStorage.setItem(key, JSON.stringify(user));
}

export function getDataFromLocalstorage(str: string): User {
  const user: User = JSON.parse(window.localStorage.getItem(str));
  return user;
}

export function removeDataFromLocalstorage(key: string): void {
  window.localStorage.removeItem(key);
}

export function forgotPasswordConfirmCodeService(
  email: string,
  pinCode: string,
  userTypeCode = 'activate'
): Promise<AxiosResponse<any>> {
  return axios.post(`${process.env.NEXT_PUBLIC_API_URL}user/code-reset-verify`, {
    userEmail: email,
    userCode: pinCode,
    userTypeCode
  });
}

export function forgotPasswordResendPin(email: string): Promise<AxiosResponse<any>> {
  return axios.post(`${process.env.NEXT_PUBLIC_API_URL}user/new-pin`, {
    userEmail: email,
    pinType: 'clave'
  });
}

export function forgotPasswordChangePassword(
  email: string,
  pinCode: string,
  newPassword: string,
  newPasswordConfirm: string
): Promise<AxiosResponse<any>> {
  return axios.post(`${process.env.NEXT_PUBLIC_API_URL}user/update-password`, {
    userEmail: email,
    userCode: pinCode,
    userPassword1: newPassword,
    userPassword2: newPasswordConfirm
  });
}
/// FORGOT PASSWORD END
