type THabits = {
  id: string;
  status?: boolean;
  addictionStatus?: string;
  passive?: boolean;
  quantity?: string;
  frequency?: string;
  period?: string;
  wantsToQuit?: boolean;
  type?: string;
  duration?: string;
  details?: string;
};

type THabitsDrugs = {
  name: string;
  observation: string;
};

export type THabitsResponse = {
  smoking?: THabits;
  alcoholism?: THabits;
  physicalActivity?: THabits;
  drugs?: THabitsDrugs[];
};
