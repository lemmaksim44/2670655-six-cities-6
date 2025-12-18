import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import * as reactRedux from 'react-redux';
import FavoritesPage from '../favorites-page';

vi.mock('react-redux', async () => {
  const actual = await vi.importActual<typeof reactRedux>('react-redux');

  return {
    ...actual,
    useSelector: vi.fn(),
    useDispatch: () => vi.fn(),
  };
});

vi.mock('../../../components/header/header', () => ({
  default: () => <div data-testid="header" />,
}));

vi.mock('../../../components/footer/footer', () => ({
  default: () => <div data-testid="footer" />,
}));

vi.mock('../../../components/spinner/spinner', () => ({
  default: () => <div data-testid="spinner" />,
}));

vi.mock('../favorites-page-empty', () => ({
  default: () => <div data-testid="favorites-empty" />,
}));

vi.mock('../favorites-page-list', () => ({
  default: ({ offers }: { offers: unknown }) => (
    <div data-testid="favorites-list">{JSON.stringify(offers)}</div>
  ),
}));

const mockUseSelector = vi.mocked(reactRedux.useSelector);

describe('FavoritesPage', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  test('renders spinner while favorites are loading', () => {
    mockUseSelector
      .mockReturnValueOnce(false)
      .mockReturnValueOnce({})
      .mockReturnValueOnce(true);

    render(<FavoritesPage />);

    expect(screen.getByTestId('spinner')).toBeInTheDocument();
    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });

  test('renders empty favorites page when there are no offers', () => {
    mockUseSelector
      .mockReturnValueOnce(false)
      .mockReturnValueOnce({})
      .mockReturnValueOnce(false);

    render(<FavoritesPage />);

    expect(screen.getByTestId('favorites-empty')).toBeInTheDocument();
    expect(screen.queryByTestId('favorites-list')).not.toBeInTheDocument();
  });

  test('renders favorites list when offers exist', () => {
    const groupedFavoritesMock = {
      Paris: [{ id: 1 }],
    };

    mockUseSelector
      .mockReturnValueOnce(true)
      .mockReturnValueOnce(groupedFavoritesMock)
      .mockReturnValueOnce(false);

    render(<FavoritesPage />);

    expect(screen.getByTestId('favorites-list')).toBeInTheDocument();
    expect(screen.queryByTestId('favorites-empty')).not.toBeInTheDocument();
  });
});
