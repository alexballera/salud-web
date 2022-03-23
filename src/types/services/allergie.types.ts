type TAllergies = {
  id: string;
  description: string;
  isActive: boolean;
  comments: string;
  performer: string;
  specialization: string;
};

export type TAllergieResponse = {
  allergies: TAllergies[];
};
