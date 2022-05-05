export type TDoctors = {
  doctors: TDoctor[];
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
