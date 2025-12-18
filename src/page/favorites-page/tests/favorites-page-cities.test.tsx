import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';
import type { Mock } from 'vitest';
import { useDispatch } from 'react-redux';

import FavoritesPageCities from '../favorites-page-cities';
import { setCity } from '../../../store/offers/action';
import { OfferPreviewType } from '../../../types/offer-preview';

vi.mock('react-redux', async () => {
  const actual = await vi.importActual<typeof import('react-redux')>('react-redux');
  return {
    ...actual,
    useDispatch: vi.fn(),
  };
});

vi.mock('../favorites-page-card', () => ({
  default: ({ offer }: { offer: { id: string } }) => (
    <div data-testid="favorites-card">{offer.id}</div>
  ),
}));

vi.mock('../../../store/offers/action', () => ({
  setCity: vi.fn((city: string) => ({
    type: 'SET_CITY',
    payload: city,
  })),
}));

const mockDispatch = vi.fn();

const mockOffers: OfferPreviewType[] = [
  {
    id: 'offer-1',
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
  },
  {
    id: 'offer-2',
    title: 'Test offer',
    type: 'apartment',
    price: 200,
    rating: 3,
    isFavorite: false,
    isPremium: true,
    previewImage: 'img.jpg',
    city: {
      name: 'Paris',
      location: { latitude: 10, longitude: 10, zoom: 10 },
    },
    location: { latitude: 10, longitude: 10, zoom: 10 },
  }
];


const mockCity = 'Paris';

describe('FavoritesPageCities', () => {
  beforeEach(() => {
    (useDispatch as unknown as Mock).mockReturnValue(mockDispatch);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders city name', () => {
    render(
      <MemoryRouter>
        <FavoritesPageCities city={mockCity} offers={mockOffers} />
      </MemoryRouter>
    );

    expect(screen.getByText(mockCity)).toBeInTheDocument();
  });

  it('renders favorites cards for each offer', () => {
    render(
      <MemoryRouter>
        <FavoritesPageCities city={mockCity} offers={mockOffers} />
      </MemoryRouter>
    );

    expect(screen.getAllByTestId('favorites-card')).toHaveLength(mockOffers.length);
  });

  it('dispatches setCity action when city link is clicked', () => {
    render(
      <MemoryRouter>
        <FavoritesPageCities city={mockCity} offers={mockOffers} />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText(mockCity));

    expect(setCity).toHaveBeenCalledWith(mockCity);
    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'SET_CITY',
      payload: mockCity,
    });
  });
});
