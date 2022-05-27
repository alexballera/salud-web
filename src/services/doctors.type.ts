export type TDoctors = {
  priceMax: number;
  doctors: TDoctor;
};

export type TDoctor = {
  doctorId: string;
  name: string;
  speciality: string;
  info?: string;
  price: string;
  medicalIntitutions: TMedicalInstitutions[];
  telephone?: string;
  schedule?: string;
  web?: string;
  email?: string;
}[];

export type TMedicalInstitutions = {
  id: string;
  name: string;
  externalId: string;
  latitude: string;
  longitude: string;
  province: string;
  canton: string;
  district: string;
};

// eslint-disable-next-line no-shadow
export enum DoctorSearchType {
  general = 1,
  speciality = 2,
  location = 3,
  name = 4
}
// eslint-disable-next-line no-shadow
export enum DoctorSearchMode {
  virtual = 1,
  presential = 2
}
// eslint-disable-next-line no-shadow
export enum DoctorSearchAppt {
  next = 1,
  weekend = 2,
  weekMorning = 3,
  weekLate = 4,
  exactDate = 5
}
// eslint-disable-next-line no-shadow
export enum DoctorSearchOrder {
  distance = 1,
  priceHighLow = 2,
  priceLowHigh = 3,
  available = 4,
  alphabetically = 5
}

export type queryDoctor = {
  latitude: string;
  longitude: string;
  type: DoctorSearchType;
  detail?: string;
  range?: number;
  order?: DoctorSearchOrder;
  priceRange?: string;
  appt?: DoctorSearchAppt;
  mode?: DoctorSearchMode;
  date?: string;
};
