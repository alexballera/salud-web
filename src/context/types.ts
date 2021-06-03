// INTERFACES
export type AppStates = {
  user: any;
  loggedIn: boolean;
  fetching: boolean;
  errorState: { open: boolean; message: string };
};

export type Props = {
  children?: React.ReactNode;
};
// INTERFACES END
