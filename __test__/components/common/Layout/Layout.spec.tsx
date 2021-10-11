import { unmountComponentAtNode } from 'react-dom';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import AppProvider, { initialStates } from '../../../../src/context/AppProvider';
import { AppContext } from '../../../../src/context';
import Layout from '../../../../src/layouts/Layout';

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
  jest.useRealTimers();
});

describe('<Layout />', () => {
  it('should render Layout without throwing an error', () => {
    act(() => {
      render(
        <AppProvider>
          <Layout />
        </AppProvider>,
        container
      );
    });
  });

  it('should render children component', () => {
    act(() => {
      render(
        <AppProvider>
          <Layout>
            <p>Test text</p>
          </Layout>
        </AppProvider>,
        container
      );
    });

    expect(document.body.textContent).toMatch(/Test text/);
  });

  it('should render error', () => {
    act(() => {
      render(
        <AppContext.Provider
          value={{ ...initialStates, errorState: { open: true, message: 'Test error' } }}
        >
          <Layout />
        </AppContext.Provider>,
        container
      );
    });

    const alert = screen.getAllByTestId('alert-element');

    expect(alert.length).toEqual(1);
    expect(alert[0].textContent).toMatch(/Test error/);
  });

  it('should close error snackbar', () => {
    const handleErrorMock = jest.fn();
    act(() => {
      jest.useFakeTimers();
      render(
        <AppContext.Provider
          value={{
            ...initialStates,
            errorState: { open: true, message: 'Test error', type: 'error' },
            handleError: handleErrorMock
          }}
        >
          <Layout duration={1} />
        </AppContext.Provider>,
        container
      );

      const main = screen.getAllByTestId('alert-element');

      fireEvent.click(main[0]);
    });

    jest.runAllTimers();

    expect(handleErrorMock).toBeCalledWith(false, '', 'error');
  });

  it('should be accesible', async () => {
    let results;

    await act(async () => {
      render(
        <AppProvider>
          <Layout />
        </AppProvider>,
        container
      );

      results = await axe(document.body);
    });

    expect(results).toHaveNoViolations();
  });
});
