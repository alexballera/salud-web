type TSearchHistory = {
  doctorId: string;
  doctorName: string;
  medicalSpeciality: string;
  date: string;
};

export type TSearchHistoryResponse = {
  searches: TSearchHistory[];
};
