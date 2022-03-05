/// BASE IMPORTS
import axios, { AxiosResponse } from 'axios';
/// BASE IMPORTS

/// TYPES
export type TExamResults = {
  id: string;
  type: string;
  name: string;
  date: string;
  performer: string;
  result: TResultLaboratory[] | string;
  procedureZone?: string;
  diagnostic?: string;
  interpretation?: string;
};

export type TResultLaboratory = {
  name: string;
  value: string;
  unit: string;
  referenceRange: string;
  comments: string;
};

/// TYPES END

export const mockData: TExamResults[] = [
  /// 2022 ITEMS
  {
    id: '1',
    type: 'laboratory',
    name: 'Perfil Lipidico',
    date: '2022-01-25T00:00:00.000Z',
    performer: 'Dra. Clotilde Miraflores',
    result: [
      {
        name: 'apariencia del suero',
        value: '23',
        unit: 'n/a',
        referenceRange: '30-150',
        comments: 'bajo'
      },
      {
        name: 'colesterol total',
        value: '231',
        unit: 'mg/dl',
        referenceRange: '30-150',
        comments: 'bajo'
      },
      {
        name: 'colesterol hdl',
        value: '213',
        unit: 'mg/dl',
        referenceRange: '30-150',
        comments: 'bajo'
      },
      {
        name: 'colesterol ldl',
        value: '123',
        unit: 'mg/dl',
        referenceRange: '30-150',
        comments: 'bajo'
      },
      {
        name: 'colesterol no hdl',
        value: '123',
        unit: 'mg/dl',
        referenceRange: '30-150',
        comments: 'bajo'
      },
      {
        name: 'trigliceridos',
        value: '213',
        unit: 'mg/dl',
        referenceRange: '30-150',
        comments: 'bajo'
      },
      {
        name: 'colesterol vldl',
        value: '22',
        unit: 'n/a',
        referenceRange: '30-150',
        comments: 'bajo'
      },
      {
        name: 'col/hdl',
        value: '22',
        unit: 'n/a',
        referenceRange: '30-150',
        comments: 'bajo'
      },
      {
        name: 'hdl/col',
        value: '33',
        unit: 'n/a',
        referenceRange: '30-150',
        comments: 'bajo'
      },
      {
        name: 'ldl/hdl',
        value: '33',
        unit: 'n/a',
        referenceRange: '30-150',
        comments: 'bajo'
      },
      {
        name: 'a/g',
        value: '33',
        unit: 'n/a',
        referenceRange: '30-150',
        comments: 'bajo'
      },
      {
        name: 'quilomicrones',
        value: '4',
        unit: 'mg/dl',
        referenceRange: '30-150',
        comments: 'bajo'
      }
    ]
  },
  {
    id: '2',
    type: 'procedure',
    name: 'Rayos X',
    date: '2022-01-24T00:00:00.000Z',
    performer: 'Dra. Clotilde Miraflores',
    result: 'Alterado',
    procedureZone: 'Torax',
    diagnostic: 'El paciente presenta un volumen pulmonar bajo',
    interpretation: 'Se observan anomalias en el volumen del pulmon derecho'
  }
  /// 2021 ITEMS END
];

export const getExamResultsById = (id: string): Promise<TExamResults | null> => {
  return new Promise(resolve => {
    const findItem = mockData.find(item => item.id === id);
    setTimeout(() => {
      resolve(findItem);
    }, 4000);
  });
};
