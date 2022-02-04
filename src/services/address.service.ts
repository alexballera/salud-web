import axios, { AxiosResponse } from 'axios';

/// TYPES
type TGeneralAdressOption = {
  codigo: string;
  nombre: string;
};

type TGetProvinces = {
  result: {
    error: boolean;
    primerNivel: TGeneralAdressOption[];
  };
};

type TGetCantones = {
  result: {
    error: boolean;
    segundoNivel: TGeneralAdressOption[];
  };
};

type TGetDistricts = {
  result: {
    error: boolean;
    catalogo: TGeneralAdressOption[];
  };
};
/// TYPES END

export const getFirstLevel = (countryCode: string): Promise<AxiosResponse<TGetProvinces>> => {
  return axios.get(`${process.env.apiUrl}sac-general/provinces-api?countryCode=${countryCode}`);
};

export const getSecondLevel = (
  country: string,
  firstLevel: string | number
): Promise<AxiosResponse<TGetCantones>> => {
  return axios.get(
    `${process.env.apiUrl}sac-general/cantons-api?countryCode=${country}&level1Code=${firstLevel}`
  );
};

export const getThirdLevel = (
  country: string,
  secondLevel: string | number
): Promise<AxiosResponse<TGetDistricts>> => {
  return axios.get(
    `${process.env.apiUrl}sac-general/districts-api?countryCode=${country}&level2Code=${secondLevel}`
  );
};

// TODO: Delete this functions once beneficiary page will be changed
export const getProvinces = (): Promise<AxiosResponse<TGetProvinces>> => {
  return axios.get(`${process.env.apiUrl}sac-general/provinces-api?countryCode=6`);
};

export const getCanton = (provinceId: string | number): Promise<AxiosResponse<TGetCantones>> => {
  return axios.get(
    `${process.env.apiUrl}sac-general/cantons-api?countryCode=1&level1Code=${provinceId}`
  );
};

export const getDistrict = (cantonId: string | number): Promise<AxiosResponse<TGetDistricts>> => {
  return axios.get(
    `${process.env.apiUrl}sac-general/districts-api?countryCode=1&level2Code=${cantonId}`
  );
};
