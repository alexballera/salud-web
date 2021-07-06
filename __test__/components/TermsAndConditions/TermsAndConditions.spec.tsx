import { act, render, waitForElementToBeRemoved } from '@testing-library/react';
import { unmountComponentAtNode } from 'react-dom';
import { MockedProvider } from '@apollo/client/testing';
import TermsAndConditions from '../../../src/components/TermsAndConditions';
import {
  mockFailure,
  mockSuccess
} from '../../../__mock__/cms/TermsAndConditions/TermsAndConditions.mock';

// https://es.reactjs.org/docs/testing-recipes.html#data-fetching
// https://www.apollographql.com/docs/react/development-testing/testing/
describe('<TermsAndConditions>', () => {
  let container = null;

  beforeEach(() => {
    // configurar un elemento del DOM como objetivo del renderizado
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    // limpiar al salir
    unmountComponentAtNode(container);
    container.remove();
    container = null;
  });

  it('render without crashing', () => {
    act(() => {
      const Component = () => (
        <MockedProvider mocks={[mockSuccess]} addTypename={false}>
          <TermsAndConditions />
        </MockedProvider>
      );
      render(<Component />, container);

      const title = document.querySelector('[data-testid="title-term-and-conditions"]');

      expect(title.innerHTML).toBe('Términos y condiciones');
    });
  });

  it('loading query render skeleton', () => {
    act(() => {
      const Component = () => (
        <MockedProvider mocks={[mockSuccess]} addTypename={false}>
          <TermsAndConditions />
        </MockedProvider>
      );

      const { getByTestId } = render(<Component />, container);
      const skeleton = getByTestId('loading-skeleton');

      expect(skeleton).not.toBeNull();
      expect(skeleton.children).not.toBeNull();
    });
  });

  it('skeleton disappear after loading', async () => {
    await act(async () => {
      const Component = () => (
        <MockedProvider mocks={[mockSuccess]} addTypename={false}>
          <TermsAndConditions />
        </MockedProvider>
      );

      const { getByTestId } = render(<Component />, container);

      await waitForElementToBeRemoved(getByTestId('loading-skeleton'));
      const skeleton = document.querySelector('[data-testid="loading-skeleton"]');
      expect(skeleton).toBeNull();
    });
  });

  it('show error when query fail', async () => {
    await act(async () => {
      const Component = () => (
        <MockedProvider mocks={[mockFailure]} addTypename={false}>
          <TermsAndConditions />
        </MockedProvider>
      );
      const { getByText } = render(<Component />, container);

      await new Promise(resolve => setTimeout(resolve, 0)); // wait for response
      expect(
        getByText(mockFailure.result.data.getPageTermsAndConditions.error.message)
      ).toBeInTheDocument();
    });
  });

  it('show terms and conditions correctly', async () => {
    await act(async () => {
      const Component = () => (
        <MockedProvider mocks={[mockSuccess]} addTypename={false}>
          <TermsAndConditions />
        </MockedProvider>
      );
      const { getByText } = render(<Component />, container);

      await new Promise(resolve => setTimeout(resolve, 0)); // wait for response

      expect(
        getByText(mockSuccess.result.data.getPageTermsAndConditions.data.content[0].data.text)
      ).toBeInTheDocument();

      expect(
        getByText(mockSuccess.result.data.getPageTermsAndConditions.data.content[1].data.text)
      ).toBeInTheDocument();
    });
  });
});
