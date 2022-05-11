/// BASE IMPORTS
import { useEffect, useState, createContext } from 'react';
///  BASE IMPORTS END

/// TYPES
import { Models } from 'appwrite';
import type { TUserContent, TProps } from './types';
/// TYPES END

/// SERVICES
import api from '../api/api';
/// SERVICES END

/// HOOK
import useIsMounted from '../hooks/useIsMounted';
/// HOOK END

const STORANGE_KEY = 'SESSIONID';

const LOGGEDIN_ROUTES = [
  '/main',
  '/profile',
  '/logout',
  '/medicalData',
  '/proceedings',
  '/clinic_history',
  '/clinic_history/diseases',
  '/clinic_history/allergies',
  '/clinic_history/allergies/[allergie_id]',
  '/clinic_history/habits',
  '/clinic_history/habits/[habits_id]',
  '/medicalDirectory',
  '/medicalDirectory/searchBy/doctorResults',
  '/medicalDirectory/searchBy',
  '/medicalDirectory/searchResults',
  '/medicalDirectory/searchBy/search_by_specialty',
  '/medicalDirectory/searchBy/specialtyResults',
  '/doctor_profile/[doctor_id]'
];

const UserContext = createContext({} as TUserContent);

function UserProvider({ children }: TProps): JSX.Element {
  const isMounted = useIsMounted();
  const [isLoading, setIsLoading] = useState(true);
  const [userLogState, setUserLogState] = useState<TUserContent['userLogState']>('UNKNOWN');
  const [account, setAccount] = useState(null);
  const [session, setSession] = useState<Models.Session | null>(null);

  useEffect(() => {
    if (isMounted) {
      const key = window.localStorage.getItem(STORANGE_KEY);
      loadSession(key);
    }
  }, [isMounted]);

  const loadSession = (key: string | null) => {
    if (!key) {
      setIsLoading(false);
      setUserLogState('LOGGEDOUT');
      return;
    }
    api
      .getUserSession(key)
      .then(session => {
        setUserLogState('LOGGEDIN');
        setSession(session);
      })
      .catch(() => {
        setUserLogState('LOGGEDOUT');
      })
      .finally(() => {
        setIsLoading(false);
      });

    api.getAccount().then(account => {
      setAccount(account);
    });
  };

  const initializeGuestSession = ({ $id }: Models.Session) => {
    window.localStorage.setItem(`${STORANGE_KEY}-GUEST`, $id);
  };

  const verifyEmail = async (userId: string, secret) => {
    const sessionID = window.localStorage.getItem(`${STORANGE_KEY}-GUEST`);

    if (!sessionID) throw Error('Previous session not found!');

    await api.emailUpdateVerification(userId, secret);
    const session = await api.getUserSession(sessionID);
    const account = await api.getAccount();

    window.localStorage.removeItem(`${STORANGE_KEY}-GUEST`);

    initializeSession(session, account);
  };

  const initializeSession = (session: Models.Session, account: Models.User<Models.Preferences>) => {
    setUserLogState('LOGGEDIN');
    setSession(session);
    setAccount(account);
    window.localStorage.setItem(STORANGE_KEY, session.$id);
  };

  const handleUserSignIn = async (email: string, password: string) => {
    const session = await api.createSession(email, password);
    const account = await api.getAccount();
    return {
      session,
      account
    };
  };

  const handleUserLogOut = async () => {
    await api.userLogOut(session.$id);
    window.localStorage.removeItem(STORANGE_KEY);
    setUserLogState('LOGGEDOUT');
  };

  return (
    <UserContext.Provider
      value={{
        account,
        session,
        isLoading,
        userLogState,
        loggedInRoutes: LOGGEDIN_ROUTES,
        initializeSession,
        handleUserSignIn,
        handleUserLogOut,
        verifyEmail,
        initializeGuestSession
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export { UserProvider, UserContext };
