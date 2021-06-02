import React, { useState } from 'react';
import { AppContext } from './index';
// TYPES
import { AppStates, Props } from './types';

const initialStates: AppStates = {
  user: null,
  loggedIn: false,
  fetching: false
};

export default function AppProvider({ children }: Props): JSX.Element {
  const [state, setState] = useState(initialStates);

  const handleLogin = user => {
    setState(prevState => ({ ...prevState, user, loggedIn: true }));
  };

  const handleLoading = (): void => {
    setState({ ...state, fetching: !state.fetching });
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        handleLogin,
        handleLoading
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
