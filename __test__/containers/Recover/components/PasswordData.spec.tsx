import { axe, toHaveNoViolations } from 'jest-axe';
import PasswordDataForm from '../../../../src/containers/Recover/components/PasswordData';
import { act, fireEvent, render, screen } from '../../../../__mock__/formik-test-wraper';
import { wrapperOptions as defaultWrapperOptions } from '../../../../__mock__/Recover.mock';

expect.extend(toHaveNoViolations);

const wrapperOptions = {
  ...defaultWrapperOptions,
  validationSchema: PasswordDataForm.validations.schema
};

describe('<PasswordDataForm />', () => {
  it('should render without throwing an error', () => {
    act(() => {
      render(PasswordDataForm, { wrapperOptions });
    });
  });

  it('should show validation error on invalid password', async () => {
    let newPasswordContainer: HTMLElement;
    let newPasswordConfirmContainer: HTMLElement;
    let submitButton: HTMLElement;
    const submitMock = jest.fn();
    await act(async () => {
      render(PasswordDataForm, {
        wrapperOptions: {
          ...wrapperOptions,
          formikProps: { ...wrapperOptions.formikProps, onSubmit: submitMock }
        }
      });

      newPasswordContainer = await screen.findByTestId('password-input');
      newPasswordConfirmContainer = await screen.findByTestId('password-confirm-input');
      submitButton = await screen.findByText('Enviar');

      fireEvent.change(newPasswordContainer.getElementsByTagName('input')[0], {
        target: { value: 'invld' }
      });

      fireEvent.change(newPasswordConfirmContainer.getElementsByTagName('input')[0], {
        target: { value: 'invld' }
      });
      fireEvent.click(submitButton);
    });
  });

  it('should be accesible', async () => {
    let results;

    await act(async () => {
      render(props => <PasswordDataForm {...props} />, {
        wrapperOptions: wrapperOptions
      });

      results = await axe(document.body);
    });

    expect(results).toHaveNoViolations();
  });
});
