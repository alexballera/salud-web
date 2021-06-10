import React, { useState } from 'react';
import { AppContext } from './index';
// TYPES
import { AppStates, Props } from './types';

export const initialStates: AppStates = {
  user: null,
  loggedIn: false,
  fetching: false,
  errorState: { open: false, message: '', type: 'error' }
};

export default function AppProvider({ children }: Props): JSX.Element {
  const [state, setState] = useState(initialStates);

  const handleLogin = user => {
    setState(prevState => ({ ...prevState, user, loggedIn: true }));
  };

  const handleLoading = (isLoading = !state.fetching): void => {
    setState(prevState => ({ ...prevState, fetching: isLoading }));
  };

  const handleError = (open: boolean, message = '', type?: 'success' | 'error' | 'warning') => {
    setState(prevState => ({ ...prevState, errorState: { open, message, type: type || 'error' } }));
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        handleLogin,
        handleLoading,
        handleError
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
