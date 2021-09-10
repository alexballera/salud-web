import { IAppProps } from '../../context/index';
import { INotificationProps } from '../../context/types';

/// TYPES
export type IProps = {
  handleLogin: (user: any) => void;
  handleError: (open: boolean, message: string) => void;
} & IAppProps;

export type IFormData = {
  email: string;
  terms: boolean;
  gender: GenderEnum | null;
  canton: { codigo: string; nombre: string } | null;
  country: string;
  province: { codigo: string; nombre: string } | null;
  password: string;
  lastName: string;
  district: { codigo: string; nombre: string } | null;
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
    paciente: IPaciente;
  };
};

export type IPaciente = {
  name: string;
  gender: 'F' | 'M';
  surname: string;
  dateOfBirth: string;
  lastSurname: string;
};

export type IGeneralAdressState = {
  data: IGeneralAdressOption[];
  fetching: boolean;
  selectedOption?: null;
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
  handleNotifications: (props: INotificationProps) => void;
};

export type IExtraDataForm = {
  gender: GenderEnum;
  canton: any;
  district: any;
  province: any;
  mobilePhone1: string;
};

export type ICredentialDataProps = {
  handleNotifications: (props: INotificationProps) => void;
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
  mask: string;
  name: string;
  length: number;
  documentTypeId: number;
};

export type ResponseDataError = {
  code: string;
  detail: string;
  httpStatus: number;
  message: string;
  name: string;
  stack: string;
  type: string;
};
/// TYPES END
