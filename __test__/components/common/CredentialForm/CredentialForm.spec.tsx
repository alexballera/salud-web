import userEvent from '@testing-library/user-event';
import { act, cleanup, waitFor } from '@testing-library/react';
/// COMPONENT
import { render } from '../../../../__mock__/formik-test-wraper';
import CredentialDataForm from '../../../../src/containers/SignUp/components/CredentialData';

const initialValues = {
  email: '',
  terms: false,
  password: '',
  services: false,
  superappUser: false,
  confirmPassword: ''
};

const wrapperOptions = {
  formikProps: {
    initialValues,
    validationSchema: CredentialDataForm.validations.schema
  }
};

afterEach(() => cleanup());

describe('<CredentialDataForm>', () => {
  test('render without crashing', () => {
    act(() => {
      const tree = render(CredentialDataForm, { wrapperOptions });
      expect(tree).toMatchSnapshot();
    });
  });

  // test('should show errors whitout crashing', async () => {
  //   await act(async () => {
  //     const mockHandleSubmit = jest.fn();
  //     const { getByText, getAllByText } = render(CredentialDataForm, {
  //       wrapperOptions: {
  //         ...wrapperOptions,
  //         formikProps: {
  //           ...wrapperOptions.formikProps,
  //           onSubmit: mockHandleSubmit
  //         }
  //       }
  //     });
  //     const submitButton = getByText(/Enviar/);

  //     userEvent.click(submitButton);

  //     await waitFor(() => {
  //       expect(getAllByText(/Campo requerido/)).toHaveLength(6);
  //     });
  //   });
  // });

  test('should submitting the form without crashing', async () => {
    const initialValues = {
      email: 'testing@gmail.com',
      terms: true,
      gender: '1',
      canton: '1',
      country: '1',
      province: '1',
      password: '123456Ws',
      lastName: 'Enis',
      district: '1',
      services: true,
      firstName: 'Pepe',
      birthDate: '2020/11/1',
      superappUser: true,
      documentType: '1',
      mobilePhone1: '123123',
      documentNumber: '112168589',
      confirmPassword: '123456Ws'
    };

    await act(async () => {
      const mockHandleSubmit = jest.fn();
      const { getByText } = render(CredentialDataForm, {
        wrapperOptions: {
          ...wrapperOptions,
          formikProps: {
            ...wrapperOptions.formikProps,
            initialValues,
            onSubmit: mockHandleSubmit
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
