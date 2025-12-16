import { render, screen } from '@testing-library/react';
import App from './app';
import { AppRoute } from '../../const';
import { fetchCheckAuth } from '../../store/user/action';

let initialEntries: string[] = [AppRoute.Main];

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<typeof import('react-router-dom')>(
    'react-router-dom'
  );

  return {
    ...actual,
    BrowserRouter: ({ children }: { children: React.ReactNode }) => (
      <actual.MemoryRouter initialEntries={initialEntries}>
        {children}
      </actual.MemoryRouter>
    ),
  };
});

const dispatchMock = vi.fn();

vi.mock('react-redux', async () => {
  const actual = await vi.importActual<typeof import('react-redux')>('react-redux');

  return {
    ...actual,
    useDispatch: () => dispatchMock,
    useSelector: vi.fn(() => undefined),
  };
});

vi.mock('../../store/user/action', () => ({
  fetchCheckAuth: vi.fn(() => ({ type: 'user/checkAuth' })),
}));

vi.mock('../private-route/private-route', () => ({
  default: ({ children }: { children: JSX.Element }) => (
    <div data-testid="private-route">{children}</div>
  ),
}));

vi.mock('../../page/main-page/main-page', () => ({
  default: () => <div>MainPage</div>,
}));

vi.mock('../../page/login-page/login-page', () => ({
  default: () => <div>LoginPage</div>,
}));

vi.mock('../../page/favorites-page/favorites-page', () => ({
  default: () => <div>FavoritesPage</div>,
}));

vi.mock('../../page/offer-page/offer-page', () => ({
  default: () => <div>OfferPage</div>,
}));

vi.mock('../../page/page-404/page-404', () => ({
  default: () => <div>Page404</div>,
}));

describe('Component: App', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    initialEntries = [AppRoute.Main];
  });

  it('dispatches fetchCheckAuth on mount', () => {
    render(<App />);

    expect(dispatchMock).toHaveBeenCalledTimes(1);
    expect(fetchCheckAuth).toHaveBeenCalled();
  });

  it('renders MainPage on "/" route', () => {
    initialEntries = [AppRoute.Main];

    render(<App />);

    expect(screen.getByText('MainPage')).toBeInTheDocument();
  });

  it('renders LoginPage on "/login" route', () => {
    initialEntries = [AppRoute.Login];

    render(<App />);

    expect(screen.getByText('LoginPage')).toBeInTheDocument();
  });

  it('renders FavoritesPage inside PrivateRoute on "/favorites"', () => {
    initialEntries = [AppRoute.Favorites];

    render(<App />);

    expect(screen.getByTestId('private-route')).toBeInTheDocument();
    expect(screen.getByText('FavoritesPage')).toBeInTheDocument();
  });

  it('renders OfferPage on "/offer/:id" route', () => {
    initialEntries = ['/offer/1'];

    render(<App />);

    expect(screen.getByText('OfferPage')).toBeInTheDocument();
  });

  it('renders Page404 on unknown route', () => {
    initialEntries = ['/unknown-route'];

    render(<App />);

    expect(screen.getByText('Page404')).toBeInTheDocument();
  });
});
