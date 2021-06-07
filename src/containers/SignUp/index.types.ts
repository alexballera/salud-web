import { IAppProps } from '../../context/index';

/// TYPES
export type IProps = {
  handleLogin: (user: any) => void;
  handleError: (open: boolean, message: string) => void;
} & IAppProps;

export type IFormData = {
  email: string;
  terms: boolean;
  gender: GenderEnum | null;
  canton: string;
  country: string;
  province: string;
  password: string;
  lastName: string;
  district: string;
  services: boolean;
  firstName: string;
  birthDate: string;
  superappUser: boolean;
  documentType: documentType;
  mobilePhone1: string;
  documentNumber: string;
  confirmPassword?: string;
};

type documentType = number | string;

export type IEmailStates = {
  message: string;
  fetching: boolean;
};

export type IPersonalVerificatorResponse = {
  result: {
    paciente: {
      name: string;
      gender: 'F' | 'M';
      surname: string;
      dateOfBirth: string;
      lastSurname: string;
    };
  };
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
    segundoNivel: IGeneralAdressOption[];
  };
};

export type IGeneralAdressOption = {
  codigo: string;
  nombre: string;
};

export type IPersonalDataForm = {
  lastName: string;
  birthDate: string;
  firstName: string;
  documentType: documentType;
  documentNumber: string;
};

export type IPersonalDataProps = {
  documentTypesOptions: IDocumentTypes[];
};

export type IExtraDataForm = {
  gender: GenderEnum;
  canton: string;
  district: string;
  province: string;
  mobilePhone1: string;
};

export type ICredentialDataForm = {
  email: string;
  terms: boolean;
  password: string;
  services: boolean;
  superappUser: boolean;
  confirmPassword?: string;
};

export type GenderEnum = '1' | '2' | '';

export type IDocumentTypes = {
  mask: string[];
  name: string;
  length: number;
  documentTypeId: number;
};
/// TYPES END
