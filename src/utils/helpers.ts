import { getDate, getMonth, getYear, isValid, parseISO, format } from 'date-fns';
import i18next from 'i18next';
import * as dateFnsLocale from 'date-fns/locale';
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

export const i18nDateFormat = (date: string, formatDate: string): string => {
  const currentI18nKey = i18next.language || window.localStorage.i18nextLng;
  const locale = dateFnsLocale[currentI18nKey || 'enUS'];

  return format(parseISO(date), formatDate, {
    locale: locale
  });
};

export const geolocation = async () => {
  if (navigator.geolocation) {
    await navigator.geolocation.getCurrentPosition(successCallback, errorCallback, {
      enableHighAccuracy: true,
      timeout: 20000,
      maximumAge: 0
    });
  }
};

function successCallback(position) {
  console.log(position.coords);
}

function errorCallback(error) {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      console.error('User denied the request for Geolocation.');
      break;
    case error.POSITION_UNAVAILABLE:
      console.error('Location information is unavailable.');
      break;

    case error.TIMEOUT:
      console.error('The request to get user location timed out.');
      break;

    case error.UNKNOWN_ERROR:
      console.error('An unknown error occurred.');
      break;
  }
}
