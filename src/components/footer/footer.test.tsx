import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Footer from './footer';
import { AppRoute } from '../../const';

describe('Footer Component', () => {
  it('should render the footer element', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );

    const footer = screen.getByRole('contentinfo');
    expect(footer).toBeInTheDocument();
  });

  it('should render logo link with correct href', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );

    const logoLink = screen.getByRole('link', { name: /6 cities logo/i });
    expect(logoLink).toHaveAttribute('href', AppRoute.Main);
  });

  it('should render logo image with correct attributes', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );

    const logoImg = screen.getByAltText('6 cities logo');
    expect(logoImg).toHaveAttribute('src', 'img/logo.svg');
    expect(logoImg).toHaveAttribute('width', '64');
    expect(logoImg).toHaveAttribute('height', '33');
  });
});
