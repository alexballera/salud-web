import { act, render, screen } from '@testing-library/react';
import { toHaveNoViolations } from 'jest-axe';
import { unmountComponentAtNode } from 'react-dom';
import Alert from '../../../src/components/common/Alert';

let container = null;

expect.extend(toHaveNoViolations);

beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

describe('<Alert />', () => {
  it('should render Layout without throwing an error', () => {
    act(() => {
      render(<Alert variant="error" />, container);
    });
  });

  it('should render children', async () => {
    act(() => {
      render(<Alert variant="error">Test text</Alert>, container);
    });

    const div = await screen.findAllByTestId('alert-element');

    expect(div.length).toEqual(1);
    expect(div[0].textContent).toEqual('Test text');
  });
});
