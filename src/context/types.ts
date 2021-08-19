// INTERFACES
export type AppStates = {
  user: any;
  loggedIn: boolean;
  fetching: boolean;
  errorState: { open: boolean; message: string; type: 'success' | 'error' | 'warning' };
};

export type Props = {
  children?: React.ReactNode;
};

export type INotificationProps = {
  open: boolean;
  message: string;
  severity: INotificationTypes;
};

export type INotificationTypes = 'success' | 'error' | 'info' | 'warning';
// INTERFACES END
