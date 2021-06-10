import axios, { AxiosResponse } from 'axios';
import { loginService } from '../../src/services/auth.service';
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

    loginService('test@email.com', 'testPassword12')
      .then(then)
      .catch(err => {
        expect(err.response.data.error.message).toEqual('Test error message');
      });

    expect(then).not.toBeCalled();
  });
});
