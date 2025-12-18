import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import FavoritesPageList from '../favorites-page-list';
import { OfferPreviewType } from '../../../types/offer-preview';

vi.mock('../favorites-page-cities', () => ({
  default: ({ city }: { city: string }) => (
    <li data-testid="favorites-city">{city}</li>
  ),
}));

describe('FavoritesPageList', () => {
  const mockOffers: Record<string, OfferPreviewType[]> = {
    Paris: [{} as OfferPreviewType, {} as OfferPreviewType],
    Cologne: [{} as OfferPreviewType],
  };

  it('renders favorites page with title', () => {
    render(<FavoritesPageList offers={mockOffers} />);
    expect(screen.getByText('Saved listing')).toBeInTheDocument();
  });

  it('renders list of favorite cities', () => {
    render(<FavoritesPageList offers={mockOffers} />);
    const cities = screen.getAllByTestId('favorites-city');
    expect(cities).toHaveLength(2);
    expect(screen.getByText('Paris')).toBeInTheDocument();
    expect(screen.getByText('Cologne')).toBeInTheDocument();
  });

  it('renders correctly with empty offers', () => {
    render(<FavoritesPageList offers={{}} />);
    expect(screen.getByText('Saved listing')).toBeInTheDocument();
    expect(screen.queryByTestId('favorites-city')).toBeNull();
  });
});
