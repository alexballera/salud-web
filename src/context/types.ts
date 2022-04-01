// INTERFACES && TYPES
import { Models } from 'appwrite';
export type AppStates = {
  user: any;
  loggedIn: boolean;
  fetching: boolean;
};

export type TProps = {
  children?: React.ReactNode;
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

// INTERFACES && TYPES END
