import { toMatchDiffSnapshot } from 'snapshot-diff';
import { render, cleanup, fireEvent } from '@testing-library/react';

/// COMPONENTS
import Wizard, { IWizardDataSourceItem } from '../../../src/components/common/Wizard';

expect.extend({ toMatchDiffSnapshot });

afterEach(() => cleanup());

describe('<Wizard/>', () => {
  test('renders whithout crashing', () => {
    const dataSource: IWizardDataSourceItem[] = [
      {
        title: 'This is a test',
        description: 'This is a test description',
        component: <h1></h1>
      }
    ];

    const { container, getByText } = render(<Wizard dataSource={dataSource} />);
    expect(container).toContainHTML('h1');
    expect(container).toHaveTextContent('This is a test');
    expect(container).toHaveTextContent('This is a test description');
    expect(getByText(/Enviar/));
  });

  test('clicking the button calls event onSubmit if there is only one element whitout crashing', () => {
    const mockHandlerSubmit = jest.fn();
    const dataSource: IWizardDataSourceItem[] = [
      {
        title: 'This is a test',
        description: 'This is a test description',
        component: <h1></h1>
      }
    ];

    const { getByText } = render(<Wizard onSubmit={mockHandlerSubmit} dataSource={dataSource} />);
    const button = getByText(/Enviar/);

    fireEvent.click(button);

    expect(mockHandlerSubmit).toHaveBeenCalledTimes(1);
  });

  test('clicking the button calls event handler once and render the next step component without crashing', () => {
    const dataSource: IWizardDataSourceItem[] = [
      {
        title: 'This is a test component 1',
        description: 'This is a test description',
        component: <h1></h1>
      },
      {
        title: 'This is a test component 2',
        description: 'This is a test description',
        component: <h1></h1>
      }
    ];

    const { getByText, asFragment } = render(<Wizard dataSource={dataSource} />);
    const firstRender = asFragment();
    fireEvent.click(getByText(/Siguiente/));

    expect(firstRender).toMatchDiffSnapshot(asFragment());
  });

  test('should render a custom footer without crashing', () => {
    const customFooter = <footer>footer</footer>;
    const dataSource: IWizardDataSourceItem[] = [
      {
        title: 'This is a test component 1',
        description: 'This is a test description',
        component: <h1></h1>
      }
    ];

    const { getByText } = render(<Wizard dataSource={dataSource} footer={customFooter} />);

    expect(getByText(/footer/));
  });
});
