import axios, { AxiosResponse } from 'axios';

/// TYPES
export type IGeneralAdressOption = {
  codigo: string;
  nombre: string;
};

export type IGeneralAdressState = {
  data: IGeneralAdressOption[];
  fetching: boolean;
};

export type IGetProvinces = {
  result: {
    error: boolean;
    primerNivel: IGeneralAdressOption[];
  };
};

export type IGetCantones = {
  result: {
    error: boolean;
    segundoNivel: IGeneralAdressOption[];
  };
};

export type IGetDistricts = {
  result: {
    error: boolean;
    catalogo: IGeneralAdressOption[];
  };
};
/// TYPES END

export const getFirstLevel = (countryCode: string): Promise<AxiosResponse<IGetProvinces>> => {
  return axios.get(`${process.env.apiUrl}sac-general/provinces-api?countryCode=${countryCode}`);
};

export const getSecondLevel = (
  country: string,
  firstLevel: string | number
): Promise<AxiosResponse<IGetCantones>> => {
  return axios.get(
    `${process.env.apiUrl}sac-general/cantons-api?countryCode=${country}&level1Code=${firstLevel}`
  );
};

export const getThirdLevel = (
  country: string,
  secondLevel: string | number
): Promise<AxiosResponse<IGetDistricts>> => {
  return axios.get(
    `${process.env.apiUrl}sac-general/districts-api?countryCode=${country}&level2Code=${secondLevel}`
  );
};

export const getProvinces = (): Promise<AxiosResponse<IGetProvinces>> => {
  return axios.get(`${process.env.apiUrl}sac-general/provinces-api?countryCode=6`);
};

export const getCanton = (provinceId: string | number): Promise<AxiosResponse<IGetCantones>> => {
  return axios.get(
    `${process.env.apiUrl}sac-general/cantons-api?countryCode=1&level1Code=${provinceId}`
  );
};

export const getDistrict = (cantonId: string | number): Promise<AxiosResponse<IGetDistricts>> => {
  return axios.get(
    `${process.env.apiUrl}sac-general/districts-api?countryCode=1&level2Code=${cantonId}`
  );
};
