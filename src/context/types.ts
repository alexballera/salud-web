// INTERFACES && TYPES
import { Models } from 'appwrite';
export type AppStates = {
  user: any;
  loggedIn: boolean;
  fetching: boolean;
  errorState: { open: boolean; message: string; type: 'success' | 'error' | 'warning' };
};

export type TProps = {
  children?: React.ReactNode;
};

export type INotificationProps = {
  open: boolean;
  message: string;
  severity: INotificationTypes;
  duration?: number;
};

export type TUserContent = {
  session: Models.Session;
  isLoading: boolean;
  userLogState: 'LOGGEDIN' | 'LOGGEDOUT' | 'UNKNOWN';
  loggedInRoutes: string[];
  account: Models.User<Models.Preferences>;
  handleUserSignIn: (
    email: string,
    password: string
  ) => Promise<{ session: Models.Session; account: Models.User<Models.Preferences> }>;
  handleUserLogOut: () => Promise<any>;
  verifyEmail: (userId: string, secret: string) => Promise<void>;
  initializeSession: (session: Models.Session, account: Models.User<Models.Preferences>) => void;
  initializeGuestSession: (session: Models.Session) => void;
};

export type INotificationTypes = 'success' | 'error' | 'info' | 'warning';
// INTERFACES && TYPES END
