/// BASE IMPORTS
import axios, { AxiosResponse } from 'axios';
/// BASE IMPORTS

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

export const mockData: TPatientRecipiesAndPrescriptionList = [
  /// 2022 ITEMS
  {
    id: '1',
    reportDate: '2022-02-26T00:55:19.596Z',
    reporter: {
      name: 'Dr. Manuel Rodriguez Mora',
      speciality: 'Ginecología'
    },
    type: 'prescription',
    details: {
      via: 'Oral',
      take: 2,
      frequency: 1,
      quantity: 1,
      days: 3,
      power: 10,
      drug: 'Loratadina',
      indications: 'Consumir en ayunas. Suspender consumo de alcohol durante el tratamiento',
      status: '',
      statusDate: ''
    }
  },
  {
    id: '2',
    reportDate: '2022-02-25T00:55:19.596Z',
    reporter: {
      name: 'Dr. Carlos Smith Doe',
      speciality: 'Dermatología'
    },
    type: 'prescription',
    details: {
      via: 'Oral',
      take: 2,
      frequency: 1,
      quantity: 5,
      days: 2,
      power: 2,
      drug: 'Simvastatina',
      indications: 'Consumir en ayunas. Suspender consumo de alcohol durante el tratamiento',
      status: '',
      statusDate: ''
    }
  },
  {
    id: '3',
    reportDate: '2022-02-24T00:55:19.596Z',
    reporter: {
      name: 'Dr. Paula Barrantes Mena',
      speciality: 'Neurología'
    },
    type: 'prescription',
    details: {
      via: 'Oral',
      take: 3,
      frequency: 5,
      quantity: 3,
      days: 3,
      power: 6,
      drug: 'Omeprazol',
      indications: 'Consumir en ayunas. Suspender consumo de alcohol durante el tratamiento',
      status: '',
      statusDate: ''
    }
  },
  {
    id: '4',
    reportDate: '2022-03-24T00:55:19.596Z',
    reporter: {
      name: 'Dr. John Mills',
      speciality: 'Oftalmología'
    },
    type: 'recipe',
    details: {
      description: 'Ibuprofeno',
      indications: 'Consumir en ayunas. Suspender consumo de alcohol durante el tratamiento'
    }
  },
  /// 2022 ITEMS END
  /// 2021 ITEMS
  {
    id: '5',
    reportDate: '2021-10-26T00:55:19.596Z',
    reporter: {
      name: 'Dr. Carlos Vargas Blanco',
      speciality: 'Radiología'
    },
    type: 'prescription',
    details: {
      via: 'Oral',
      take: 2, // unit
      frequency: 8,
      quantity: 18,
      days: 3,
      power: 10,
      drug: 'Aspirina',
      indications: 'Consumir en ayunas. Suspender consumo de alcohol durante el tratamiento',
      status: '',
      statusDate: ''
    }
  }
  /// 2021 ITEMS END
];

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

export const getRecipiesAndPrescriptionsByYear = (
  year: number
): Promise<TPatientRecipiesAndPrescriptionGroups> => {
  return new Promise(resolve => {
    const filterResults = filterResultsByYear(mockData, year);
    const groupByMonth = groupResultsByMonth(filterResults);
    setTimeout(() => {
      resolve(groupByMonth);
    }, 4000);
  });
};

export const getRecipiesAndPrescriptionsById = (
  id: string
): Promise<TPatientRecipiesAndPrescriptionList[0] | null> => {
  return new Promise(resolve => {
    const findItem = mockData.find(item => item.id === id);
    setTimeout(() => {
      resolve(findItem);
    }, 4000);
  });
};
