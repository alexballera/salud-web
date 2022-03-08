import axios, { AxiosResponse } from 'axios';
/// TYPES

export type TResult = {
  name: string;
  value: string;
  unit: string;
};

export type TGeneralData = {
  userId: string;
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
    type: 'laboratory',
    name: 'Perfil Lipidico',
    date: '2020-02-25T00:00:00.000Z',
    performer: 'Dra. Clotilde Miraflores',
    result: [
      {
        name: 'apariencia del suero',
        value: '23',
        unit: 'n/a'
      },
      {
        name: 'colesterol total',
        value: '231',
        unit: 'mg/dl'
      },
      {
        name: 'colesterol hdl',
        value: '213',
        unit: 'mg/dl'
      },
      {
        name: 'colesterol ldl',
        value: '123',
        unit: 'mg/dl'
      },
      {
        name: 'colesterol no hdl',
        value: '123',
        unit: 'mg/dl'
      },
      {
        name: 'trigliceridos',
        value: '213',
        unit: 'mg/dl'
      },
      {
        name: 'colesterol vldl',
        value: '22',
        unit: 'n/a'
      },
      {
        name: 'col/hdl',
        value: '22',
        unit: 'n/a'
      },
      {
        name: 'hdl/col',
        value: '33',
        unit: 'n/a'
      },
      {
        name: 'ldl/hdl',
        value: '33',
        unit: 'n/a'
      },
      {
        name: 'a/g',
        value: '33',
        unit: 'n/a'
      },
      {
        name: 'quilomicrones',
        value: '4',
        unit: 'mg/dl'
      }
    ]
  },
  {
    userId: 'ee957013-b02f-45b2-b837-092b490242ea',
    type: 'procedure',
    name: 'Rayos X',
    date: '2022-01-24T00:00:00.000Z',
    performer: 'Dra. Clotilde Miraflores',
    result: 'Alterado',
    procedureZone: 'Torax',
    diagnostic: 'El paciente presenta un volumen pulmonar bajo',
    interpretation: 'Se observan anomalias en el volumen del pulmon derecho'
  },
  {
    userId: 'ee957013-b02f-45b2-b837-092b490242ea',
    type: 'laboratory',
    name: 'Perfil Lipidico',
    date: '2021-04-25T00:00:00.000Z',
    performer: 'Dra. Clotilde Miraflores',
    result: [
      {
        name: 'apariencia del suero',
        value: '23',
        unit: 'n/a'
      },
      {
        name: 'colesterol total',
        value: '231',
        unit: 'mg/dl'
      },
      {
        name: 'colesterol hdl',
        value: '213',
        unit: 'mg/dl'
      },
      {
        name: 'colesterol ldl',
        value: '123',
        unit: 'mg/dl'
      },
      {
        name: 'colesterol no hdl',
        value: '123',
        unit: 'mg/dl'
      },
      {
        name: 'trigliceridos',
        value: '213',
        unit: 'mg/dl'
      },
      {
        name: 'colesterol vldl',
        value: '22',
        unit: 'n/a'
      },
      {
        name: 'col/hdl',
        value: '22',
        unit: 'n/a'
      },
      {
        name: 'hdl/col',
        value: '33',
        unit: 'n/a'
      },
      {
        name: 'ldl/hdl',
        value: '33',
        unit: 'n/a'
      },
      {
        name: 'a/g',
        value: '33',
        unit: 'n/a'
      },
      {
        name: 'quilomicrones',
        value: '4',
        unit: 'mg/dl'
      }
    ]
  },
  {
    userId: 'ee957013-b02f-45b2-b837-092b490242ea',
    type: 'procedure',
    name: 'Rayos X',
    date: '2020-01-24T00:00:00.000Z',
    performer: 'Dra. Clotilde Miraflores',
    result: 'Alterado',
    procedureZone: 'Torax',
    diagnostic: 'El paciente presenta un volumen pulmonar bajo',
    interpretation: 'Se observan anomalias en el volumen del pulmon derecho'
  }
];

const groupResultsByMonth = (data: TGeneralData) => {
  const groups = data.reduce((groups, curr) => {
    const month = new Date(curr.date).getMonth();
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

export const getExamResultsByYear = (year: number): Promise<TExamResultsGroup> => {
  return new Promise(resolve => {
    const filterResults = filterResultsByYear(mockData, year);
    const groupByMonth = groupResultsByMonth(filterResults);
    setTimeout(() => {
      resolve(groupByMonth);
    }, 4000);
  });
};

export const getExamResultsData = (): Promise<AxiosResponse<any>> => {
  // TODO GET DATA FROM API
  return axios.get(
    `https://bff-dev.omnisaludhub.net/api/patients/ee957013-b02f-45b2-b837-092b490242ea/exams`
  );
};
