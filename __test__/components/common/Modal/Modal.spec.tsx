import Modal from '../../../../src/components/common/Modal';
import { act, fireEvent, render } from '@testing-library/react';
import { unmountComponentAtNode } from 'react-dom';
import { Button, Typography } from '@material-ui/core';
import React from 'react';

describe('<Modal/>', () => {
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

  it('modal rendering ', async () => {
    const handleClose = jest.fn();
    await act(async () => {
      const Component = () => (
        <Modal open={false} onClose={handleClose}>
          <>
            <p>Test</p>
          </>
        </Modal>
      );

      const { getByTestId } = render(<Component />, container);

      await new Promise(resolve => setTimeout(resolve, 0)); // wait for response

      const modal = getByTestId('modal');
      expect(modal).not.toBeNull();
    });
  });

  it('the variable open in false should not show the modal ', async () => {
    const handleClose = jest.fn();
    await act(async () => {
      const Component = () => (
        <Modal open={false} onClose={handleClose}>
          <>
            <p>Test</p>
          </>
        </Modal>
      );

      const { getByTestId } = render(<Component />, container);

      await new Promise(resolve => setTimeout(resolve, 0)); // wait for response

      const modal = getByTestId('modal');

      expect(modal).not.toBeVisible();
    });
  });

  it('the variable open in true should not show the modal ', async () => {
    const handleClose = jest.fn();
    await act(async () => {
      const Component = () => (
        <Modal open={true} onClose={handleClose}>
          <>
            <p>Test</p>
          </>
        </Modal>
      );

      const { getByTestId } = render(<Component />, container);

      await new Promise(resolve => setTimeout(resolve, 0)); // wait for response

      const modal = getByTestId('modal');

      expect(modal).toBeVisible();
    });
  });

  it('click on close button close the modal', async () => {
    const handleClose = jest.fn();
    await act(async () => {
      const Component = () => (
        <Modal open={true} onClose={handleClose}>
          <>
            <p>Test</p>
          </>
        </Modal>
      );

      const { getByTestId } = render(<Component />, container);

      await new Promise(resolve => setTimeout(resolve, 0)); // wait for response

      const modal = getByTestId('modal');
      const closeButton = getByTestId('modal-close-button');

      fireEvent.click(closeButton);

      expect(modal).not.toBeVisible();
      expect(handleClose).toHaveBeenCalledTimes(1);
    });
  });

  it('modal is close and throw click over close button, keep close the modal', async () => {
    const handleClose = jest.fn();

    await act(async () => {
      const Component = () => (
        <Modal open={false} onClose={handleClose}>
          <p>Test</p>
        </Modal>
      );

      const { getByTestId } = render(<Component />, container);

      await new Promise(resolve => setTimeout(resolve, 0)); // wait for response

      const modal = getByTestId('modal');
      const closeButton = getByTestId('modal-close-button');

      fireEvent.click(closeButton);

      expect(modal).not.toBeVisible();
    });
  });

  it('modal render content', async () => {
    const handleClose = jest.fn();

    await act(async () => {
      const Component = () => (
        <Modal open={true} onClose={handleClose}>
          <>
            <p>Test paragraph</p>
            <span>Test span</span>
            <h1>Test H1</h1>
            <Typography variant="h6">Test H6 MaterialUI</Typography>
            <Button>Test button MaterialUI</Button>
          </>
        </Modal>
      );

      const { queryByText } = render(<Component />, container);

      await new Promise(resolve => setTimeout(resolve, 0)); // wait for response

      expect(queryByText('Test paragraph')).toBeInTheDocument();
      expect(queryByText('Test span')).toBeInTheDocument();
      expect(queryByText('Test H1')).toBeInTheDocument();
      expect(queryByText('Test H6 MaterialUI')).toBeInTheDocument();
      expect(queryByText('Test button MaterialUI')).toBeInTheDocument();
    });
  });
});
