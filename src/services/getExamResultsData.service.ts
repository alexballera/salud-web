import axios, { AxiosResponse } from 'axios';

/// TYPES
export type TResult = {
  name: string;
  value: string;
  unit: string;
  referenceRange: string;
  comments?: string;
};

export type TGeneralData = {
  userId: string;
  id: string;
  type: string;
  name: string;
  date: string;
  performer: string;
  result: TResult[] | string;
  procedureZone?: string;
  diagnostic?: string;
  interpretation?: string;
}[];

export type TExamResultsGroup = { month: string; items: TGeneralData }[];

export type TDose = {
  dose: string;
  date: string;
  applied?: boolean;
};

export type TVaccines = {
  name: string;
  regular?: TDose[];
  reinforcement?: TDose[];
  extra?: TDose[];
  vaccineId?: string;
};

export type TVaccinesData = {
  userId: string;
  registeredBy: string;
  schema: string;
  vaccines: TVaccines[];
};
/// TYPES END

const groupResultsByMonth = (data: TGeneralData) => {
  const groups = data.reduce((groups, curr) => {
    const month = new Date(curr.date).getMonth().toLocaleString();
    if (!groups[month]) {
      groups[month] = [];
    }
    groups[month].push(curr);
    return groups;
  }, {});
  return Object.keys(groups).map(month => {
    return {
      month: month.toString(),
      items: groups[month]
    };
  });
};

const filterResultsByYear = (data: TGeneralData, year: number) => {
  const currentDate = new Date(year, 0, 1);
  const firstDay = new Date(currentDate.getFullYear(), 0, 1);
  const lastDay = new Date(currentDate.getFullYear(), 11, 31);
  return data.filter(item => {
    const itemDateParsed = new Date(item.date);
    return itemDateParsed >= firstDay && itemDateParsed <= lastDay;
  });
};

export const getExamResultsByYear = async (
  userId: string,
  year: number
): Promise<TExamResultsGroup> => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL_BFF}/patients/${userId}/exams`
  );
  const filterResults = filterResultsByYear(data, year);
  return groupResultsByMonth(filterResults);
};

export const getExamResultsData = (userId: string): Promise<AxiosResponse<TGeneralData>> => {
  return axios.get(`${process.env.NEXT_PUBLIC_API_URL_BFF}/patients/${userId}/exams`);
};

export const getExamResultsById = (userId: string, id: string): Promise<TGeneralData[0]> => {
  let findItem;
  return new Promise(resolve => {
    getExamResultsData(userId)
      .then(res => {
        findItem = res.data.find(item => item.id === id);
      })
      .catch(err => console.error(err))
      .finally(() => resolve(findItem));
  });
};
