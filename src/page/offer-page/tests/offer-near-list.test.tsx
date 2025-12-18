import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import OfferNearList from '../offer-near-list';
import { OfferPreviewType } from '../../../types/offer-preview';

const mockOffers: OfferPreviewType[] = [
  {
    id: 'offer-1',
    title: 'Test offer 1',
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
    title: 'Test offer 2',
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

vi.mock('../../../components/card/card', () => ({
  default: ({ offer }: { offer: OfferPreviewType }) => (
    <div data-testid="mock-card">{offer.title}</div>
  ),
}));

describe('OfferNearList', () => {
  it('renders title correctly', () => {
    render(<OfferNearList offerNearby={mockOffers} />);
    expect(screen.getByText('Other places in the neighbourhood')).toBeInTheDocument();
  });

  it('renders correct number of cards', () => {
    render(<OfferNearList offerNearby={mockOffers} />);
    const cards = screen.getAllByTestId('mock-card');
    expect(cards).toHaveLength(mockOffers.length);
  });

  it('renders offer titles correctly', () => {
    render(<OfferNearList offerNearby={mockOffers} />);
    mockOffers.forEach((offer) => {
      expect(screen.getByText(offer.title)).toBeInTheDocument();
    });
  });

  it('renders empty list without errors', () => {
    render(<OfferNearList offerNearby={[]} />);
    const cards = screen.queryAllByTestId('mock-card');
    expect(cards).toHaveLength(0);
  });

});
