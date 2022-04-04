/// BASE IMPORTS
import axios from 'axios';
/// BASE IMPORTS

const BFF_URL = process.env.NEXT_PUBLIC_API_URL_BFF; // TODO: Get env variable for this value

/// TYPES
export type TPatientRecipiesAndPrescription<T extends string, U> = {
  id: string;
  type: T;
  details: U;
  reportDate: string;
  reporter: {
    name: string;
    speciality: string;
  };
};

export type TRecipe = {
  description: string;
  indications: string;
};

export type TPrescription = {
  drug: string;
  power: number;
  take: number;
  frequency: number;
  quantity: number;
  via: string;
  days: number;
  indications: string;
  status: string;
  statusDate: string;
};

export type TPatientRecipiesAndPrescriptionList = (
  | TPatientRecipiesAndPrescription<'recipe', TRecipe>
  | TPatientRecipiesAndPrescription<'prescription', TPrescription>
)[];

export type TPatientRecipiesAndPrescriptionGroups = {
  month: string;
  items: TPatientRecipiesAndPrescriptionList;
}[];
/// TYPES END

const groupResultsByMonth = (recipiesAndPrescriptions: TPatientRecipiesAndPrescriptionList) => {
  const groups = recipiesAndPrescriptions.reduce((groups, curr) => {
    const month = new Date(curr.reportDate).getMonth();
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

const filterResultsByYear = (data: TPatientRecipiesAndPrescriptionList, year: number) => {
  const currentDate = new Date(year, 5, 5);
  const firstDay = new Date(currentDate.getFullYear(), 0, 1);
  const lastDay = new Date(currentDate.getFullYear(), 11, 31);
  return data.filter(item => {
    const itemDateParsed = new Date(item.reportDate);
    return itemDateParsed >= firstDay && itemDateParsed <= lastDay;
  });
};

export const getRecipiesAndPrescriptionsById = async (
  id: string,
  userId = ''
): Promise<TPatientRecipiesAndPrescriptionList[0] | null> => {
  const { data } = await axios.get(`${BFF_URL}/patients/${userId}/recipies-prescriptions`);
  return data.find(item => item.id === id) as TPatientRecipiesAndPrescriptionList[0] | null;
};

export const getRecipiesAndPrescriptionsByYear = async (
  year: number,
  userId = 1
): Promise<TPatientRecipiesAndPrescriptionGroups> => {
  const { data } = await axios.get(`${BFF_URL}/patients/${userId}/recipies-prescriptions`);
  console.table(data);
  const filterResults = filterResultsByYear(data, year);
  return groupResultsByMonth(filterResults);
};
