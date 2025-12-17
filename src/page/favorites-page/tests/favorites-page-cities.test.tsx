import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';
import type { Mock } from 'vitest';
import { useDispatch } from 'react-redux';

import FavoritesPageCities from '../favorites-page-cities';
import { setCity } from '../../../store/offers/action';

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

const mockOffers = [
  { id: 'offer-1' },
  { id: 'offer-2' },
] as any[];

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
