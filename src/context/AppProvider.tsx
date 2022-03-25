import React, { useState } from 'react';
import { AppContext } from './index';
// TYPES
import type { AppStates, TProps } from './types';
// APOLLO
import Client from '../config/apollo';
import { ApolloProvider } from '@apollo/client';

const apolloClient = Client.getInstance();

export const initialStates: AppStates = {
  user: null,
  loggedIn: false,
  fetching: false
};

export default function AppProvider({ children }: TProps): JSX.Element {
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
        handleError,
        handleLoading
      }}
    >
      <ApolloProvider client={apolloClient}>{children}</ApolloProvider>
    </AppContext.Provider>
  );
}
