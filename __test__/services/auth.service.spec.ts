import axios, { AxiosResponse } from 'axios';
import {
  forgotPasswordChangePassword,
  forgotPasswordConfirmCodeService,
  forgotPasswordResendPin,
  forgotPasswordSendEmailService,
  loginService
} from '../../src/services/auth.service';
import { ReturnedUser } from '../../__mock__/User.mock';

jest.mock('axios');

describe('Auth Service', () => {
  it('should return a user', async () => {
    axios.post = jest.fn(
      (): Promise<AxiosResponse<any>> =>
        Promise.resolve({
          data: { result: ReturnedUser },
          status: 200,
          statusText: 'Ok',
          headers: {},
          config: {}
        })
    );

    const response = await loginService('test@email.com', 'testPassword12');

    expect(response.data.result).toEqual(ReturnedUser);
  });

  it('should return an error', async () => {
    axios.post = jest.fn(
      (): Promise<AxiosResponse<any>> =>
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

    const then = jest.fn();

    return loginService('test@email.com', 'testPassword12')
      .then(then)
      .catch(err => {
        expect(err.response.data.error.message).toEqual('Test error message');
      })
      .finally(() => {
        expect(then).not.toBeCalled();
      });
  });
});

describe('Auth Service Forgot Password', () => {
  it('should resolve on send email', async () => {
    axios.post = jest.fn(
      (): Promise<void> =>
        // eslint-disable-next-line prefer-promise-reject-errors
        Promise.resolve()
    );

    const successMock = jest.fn();
    const errorMock = jest.fn();

    return forgotPasswordSendEmailService('some@email.com')
      .then(successMock)
      .catch(errorMock)
      .finally(() => {
        expect(successMock).toBeCalled();
        expect(errorMock).not.toBeCalled();
      });
  });

  it('should resolve on verify code', async () => {
    axios.post = jest.fn(
      (): Promise<void> =>
        // eslint-disable-next-line prefer-promise-reject-errors
        Promise.resolve()
    );

    const successMock = jest.fn();
    const errorMock = jest.fn();

    return forgotPasswordConfirmCodeService('some@email.com', '123456')
      .then(successMock)
      .catch(errorMock)
      .finally(() => {
        expect(successMock).toBeCalled();
        expect(errorMock).not.toBeCalled();
      });
  });

  it('should resolve on resend code', async () => {
    axios.post = jest.fn(
      (): Promise<void> =>
        // eslint-disable-next-line prefer-promise-reject-errors
        Promise.resolve()
    );

    const successMock = jest.fn();
    const errorMock = jest.fn();

    return forgotPasswordResendPin('some@email.com')
      .then(successMock)
      .catch(errorMock)
      .finally(() => {
        expect(successMock).toBeCalled();
        expect(errorMock).not.toBeCalled();
      });
  });

  it('should resolve on change password', async () => {
    axios.post = jest.fn(
      (): Promise<void> =>
        // eslint-disable-next-line prefer-promise-reject-errors
        Promise.resolve()
    );

    const successMock = jest.fn();
    const errorMock = jest.fn();

    return forgotPasswordChangePassword('some@email.com', '123456', 'newPassword', 'newPassword')
      .then(successMock)
      .catch(errorMock)
      .finally(() => {
        expect(successMock).toBeCalled();
        expect(errorMock).not.toBeCalled();
      });
  });
});
