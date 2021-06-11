import { rest } from 'msw';
import userEvent from '@testing-library/user-event';
import { setupServer } from 'msw/node';
import { act, cleanup, screen, waitForElementToBeRemoved, waitFor } from '@testing-library/react';
/// MOCKS
import {
  mockCantonesResult,
  mockDistrictResult,
  mockProvincesResult,
  wrapperOptions
} from '../../../__mock__/extraData.mock';
/// COMPONENT
import { render } from '../../../__mock__/formik-test-wraper';
import ExtraDataForm from '../../../src/containers/SignUp/components/ExtraData';

const API_URL = 'https://nbej1dm79d.execute-api.us-east-1.amazonaws.com/dev/';

const server = setupServer(
  rest.get(`${API_URL}sac-general/provinces-api`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        result: mockProvincesResult
      })
    );
  }),
  rest.get(`${API_URL}sac-general/cantons-api`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        result: mockCantonesResult
      })
    );
  }),
  rest.get(`${API_URL}sac-general/districts-api`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        result: mockDistrictResult
      })
    );
  })
);

beforeAll(() => server.listen());
afterAll(() => server.close());
afterEach(() => {
  server.resetHandlers();
  cleanup();
});

describe('<ExtraDataForm>', () => {
  const OLD_ENV = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...OLD_ENV };
  });
  afterAll(() => {
    process.env = OLD_ENV; // Restore old environment
  });

  test('render without crashing', async () => {
    process.env.apiUrl = API_URL;

    await act(async () => {
      const tree = render(ExtraDataForm, { wrapperOptions });

      expect(tree).toMatchSnapshot();

      await waitForElementToBeRemoved(screen.getByTestId('provinces-loader'));
    });
  });

  test('should show errors whitout crashing', async () => {
    process.env.apiUrl = API_URL;

    await act(async () => {
      const mockHandleSubmit = jest.fn();
      const { getByText, getAllByText } = render(ExtraDataForm, {
        wrapperOptions: {
          ...wrapperOptions,
          formikProps: {
            ...wrapperOptions.formikProps,
            onSubmit: mockHandleSubmit,
            validationSchema: ExtraDataForm.validations.schema
          }
        }
      });
      const submitButton = getByText(/Enviar/);

      userEvent.click(submitButton);

      await waitFor(() => {
        expect(getAllByText(/Campo requerido/)).toHaveLength(5);
      });

      await waitForElementToBeRemoved(screen.getByTestId('provinces-loader'));
    });
  });

  test('should submitting the form without crashing', async () => {
    process.env.apiUrl = API_URL;

    const initialValues = {
      gender: '1',
      canton: 'canton',
      district: 'distrito',
      province: 'provincia',
      mobilePhone1: '123123123'
    };

    await act(async () => {
      const mockHandleSubmit = jest.fn();
      const { getByText } = render(ExtraDataForm, {
        wrapperOptions: {
          ...wrapperOptions,
          formikProps: {
            ...wrapperOptions.formikProps,
            initialValues,
            onSubmit: mockHandleSubmit,
            validationSchema: ExtraDataForm.validations.schema
          }
        }
      });
      const submitButton = getByText(/Enviar/);

      userEvent.click(submitButton);

      await waitFor(() => {
        expect(mockHandleSubmit).toHaveBeenCalledWith(initialValues, expect.anything());
      });
    });
  });
});
