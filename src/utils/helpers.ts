import { getDate, getMonth, getYear, isValid } from 'date-fns';
import { NAMESPACE_KEY as i18nRecipes } from '@/src/i18n/recipes_and_prescriptions/i18n';

export const convertToMask = (value: string): number | (RegExp | string)[] => {
  const defaultMask = 0;

  const mask = value
    ? value.split('').map(data => {
        switch (data) {
          case '0':
            return /\d/;
          case ' ':
            return data;
          default:
            return data;
        }
      })
    : defaultMask;

  return mask;
};

export const getCardDate = (date: string, t): string => {
  let newDate = new Date(date);
  newDate = new Date(newDate.getTime() + newDate.getTimezoneOffset() * 60000);
  const year = getYear(newDate);
  const month = getMonth(newDate);
  const day = getDate(newDate);
  const isValidDate = isValid(newDate);

  if (!isValidDate) {
    return `${t('invalid_date_format', { ns: i18nRecipes })}`;
  }
  return `${day.toString()} ${t(`months.${month}`).substring(0, 3)}, ${year}`;
};

export const calculateAge = (dateString: string): number => {
  const ds = new Date(dateString);
  const diffMs = Date.now() - ds.getTime();
  const ageDt = new Date(diffMs);

  return Math.abs(ageDt.getUTCFullYear() - 1970);
};

export const upperCamelCase = (s: string): string => {
  return s.toLowerCase().replace(/(^|\s)([A-zÀ-ú])/g, a => {
    return a.toUpperCase();
  });
};
