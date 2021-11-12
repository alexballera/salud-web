import axios, { AxiosResponse } from 'axios';

/// LOGIN
export function loginService(email: string, password: string): Promise<AxiosResponse<any>> {
  return axios.post(`${process.env.NEXT_PUBLIC_API_URL}auth/login`, {
    userEmail: email,
    userPassword: password
  });
}
/// LOGIN END

/// SIGN UP SERVICE & TYPES
export type ISignUpBody = {
  terms: boolean;
  email: string;
  gender: string;
  canton: string;
  country: string;
  password: string;
  province: string;
  lastName: string;
  district: string;
  services: boolean;
  firstName: string;
  birthDate: string;
  superappUser: boolean;
  documentType: string | number;
  mobilePhone1: string;
  documentNumber: string;
};

export function signUp(body: ISignUpBody): Promise<AxiosResponse<any>> {
  return axios.post(`${process.env.apiUrl}user/register-patient`, body);
}
/// SIGN UP SERVICE & TYPES END
/// FORGOT PASSWORD
export function forgotPasswordSendEmailService(email: string): Promise<AxiosResponse<any>> {
  return axios.post(`${process.env.NEXT_PUBLIC_API_URL}user/password-reset`, {
    userEmail: email
  });
}

export function setDataUserStorage(user: ISignUpBody): void {
  window.localStorage.setItem('user', JSON.stringify(user));
}

export function getDataUserStorage(str: string): ISignUpBody {
  const user: ISignUpBody = JSON.parse(window.localStorage.getItem(str));
  return user;
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
