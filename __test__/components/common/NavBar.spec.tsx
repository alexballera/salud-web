import { unmountComponentAtNode } from 'react-dom';
import { act, render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import router from 'next/router';
import Navbar from '../../../src/components/common/Navbar';
import { AppContext } from '../../../src/context';
import AppProvider from '../../../src/context/AppProvider';

jest.mock('next/router', () => require('next-router-mock'));

let container = null;

expect.extend(toHaveNoViolations);

beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

describe('<NavBar />', () => {
  it('should render NavBar without throwing an error', () => {
    act(() => {
      render(
        <AppProvider>
          <Navbar />
        </AppProvider>,
        container
      );
    });
  });

  it('should render "INGRESAR" button on landing', () => {
    router.push('/');

    act(() => {
      render(
        <AppProvider>
          <Navbar />
        </AppProvider>,
        container
      );
    });

    const buttons = screen.getAllByTestId('login-button');

    expect(buttons.length).toEqual(1);
    expect(buttons[0].textContent).toMatch(/INGRESAR/);
  });

  it('should render "INGRESAR" button on landing', () => {
    router.push('/');

    act(() => {
      render(
        <AppProvider>
          <Navbar />
        </AppProvider>,
        container
      );
    });

    const buttons = screen.getAllByTestId('login-button');

    expect(buttons.length).toEqual(1);
    expect(buttons[0].textContent).toMatch(/INGRESAR/);
  });

  it('shouldn\'t render "INGRESAR" button on /login', () => {
    router.push('/login');

    act(() => {
      render(
        <AppProvider>
          <Navbar />
        </AppProvider>,
        container
      );
    });

    try {
      screen.getAllByTestId('login-button');
    } catch (err) {
      expect(err.name).toEqual('TestingLibraryElementError');
      expect(err.message).toMatch(/Unable to find an element by: \[data-testid="login-button"\]/);
    }
  });

  it('shouldn\'t render "INGRESAR" button on /login', () => {
    router.push('/');

    act(() => {
      render(
        <AppContext.Provider value={{ loggedIn: true }}>
          <Navbar />
        </AppContext.Provider>,
        container
      );
    });

    const testFunction = jest.fn();

    try {
      screen.getAllByTestId('login-button');
      testFunction();
    } catch (err) {
      expect(err.name).toEqual('TestingLibraryElementError');
      expect(err.message).toMatch(/Unable to find an element by: \[data-testid="login-button"\]/);
    }

    expect(testFunction).not.toBeCalled();
  });

  it('should be accesible', async () => {
    let results;

    await act(async () => {
      render(
        <AppProvider>
          <Navbar />
        </AppProvider>,
        container
      );

      results = await axe(document.body);
    });

    expect(results).toHaveNoViolations();
  });
});
