export type TConsultationHistoryResponse = {
  userId: string;
  consultations: TConsultationHistory[];
};

export type TConsultationHistory = {
  medicalConsultationId: string;
  month: string;
  name: string;
  doctor: string;
  reason: string;
  healthSite: string;
  date: string;
};

export type TConsultationHistoryGroup = { month: string; items: TConsultationHistory[] }[];

export type TGetConsultationHistoryByIdParams = {
  userId: string;
  year: string;
  medicalConsultationId?: string;
};
