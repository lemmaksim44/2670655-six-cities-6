import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import FavoritesPageCard from '../favorites-page-card';
import { AppRoute } from '../../../const';
import { OfferPreviewType } from '../../../types/offer-preview';
import { useSelector } from 'react-redux';
import { changeFavoriteStatus } from '../../../store/favorite/action';

const mockDispatch = vi.fn();
const mockNavigate = vi.fn();

vi.mock('react-redux', async () => {
  const actual = await vi.importActual<typeof import('react-redux')>(
    'react-redux'
  );

  return {
    ...actual,
    useDispatch: () => mockDispatch,
    useSelector: vi.fn(),
  };
});

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<typeof import('react-router-dom')>(
    'react-router-dom'
  );

  return {
    ...actual,
    Link: ({ children }: { children: React.ReactNode }) => children,
    useNavigate: () => mockNavigate,
  };
});

vi.mock('../../../store/favorite/action', () => ({
  changeFavoriteStatus: vi.fn((payload: { offerId: string; status: number }) => ({
    type: 'favorite/changeStatus',
    payload,
  })),
}));

vi.mock('../../../store/user/selectors', () => ({
  selectIsAuth: vi.fn(),
}));

const mockOffer: OfferPreviewType = {
  id: '1',
  title: 'Test offer',
  type: 'apartment',
  price: 100,
  rating: 4,
  isFavorite: false,
  isPremium: true,
  previewImage: 'img.jpg',
  city: {
    name: 'Paris',
    location: { latitude: 10, longitude: 10, zoom: 10 },
  },
  location: { latitude: 10, longitude: 10, zoom: 10 },
};

describe('FavoritesPageCard', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders offer information', () => {
    vi.mocked(useSelector).mockReturnValue(true);

    render(<FavoritesPageCard offer={mockOffer} />);

    expect(screen.getByText('Premium')).toBeInTheDocument();
    expect(screen.getByText('Test offer')).toBeInTheDocument();
    expect(screen.getByText('€100')).toBeInTheDocument();
    expect(screen.getByText('Apartment')).toBeInTheDocument();
    expect(screen.getByText('To bookmarks')).toBeInTheDocument();
  });

  it('redirects to login page when user is not authorized', () => {
    vi.mocked(useSelector).mockReturnValue(false);

    render(<FavoritesPageCard offer={mockOffer} />);

    fireEvent.click(screen.getByRole('button'));

    expect(mockNavigate).toHaveBeenCalledWith(AppRoute.Login);
    expect(mockDispatch).not.toHaveBeenCalled();
  });

  it('dispatches changeFavoriteStatus with status=1 when adding to favorites', () => {
    vi.mocked(useSelector).mockReturnValue(true);

    render(<FavoritesPageCard offer={mockOffer} />);

    fireEvent.click(screen.getByRole('button'));

    expect(changeFavoriteStatus).toHaveBeenCalledWith({
      offerId: '1',
      status: 1,
    });

    expect(mockDispatch).toHaveBeenCalled();
  });

  it('dispatches changeFavoriteStatus with status=0 when removing from favorites', () => {
    vi.mocked(useSelector).mockReturnValue(true);

    render(
      <FavoritesPageCard
        offer={{ ...mockOffer, isFavorite: true }}
      />
    );

    fireEvent.click(screen.getByRole('button'));

    expect(changeFavoriteStatus).toHaveBeenCalledWith({
      offerId: '1',
      status: 0,
    });
  });
});
