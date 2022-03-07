import axios, { AxiosResponse } from 'axios';
/// TYPES
export type TLaboratory = {
  userId: string;
  type: string;
  name: string;
  date: string;
  performer: string;
  result: TResult[];
};

export type TProcedure = {
  userId: string;
  type: string;
  name: string;
  date: string;
  performer: string;
  result: string;
  procedureZone?: string;
  diagnostic?: string;
  interpretation?: string;
};

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

export const mockData: TGeneralData = [
  {
    userId: 'ee957013-b02f-45b2-b837-092b490242ea',
    type: 'laboratory',
    name: 'Perfil Lipidico',
    date: '2022-01-25T00:00:00.000Z',
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
  }
];

export const getPatientExamsData = (): Promise<AxiosResponse<any>> => {
  // TODO GET DATA FROM API
  return axios.get(
    `https://bff-dev.omnisaludhub.net/api/patients/ee957013-b02f-45b2-b837-092b490242ea/exams`
  );
};
