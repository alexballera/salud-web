/// TYPES
export type IFormData = {
  email: string
  terms: boolean
  gender: GenderEnum | null
  canton: string
  country: string
  province: string
  password: string
  lastName: string
  district: string
  services: boolean
  firstName: string
  birthDate: string
  superappUser: boolean
  documentType: number
  mobilePhone1: string
  documentNumber: string
  confirmPassword: string
}

export type IPersonalDataForm = {
  documentType: number
  documentNumber: string
}

export type IExtraDataForm = {
  gender: GenderEnum
  canton: string
  district: string
  province: string
  mobilePhone1: string
}

export type ICredentialDataForm = {
  email: string
  terms: boolean
  password: string
  services: boolean
  superappUser: boolean
  confirmPassword: string
}

export type GenderEnum = '1' | '2'
/// TYPES END
