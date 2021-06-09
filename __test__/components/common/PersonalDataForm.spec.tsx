import userEvent from '@testing-library/user-event';
import { act, cleanup, waitFor } from '@testing-library/react';
/// COMPONENT
import { render } from '../../../src/utils/formik-test-wraper';
import PersonalDataForm from '../../../src/containers/SignUp/components/PersonalData';

const wrapperOptions = {
  formikProps: {
    initialValues: {
      lastName: '',
      firstName: '',
      birthDate: '',
      documentType: '',
      documentNumber: ''
    },
    validationSchema: PersonalDataForm.validations.schema
  },
  componentProps: {
    documentTypesOptions: [{ documentTypeId: 0, name: 'cedula', mask: [], length: 9 }]
  }
};

afterEach(() => cleanup());

describe('<PersonalDataForm>', () => {
  test('render without crashing', () => {
    act(() => {
      const tree = render(PersonalDataForm, { wrapperOptions });
      expect(tree).toMatchSnapshot();
    });
  });

  test('should show errors whitout crashing', async () => {
    await act(async () => {
      const mockHandleSubmit = jest.fn();
      const { getByText, getAllByText } = render(PersonalDataForm, {
        wrapperOptions: {
          ...wrapperOptions,
          formikProps: {
            ...wrapperOptions.formikProps,
            onSubmit: mockHandleSubmit
          }
        }
      });
      const submitButton = getByText(/Enviar/);

      userEvent.click(submitButton);

      await waitFor(() => {
        expect(getAllByText(/Campo requerido/)).toHaveLength(2);
      });
    });
  });

  test('should submitting the form without crashing', async () => {
    await act(async () => {
      const mockHandleSubmit = jest.fn();
      const { getByText } = render(PersonalDataForm, {
        wrapperOptions: {
          ...wrapperOptions,
          formikProps: {
            ...wrapperOptions.formikProps,
            initialValues: {
              lastName: 'lastname',
              firstName: 'firstname',
              birthDate: '2020-11-11',
              documentType: '0',
              documentNumber: '123123123'
            },
            onSubmit: mockHandleSubmit
          }
        }
      });
      const submitButton = getByText(/Enviar/);

      userEvent.click(submitButton);

      await waitFor(() => {
        expect(mockHandleSubmit).toHaveBeenCalledWith(
          {
            lastName: 'lastname',
            firstName: 'firstname',
            birthDate: '2020-11-11',
            documentType: '0',
            documentNumber: '123123123'
          },
          expect.anything()
        );
      });
    });
  });
});
