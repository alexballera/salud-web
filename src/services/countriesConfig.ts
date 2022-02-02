/// TYPES
import { TCountryConfig } from '../containers/SignUp/index.types';
import { personVerifier } from './personVerifier.service';
/// TYPES END

const countryConfig: TCountryConfig[] = [
  {
    code: 'crc',
    phoneMask: ['+', '5', '0', '6', '-', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
    documentTypes: [
      {
        id: '1',
        name: 'physical',
        mask: '0 0000 0000',
        length: 9,
        validation: /^([0-9]){9,9}$/,
        reqFetchPerInf: true,
        i18n: 'crc_physical_document_number',
        autocompleteUserDataFn: personVerifier
      },
      {
        id: '2',
        name: 'residence',
        mask: '000000000000000',
        length: 15,
        validation: /^([0-9]){10,15}$/,
        reqFetchPerInf: false,
        i18n: 'crc_residence_document_number'
      },
      {
        id: '6',
        name: 'passport',
        mask: null,
        length: 20,
        validation: /^([a-zA-Z0-9]){3,20}$/,
        reqFetchPerInf: false,
        i18n: 'crc_passport_document_number'
      }
    ]
  },
  {
    code: 'mx',
    phoneMask: ['+', '5', '0', '6', '-', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
    documentTypes: [
      {
        id: '2',
        name: 'elector',
        mask: null,
        length: 18,
        validation: /^([a-zA-Z0-9]){10,18}$/,
        reqFetchPerInf: false,
        i18n: 'mx_elector_document_number'
      },
      {
        id: '3',
        name: 'unique',
        mask: null,
        length: 18,
        validation: /^([a-zA-Z0-9]){10,18}$/,
        reqFetchPerInf: false,
        i18n: 'mx_unique_document_number'
      },
      {
        id: '4',
        name: 'passport',
        mask: null,
        length: 10,
        validation: /^([a-zA-Z0-9]){8,10}$/,
        reqFetchPerInf: false,
        i18n: 'mx_passport_document_number'
      }
    ]
  }
];

export default countryConfig;
