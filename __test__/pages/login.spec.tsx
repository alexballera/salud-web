import React from 'react';
import { unmountComponentAtNode } from 'react-dom';
import { act, fireEvent, render, screen } from '@testing-library/react';
import LoginPage from '../../src/pages/login';
import axios, { AxiosResponse } from 'axios';
import AppProvider from '../../src/context/AppProvider';
import Router from 'next/router';
import { AppContext } from '../../src/context';
import { LoginEmptyResultResponse } from '../../__mock__/Responses.mock';
import { axe, toHaveNoViolations } from 'jest-axe';

jest.mock('axios');
jest.mock('next/router', () => require('next-router-mock'));

let container = null;

expect.extend(toHaveNoViolations);

beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement('div');
  document.body.appendChild(container);
  jest.resetAllMocks();
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

describe('HomePage', () => {
  test('should render Login without throwing an error', async () => {
    render(
      <AppProvider>
        <LoginPage />
      </AppProvider>
    );
  });

  it('should not submit if verifications are invalid', async () => {
    // Mocks
    axios.post = jest.fn(
      (): Promise<AxiosResponse<any>> => Promise.resolve(LoginEmptyResultResponse)
    );

    await act(async () => {
      render(<LoginPage />, container);

      // Simulate login
      const loginButton = await screen.findByTestId('login-button');

      fireEvent(
        loginButton,
        new MouseEvent('click', {
          bubbles: true,
          cancelable: true
        })
      );
    });

    expect(axios.post).not.toBeCalled();
  });

  it('should login', async () => {
    // Mocks
    axios.post = jest.fn(
      (): Promise<AxiosResponse<any>> => Promise.resolve(LoginEmptyResultResponse)
    );

    await act(async () => {
      render(
        <AppProvider>
          <LoginPage />
        </AppProvider>,
        container
      );

      // Fields and submit button
      const loginButton = await screen.findByTestId('login-button');
      const emailField = (await screen.findByTestId('email-field')).getElementsByTagName(
        'input'
      )[0];
      const passwordField = (await screen.findByTestId('password-field')).getElementsByTagName(
        'input'
      )[0];

      // Complete fields
      fireEvent.change(emailField, { target: { value: 'email@test.com' } });
      fireEvent.change(passwordField, { target: { value: 'PasswordTest12' } });

      // Submit
      fireEvent.click(loginButton);
    });

    await new Promise(resolve =>
      setTimeout(() => resolve(expect(axios.post).toBeCalledTimes(1)), 1)
    );
  });

  it('should redirect on login', async () => {
    axios.post = jest.fn(
      (): Promise<AxiosResponse<any>> => Promise.resolve(LoginEmptyResultResponse)
    );

    const redirectSpy = jest.spyOn(Router, 'replace');

    await act(async () => {
      render(
        <AppProvider>
          <LoginPage />
        </AppProvider>,
        container
      );

      // Fields and submit button
      const loginButton = await screen.findByTestId('login-button');
      const emailField = (await screen.findByTestId('email-field')).getElementsByTagName(
        'input'
      )[0];
      const passwordField = (await screen.findByTestId('password-field')).getElementsByTagName(
        'input'
      )[0];

      // Complete fields
      fireEvent.change(emailField, { target: { value: 'email@test.com' } });
      fireEvent.change(passwordField, { target: { value: 'PasswordTest12' } });

      // Submit
      fireEvent.click(loginButton);
    });

    expect(redirectSpy).toBeCalledWith('/main');
  });

  it('should show errors', async () => {
    axios.post = jest.fn(() =>
      // eslint-disable-next-line prefer-promise-reject-errors
      Promise.reject({
        response: {
          data: {
            error: {
              message: 'Test error message'
            }
          }
        }
      })
    );

    const handleError = jest.fn();

    await act(async () => {
      render(
        <AppContext.Provider value={{ fetching: false, handleError, handleLoading: jest.fn() }}>
          <LoginPage />
        </AppContext.Provider>,
        container
      );

      // Fields and submit button
      const loginButton = await screen.findByTestId('login-button');
      const emailField = (await screen.findByTestId('email-field')).getElementsByTagName(
        'input'
      )[0];
      const passwordField = (await screen.findByTestId('password-field')).getElementsByTagName(
        'input'
      )[0];

      // Complete fields
      fireEvent.change(emailField, { target: { value: 'email@test.com' } });
      fireEvent.change(passwordField, { target: { value: 'PasswordTest12' } });

      // Submit
      fireEvent.click(loginButton);
    });

    expect(handleError).toBeCalledTimes(1);
    expect(handleError).toBeCalledWith(true, 'Test error message');
  });

  it('should show unknown errors', async () => {
    axios.post = jest.fn(() =>
      // eslint-disable-next-line prefer-promise-reject-errors
      Promise.reject({})
    );

    const handleError = jest.fn();

    await act(async () => {
      render(
        <AppContext.Provider value={{ fetching: false, handleError, handleLoading: jest.fn() }}>
          <LoginPage />
        </AppContext.Provider>,
        container
      );

      // Fields and submit button
      const loginButton = await screen.findByTestId('login-button');
      const emailField = (await screen.findByTestId('email-field')).getElementsByTagName(
        'input'
      )[0];
      const passwordField = (await screen.findByTestId('password-field')).getElementsByTagName(
        'input'
      )[0];

      // Complete fields
      fireEvent.change(emailField, { target: { value: 'email@test.com' } });
      fireEvent.change(passwordField, { target: { value: 'PasswordTest12' } });

      // Submit
      fireEvent.click(loginButton);
    });

    expect(handleError).toBeCalledTimes(1);
    expect(handleError).toBeCalledWith(
      true,
      'Ha ocurrido un error desconocido. Vuelve a intentarlo o contacta a un administrador.'
    );
  });

  it('should be accesible', async () => {
    let results;

    await act(async () => {
      render(
        <AppProvider>
          <LoginPage />
        </AppProvider>,
        container
      );

      results = await axe(document.body);
    });

    expect(results).toHaveNoViolations();
  });
});
