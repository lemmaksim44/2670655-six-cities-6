import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import OfferPageDetails from '../offer-page-details';
import { AppRoute } from '../../../const';
import { OfferType } from '../../../types/offer';
import { OfferPreviewType } from '../../../types/offer-preview';
import { getRating } from '../../../utils/scripts';

vi.mock('../offer-page-reviews-list', () => ({
  default: () => <div data-testid="mock-reviews-list">Reviews List</div>,
}));
vi.mock('../../map/map', () => ({
  default: () => <div data-testid="mock-map">Map</div>,
}));

type DispatchMock = ReturnType<typeof vi.fn>;
type SelectorMock = ReturnType<typeof vi.fn>;
type NavigateMock = ReturnType<typeof vi.fn>;

vi.mock('react-redux', async () => {
  const actual = await vi.importActual<typeof import('react-redux')>('react-redux');
  return {
    ...actual,
    useSelector: vi.fn() as unknown as SelectorMock,
    useDispatch: vi.fn() as unknown as DispatchMock,
  };
});

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<typeof import('react-router-dom')>('react-router-dom');
  return {
    ...actual,
    useNavigate: vi.fn() as unknown as NavigateMock,
  };
});

vi.mock('../../../store/favorite/action', () => ({
  changeFavoriteStatus: vi.fn((payload: { offerId: string; status: number }) => ({ type: 'mock/changeFavoriteStatus', payload })),
}));

const mockOffer: OfferType = {
  id: '1',
  title: 'Test Offer',
  previewImage: 'img.jpg',
  images: ['img1.jpg','img2.jpg','img3.jpg','img4.jpg','img5.jpg','img6.jpg','img7.jpg'],
  isPremium: true,
  isFavorite: false,
  rating: 4.5,
  type: 'apartment',
  bedrooms: 2,
  maxAdults: 4,
  price: 120,
  goods: ['Wi-Fi', 'Kitchen', 'Washing machine'],
  host: { name: 'John Doe', avatarUrl: 'avatar.jpg', isPro: true },
  description: 'Nice place to stay',
  city: { name: 'Paris', location: { latitude: 10, longitude: 10, zoom: 10 } },
  location: { latitude: 10, longitude: 10, zoom: 10 },
};

const mockOffersNearby: OfferPreviewType[] = [
  { id: '2', title: 'Nearby 1', type: 'room', price: 80, rating: 3, isFavorite: false, isPremium: true, previewImage: '', city: mockOffer.city, location: mockOffer.location },
];

describe('OfferPageDetails', () => {
  let mockDispatch: DispatchMock;
  let mockNavigate: NavigateMock;

  beforeEach(() => {
    mockDispatch = vi.fn();
    mockNavigate = vi.fn();

    (useDispatch as DispatchMock).mockReturnValue(mockDispatch);
    (useSelector as SelectorMock).mockReturnValue(true);
    (useNavigate as NavigateMock).mockReturnValue(mockNavigate);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders offer details correctly', () => {
    render(<OfferPageDetails offer={mockOffer} offersNearby={mockOffersNearby} />);
    expect(screen.getByText('Test Offer')).toBeInTheDocument();
    expect(screen.getByText('Premium')).toBeInTheDocument();
    expect(screen.getByText('2 Bedrooms')).toBeInTheDocument();
    expect(screen.getByText('Max 4 adults')).toBeInTheDocument();
    expect(screen.getByText('€120')).toBeInTheDocument();
    expect(screen.getByText('Wi-Fi')).toBeInTheDocument();
    expect(screen.getByText('Kitchen')).toBeInTheDocument();
    expect(screen.getByText('Washing machine')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Pro')).toBeInTheDocument();
    expect(screen.getByText('Nice place to stay')).toBeInTheDocument();
    expect(screen.getByTestId('mock-reviews-list')).toBeInTheDocument();
  });

  it('renders all images (max 6)', () => {
    render(<OfferPageDetails offer={mockOffer} offersNearby={mockOffersNearby} />);
    const images = screen.getAllByAltText('Photo studio');
    expect(images).toHaveLength(6);
    mockOffer.images.slice(0, 6).forEach((img, idx) => {
      expect(images[idx]).toHaveAttribute('src', img);
    });
  });

  it('renders correct rating width', () => {
    render(<OfferPageDetails offer={mockOffer} offersNearby={mockOffersNearby} />);
    const stars = document.querySelector('.offer__stars > span') as HTMLElement;
    expect(stars.style.width).toBe(getRating(mockOffer.rating));
  });

  it('dispatches changeFavoriteStatus when bookmark clicked for auth user', () => {
    render(<OfferPageDetails offer={mockOffer} offersNearby={mockOffersNearby} />);
    const bookmarkButton = screen.getByRole('button', { name: /to bookmarks/i });
    fireEvent.click(bookmarkButton);
    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'mock/changeFavoriteStatus',
      payload: { offerId: '1', status: 1 },
    });
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it('redirects to login for unauth user when bookmark clicked', () => {
    (useSelector as SelectorMock).mockReturnValue(false);
    render(<OfferPageDetails offer={mockOffer} offersNearby={mockOffersNearby} />);
    const bookmarkButton = screen.getByRole('button', { name: /to bookmarks/i });
    fireEvent.click(bookmarkButton);
    expect(mockNavigate).toHaveBeenCalledWith(AppRoute.Login);
    expect(mockDispatch).not.toHaveBeenCalled();
  });

  it('renders host as non-pro correctly', () => {
    const nonProOffer = { ...mockOffer, host: { ...mockOffer.host, isPro: false } };
    render(<OfferPageDetails offer={nonProOffer} offersNearby={mockOffersNearby} />);
    expect(screen.queryByText('Pro')).not.toBeInTheDocument();
  });
});
