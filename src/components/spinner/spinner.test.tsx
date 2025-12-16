import { render, screen } from '@testing-library/react';
import Spinner from './spinner';

describe('Spinner component', () => {
  it('renders spinner container', () => {
    const { container } = render(<Spinner />);

    expect(container.firstChild).toBeInTheDocument();
  });

  it('renders spinner image', () => {
    render(<Spinner />);

    const image = screen.getByRole('img');

    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src');
  });
});
