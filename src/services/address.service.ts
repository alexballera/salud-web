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
  return axios.get(
    `${process.env.NEXT_PUBLIC_API_URL_BFF}/geolocation/provinces?countryCode=${countryCode}`
  );
};

export const getSecondLevel = (
  country: string,
  firstLevel: string | number
): Promise<AxiosResponse<TGetCantones>> => {
  return axios.get(
    `${process.env.NEXT_PUBLIC_API_URL_BFF}/geolocation/cantons?countryCode=${country}&level1Code=${firstLevel}`
  );
};

export const getThirdLevel = (
  country: string,
  secondLevel: string | number
): Promise<AxiosResponse<TGetDistricts>> => {
  return axios.get(
    `${process.env.NEXT_PUBLIC_API_URL_BFF}/geolocation/districts?countryCode=${country}&level2Code=${secondLevel}`
  );
};

// TODO: Delete this functions once beneficiary page will be changed
export const getProvinces = (): Promise<AxiosResponse<TGetProvinces>> => {
  return axios.get(`${process.env.NEXT_PUBLIC_API_URL_BFF}/geolocation/provinces?countryCode=6`);
};

export const getCanton = (provinceId: string | number): Promise<AxiosResponse<TGetCantones>> => {
  return axios.get(
    `${process.env.NEXT_PUBLIC_API_URL_BFF}/geolocation/cantons?countryCode=1&level1Code=${provinceId}`
  );
};

export const getDistrict = (cantonId: string | number): Promise<AxiosResponse<TGetDistricts>> => {
  return axios.get(
    `${process.env.NEXT_PUBLIC_API_URL_BFF}/geolocation/districts?countryCode=1&level2Code=${cantonId}`
  );
};
