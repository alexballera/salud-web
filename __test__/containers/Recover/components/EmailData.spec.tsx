import { axe, toHaveNoViolations } from 'jest-axe';
import EmailDataForm from '../../../../src/containers/Recover/components/EmailData';
import { act, fireEvent, render, screen } from '../../../../__mock__/formik-test-wraper';
import { wrapperOptions as defaultWrapperOptions } from '../../../../__mock__/Recover.mock';

expect.extend(toHaveNoViolations);

const wrapperOptions = {
  ...defaultWrapperOptions,
  validationSchema: EmailDataForm.validations
};

describe('<EmailDataForm />', () => {
  it('should render without throwing an error', () => {
    let tree;
    act(() => {
      tree = render(EmailDataForm, { wrapperOptions });
    });

    expect(tree).toMatchSnapshot();
  });

  it('should show error on invalid email', async () => {
    let tree;
    let inputContainer: HTMLElement;
    let submitButton: HTMLElement;
    const submitMock = jest.fn();
    await act(async () => {
      tree = render(EmailDataForm, {
        wrapperOptions: {
          ...wrapperOptions,
          formikProps: { ...wrapperOptions.formikProps, onSubmit: submitMock }
        }
      });

      inputContainer = await screen.findByTestId('email-input');
      submitButton = await screen.findByText('Enviar');

      fireEvent.change(inputContainer.getElementsByTagName('input')[0], {
        target: { value: 'nonEmailValue' }
      });
      fireEvent.click(submitButton);
    });
  });

  it('should submit with valid email', async () => {
    let inputContainer: HTMLElement;
    let submitButton: HTMLElement;
    const submitMock = jest.fn();
    await act(async () => {
      render(EmailDataForm, {
        wrapperOptions: {
          ...wrapperOptions,
          formikProps: { ...wrapperOptions.formikProps, onSubmit: submitMock }
        }
      });

      inputContainer = await screen.findByTestId('email-input');
      submitButton = await screen.findByText('Enviar');

      fireEvent.change(inputContainer.getElementsByTagName('input')[0], {
        target: { value: 'some@email.com' }
      });
      fireEvent.click(submitButton);
    });
    expect(inputContainer.textContent).toEqual('Correo electrónico​');
    expect(inputContainer.textContent).not.toMatch(/Formato de correo incorrecto/);
    expect(submitMock).toBeCalled();
  });

  it('should be accesible', async () => {
    let results;

    await act(async () => {
      render(props => <EmailDataForm {...props} />, {
        wrapperOptions: wrapperOptions
      });

      results = await axe(document.body);
    });

    expect(results).toHaveNoViolations();
  });
});
