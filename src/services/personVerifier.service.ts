/// BASE IMPORTS
import axios from 'axios';
import { addDays } from 'date-fns';
/// BASE IMPORTS END

/// TYPES
import { TAutocompleteUser, TAutocompleteArgs } from '../containers/SignUp/index.types';
/// TYPES END

const setDataBirth = (date: string): string => {
  const toDate = new Date(date);
  if (toDate instanceof Date && !isNaN(toDate.getTime())) {
    return addDays(toDate, 1).toDateString();
  }
  return '';
};

export const personVerifier = ({
  docNumber = '',
  docType = ''
}: TAutocompleteArgs): Promise<TAutocompleteUser> => {
  const params = {
    documentType: docType || '',
    documentNumber: docNumber || ''
  };
  return new Promise((resolve, reject) => {
    axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}user/validate-person`, params)
      .then(res => {
        const data = res.data.result.paciente;
        const fullName = data ? `${data.name} ${data.surname} ${data?.lastSurname ?? ''}` : '';
        const birthDate = data ? setDataBirth(data.dateOfBirth) : '';
        resolve({ fullName, birthDate });
      })
      .catch(reject);
  });
};
