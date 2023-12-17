import { render } from '@testing-library/react';
import Spinner from './spinner';

describe('Spinner component', () => {
  test('renders spinner container', () => {
    const { container } = render(<Spinner />);
    const spinnerContainer = container.querySelector('.spinner-container');
    expect(spinnerContainer).toBeInTheDocument();
  });

  test('renders spinner', () => {
    const { container } = render(<Spinner />);
    const spinner = container.querySelector('.spinner');
    expect(spinner).toBeInTheDocument();
  });
});
