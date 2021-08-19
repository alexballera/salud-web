import React, { createContext } from 'react';
import AppProvider from './AppProvider';
import { AppStates } from './types';

export const AppContext = createContext({});

export const withAppContext = <P extends object>(
  Component: React.ComponentType<P>,
  mapStateToProp?: any
): React.FunctionComponent<any> => {
  const ConsumableComponent: React.FunctionComponent = props => {
    return (
      <AppContext.Consumer>
        {state => {
          const mappedProps = mapStateToProp ? mapStateToProp(state) : state;
          const mergedProps = { ...props, ...mappedProps };
          return <Component {...mergedProps} />;
        }}
      </AppContext.Consumer>
    );
  };
  return ConsumableComponent;
};

export const Provider = AppProvider;
export type IAppProps = AppStates;
