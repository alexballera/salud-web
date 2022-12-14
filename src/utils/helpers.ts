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

type TGeolocation = {
  latitude: number;
  longitude: number;
};

export const getPosition = (): Promise<TGeolocation> => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      position => {
        resolve(position.coords);
      },
      error => {
        reject(errorCallback(error));
      },
      {
        enableHighAccuracy: true,
        timeout: 30000,
        maximumAge: 0
      }
    );
  });
};

function errorCallback(error) {
  switch (error.code) {
    case 1:
      return 'User denied the request for Geolocation.';
    case 2:
      return 'Location information is unavailable.';
    case 3:
      return 'The request to get user location timed out.';
  }
}

export const scrollTop = (): string => {
  return (window.history.scrollRestoration = 'manual');
};

export const decodeToken = token => {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace('-', '+').replace('_', '/');
  return JSON.parse(window.atob(base64));
};

export const formatMoney = (amount: number, separator: string, currency: string): string => {
  amount = Math.ceil(amount);
  let text = '';

  if (amount > 0) {
    while (amount > 0) {
      text = separator + (amount % 1000).toString().padStart(3, '0') + text;
      amount = Math.floor(amount / 1000);
    }

    while (text[0] === separator || text[0] === '0') {
      text = text.substring(1);
    }
  } else {
    text = '0';
  }
  text = currency + text;
  return text;
};
