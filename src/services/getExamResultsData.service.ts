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

export const mockData: TGeneralData = [
  {
    userId: 'ee957013-b02f-45b2-b837-092b490242ea',
    id: '1',
    type: 'laboratory',
    name: 'Perfil Lipidico',
    date: '2022-02-28T00:55:19.596Z', // 2022-01-25T00:00:00.000Z
    performer: 'Dra. Clotilde Miraflores',
    result: [
      {
        name: 'apariencia del suero',
        value: '23',
        unit: 'n/a',
        referenceRange: '30-150',
        comments: 'Ninguno'
      },
      {
        name: 'colesterol total',
        value: '231',
        unit: 'mg/dl',
        referenceRange: '30-150',
        comments: 'Ninguno'
      },
      {
        name: 'colesterol hdl',
        value: '213',
        unit: 'mg/dl',
        referenceRange: '30-150',
        comments: 'Ninguno'
      },
      {
        name: 'colesterol ldl',
        value: '123',
        unit: 'mg/dl',
        referenceRange: '30-150',
        comments: 'Ninguno'
      },
      {
        name: 'colesterol no hdl',
        value: '123',
        unit: 'mg/dl',
        referenceRange: '30-150',
        comments: 'Ninguno'
      },
      {
        name: 'trigliceridos',
        value: '213',
        unit: 'mg/dl',
        referenceRange: '30-150',
        comments: 'Ninguno'
      },
      {
        name: 'colesterol vldl',
        value: '22',
        unit: 'n/a',
        referenceRange: '30-150',
        comments: 'Ninguno'
      },
      {
        name: 'col/hdl',
        value: '22',
        unit: 'n/a',
        referenceRange: '30-150',
        comments: 'Ninguno'
      },
      {
        name: 'hdl/col',
        value: '33',
        unit: 'n/a',
        referenceRange: '30-150',
        comments: 'Ninguno'
      },
      {
        name: 'ldl/hdl',
        value: '33',
        unit: 'n/a',
        referenceRange: '30-150',
        comments: 'Ninguno'
      },
      {
        name: 'a/g',
        value: '33',
        unit: 'n/a',
        referenceRange: '30-150',
        comments: 'Ninguno'
      },
      {
        name: 'quilomicrones',
        value: '4',
        unit: 'mg/dl',
        referenceRange: '30-150',
        comments: 'Ninguno'
      }
    ]
  },
  {
    userId: 'ee957013-b02f-45b2-b837-092b490242ea',
    id: '2',
    type: 'procedure',
    name: 'Rayos X',
    date: '2022-02-26T00:55:19.596Z',
    performer: 'Dra. Clotilde Miraflores',
    result: 'Alterado',
    procedureZone: 'Torax',
    diagnostic: 'El paciente presenta un volumen pulmonar bajo',
    interpretation: 'Se observan anomalias en el volumen del pulmon derecho'
  }
];

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

export const getExamResultsByYear = (data: TGeneralData, year: number): TExamResultsGroup => {
  const filterResults = filterResultsByYear(data, year);
  const groupByMonth = groupResultsByMonth(filterResults);
  return groupByMonth;
};

export const getExamResultsData = (): Promise<AxiosResponse<TGeneralData>> => {
  return axios.get(
    `https://bff-dev.omnisaludhub.net/api/patients/ee957013-b02f-45b2-b837-092b490242ea/exams`
  );
};

export const getExamResultsById = (id: string): Promise<TGeneralData[0] | null> => {
  return new Promise(resolve => {
    const findItem = mockData.find(item => item.id === id);
    setTimeout(() => {
      resolve(findItem);
    }, 4000);
  });
};
