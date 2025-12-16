import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Page404 from './page-404';
import { AppRoute } from '../../const';
import styles from './page-404.module.css';

vi.mock('../../components/header/header', () => ({
  default: () => <header data-testid="header">Header</header>
}));
vi.mock('../../components/footer/footer', () => ({
  default: () => <footer data-testid="footer">Footer</footer>
}));

describe('Page404 Component', () => {
  const renderWithRouter = () =>
    render(
      <MemoryRouter>
        <Page404 />
      </MemoryRouter>
    );

  it('renders Header and Footer', () => {
    renderWithRouter();
    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });

  it('displays 404 text with correct class', () => {
    renderWithRouter();
    const text = screen.getByText(/404 - Page not found/i);
    expect(text).toBeInTheDocument();
    expect(text).toHaveClass(styles.text404);
  });

  it('displays the 404 image with correct class', () => {
    renderWithRouter();
    const img = screen.getByRole('img');
    expect(img).toBeInTheDocument();
    expect(img).toHaveClass(styles.gif404);
    expect(img).toHaveAttribute('src', expect.stringContaining('404_2.gif'));
  });

  it('has a link back to main screen with correct class', () => {
    renderWithRouter();
    const link = screen.getByRole('link', { name: /back to main screen/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveClass(styles.button404);
    expect(link).toHaveAttribute('href', AppRoute.Main);
  });

  it('main container has correct class', () => {
    renderWithRouter();
    const main = screen.getByRole('main');
    expect(main).toHaveClass(styles.page404);
  });
});
