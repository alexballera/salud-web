import { render } from '@testing-library/react';
import { Formik, Form } from 'formik';
/// MATERIAL-UI
import Button from '@material-ui/core/Button';

const AllTheSteps = ({ children, ...props }): JSX.Element => {
  return (
    <Formik {...props.formikProps}>
      {formik => (
        <Form>
          {children({ ...formik, ...props.componentProps })}
          <Button type="submit">Enviar</Button>
        </Form>
      )}
    </Formik>
  );
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const customRender = (ui, options) => {
  return render(ui, {
    // eslint-disable-next-line react/display-name
    wrapper: props => <AllTheSteps {...props} {...options.wrapperOptions} />,
    ...options
  });
};

// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender as render };
