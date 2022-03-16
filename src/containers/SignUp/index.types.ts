import { IAppProps } from '../../context/index';
import { INotificationProps } from '../../context/types';

/// TYPES
export type TProps = {
  handleNotifications?: (props: INotificationProps) => void;
  handleLogin: (user: any) => void;
  handleError: (open: boolean, message: string, type?: string) => void;
  onClickLink?;
  notificationState?: INotificationProps;
} & IAppProps;

type documentType = number | string;

export type IEmailStates = {
  message: string;
  fetching: boolean;
};

export type IPersonalVerificatorResponse = {
  result: {
    paciente: TPaciente;
  };
};

export type TPaciente = {
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
  code: string;
  label: string;
};

export type TPersonalDataForm = {
  country: string;
  documentType: string;
  documentNumber: string;
  fullName: string;
  birthDate: string;
};

export type TExtraDataForm = {
  gender: GenderEnum;
  thirdLevel: string;
  firstLevel: string;
  secondLevel: string;
  mobilePhone1: string;
  pronoun: string;
};

export type TCredentialDataForm = {
  email: string;
  terms: boolean;
  password: string;
  services: boolean;
  superappUser: boolean;
  confirmPassword?: string;
};

export type TFormData = TExtraDataForm & TPersonalDataForm & TCredentialDataForm;

export type TPersonalDataProps = {
  documentTypesOptions: IDocumentTypes[];
  handleNotifications: (props: INotificationProps) => void;
  setCustomPopUpError?: React.Dispatch<React.SetStateAction<null | string>>;
  customPopUpError?: string | null;
  setCurrDocTypeArgs?: React.Dispatch<React.SetStateAction<TCountryDocumentTypeItem>>;
  currDocTypeArgs?: TCountryDocumentTypeItem;
};

export type TExtraDataProps = {
  currDocTypeArgs?: TCountryDocumentTypeItem;
  updatePersonalData?: boolean;
  updatePhone?: boolean;
};

export type TCredentialDataProps = {
  updatePassword?: boolean;
  updateEmail?: boolean;
  errorConfirmPassword?: boolean;
  clickToSubmit?: boolean;
  setCustomPopUpError?: React.Dispatch<React.SetStateAction<null | string>>;
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

export type TAutocompleteUser = {
  fullName: string;
  birthDate: string;
};

export type TAutocompleteArgs = {
  docType: string;
  docNumber: string;
};

export type TCountryDocumentTypeItem = {
  id: string;
  name: string;
  mask: string | null;
  length: number;
  validation: RegExp;
  reqFetchPerInf: boolean;
  i18n: string;
  autocompleteUserDataFn?: (args: TAutocompleteArgs) => Promise<TAutocompleteUser>;
};

export type TCountryDocumentType = {
  code: string;
  sacCode: string; // this field ref SAC country code
  items: TCountryDocumentTypeItem[];
};
/// TYPES END
