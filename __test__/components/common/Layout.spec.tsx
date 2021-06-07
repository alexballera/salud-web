import { unmountComponentAtNode } from 'react-dom';
import { act, render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import Layout from '../../../src/components/common/Layout';
import AppProvider, { initialStates } from '../../../src/context/AppProvider';
import { AppContext } from '../../../src/context';

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
