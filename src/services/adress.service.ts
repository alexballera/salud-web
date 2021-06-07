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
/// TYPES END

export const getProvinces = (): Promise<AxiosResponse<IGetProvinces>> => {
  return axios.get(`${process.env.NEXT_PUBLIC_API_URL}sac-general/provinces-api?countryCode=3`);
};

export const getCanton = (provinceId: string | number): Promise<AxiosResponse<IGetCantones>> => {
  return axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}sac-general/cantons-api?countryCode=1&level1Code=${provinceId}`
  );
};

export const getDistrict = (cantonId: string | number): Promise<AxiosResponse<IGetDistricts>> => {
  return axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}sac-general/districts-api?countryCode=1&level2Code=${cantonId}`
  );
};
