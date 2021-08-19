import axios from 'axios';
import { axe, toHaveNoViolations } from 'jest-axe';
import ValidationDataForm from '../../../../src/containers/Recover/components/ValidationData';
import { withAppContext } from '../../../../src/context';
import AppProvider from '../../../../src/context/AppProvider';
import { act, render } from '../../../../__mock__/formik-test-wraper';
import { wrapperOptions as defaultWrapperOptions } from '../../../../__mock__/Recover.mock';

jest.mock('axios');
jest.mock('next/router', () => require('next-router-mock'));
jest.mock('../../../../src/services/auth.service.ts', () => ({
  forgotPasswordSendEmailService: jest.fn(() => Promise.resolve())
}));

expect.extend(toHaveNoViolations);

const wrapperOptions = {
  ...defaultWrapperOptions,
  validationSchema: ValidationDataForm.validations
};

const Component = Component => withAppContext(props => <Component {...props} />);

describe('<ValidationDataForm />', () => {
  axios.post = jest.fn();

  it('should render without throwing an error', () => {
    const props = {
      values: {
        email: 'invld@email.com',
        validPin: '0',
        pinCode: ''
      },
      errors: {},
      handleChange: value => (props.values.pinCode = value),
      handleLoading: jest.fn(),
      handleError: jest.fn()
    };

    const Comp = Component(ValidationDataForm);

    act(() => {
      render(
        props => (
          <AppProvider>
            <Comp {...props} />
          </AppProvider>
        ),
        {
          wrapperOptions
        }
      );
    });
  });

  it('should show error on unregistred email', async () => {
    axios.post = jest.fn();
    const props = {
      values: {
        email: 'invld@email.com',
        validPin: '0',
        pinCode: ''
      },
      errors: {},
      handleChange: value => (props.values.pinCode = value),
      handleLoading: jest.fn(),
      handleError: jest.fn()
    };
    const submitMock = jest.fn();

    const Comp = Component(ValidationDataForm);
    await act(async () => {
      render(
        props => (
          <AppProvider>
            <Comp {...props} />
          </AppProvider>
        ),
        {
          wrapperOptions: {
            ...wrapperOptions,
            formikProps: {
              ...wrapperOptions.formikProps,
              onSubmit: submitMock,
              initialValues: { email: 'invld@email.com', validPin: '0', pinCode: '' }
            }
          }
        }
      );
    });
  });

  it('should be accesible', async () => {
    let results;

    const Comp = Component(ValidationDataForm);

    await act(async () => {
      render(
        props => (
          <AppProvider>
            <Comp {...props} />
          </AppProvider>
        ),
        {
          wrapperOptions: {
            ...wrapperOptions,
            formikProps: {
              ...wrapperOptions.formikProps,
              onSubmit: jest.fn(),
              initialValues: { email: 'invld@email.com', validPin: '0', pinCode: '' }
            }
          }
        }
      );

      results = await axe(document.body);
    });

    expect(results).toHaveNoViolations();
  });
});
