export type TFamiliarDiseasesResponse = {
  token?: string;
  userId: string;
  diseases: TFamiliarDiseases;
  details?: string;
};

export type TFamiliarDiseases = {
  diabetes?: string[];
  highPressure?: string[];
  cancer?: string[];
  heartDisease?: string[];
  mentalDiseases?: string[];
  alzheimer?: string[];
  depression?: string[];
  anxiety?: string[];
  personalityProblems?: string[];
  stroke?: string[];
  epilepsy?: string[];
  tuberculosis?: string[];
};
