import { render } from '@testing-library/react';
import Map from './map';
import { vi } from 'vitest';
import * as useMapHook from '../../hooks/useMap';
import leaflet from 'leaflet';
import { OfferPreviewType } from '../../types/offer-preview';

const mockOffers: OfferPreviewType[] = [
  {
    id: '1',
    title: 'Offer 1',
    type: 'apartment',
    price: 100,
    isFavorite: false,
    isPremium: false,
    rating: 4.5,
    city: {
      location: {
        latitude: 10,
        longitude: 20,
        zoom: 12.
      },
      name: 'Paris' },
    location: {
      latitude: 11,
      longitude: 21,
      zoom: 16,
    },
    previewImage: 'image.jpg',
  },
  {
    id: '2',
    title: 'Offer 2',
    type: 'room',
    price: 80,
    isFavorite: true,
    isPremium: true,
    rating: 4.0,
    city: {
      location: {
        latitude: 10,
        longitude: 20,
        zoom: 12.
      },
      name: 'Paris' },
    location: {
      latitude: 11,
      longitude: 21,
      zoom: 16,
    },
    previewImage: 'image.jpg',
  },
];

const mockCurrentOffer: OfferPreviewType = {
  id: '3',
  title: 'Current Offer',
  type: 'house',
  price: 200,
  isFavorite: false,
  isPremium: true,
  rating: 5.0,
  city: {
    location: {
      latitude: 10,
      longitude: 20,
      zoom: 12.
    },
    name: 'Paris' },
  location: {
    latitude: 11,
    longitude: 21,
    zoom: 16,
  },
  previewImage: 'image.jpg',
};

vi.spyOn(useMapHook, 'default').mockImplementation(() => ({
  setView: vi.fn(),
  removeLayer: vi.fn(),
} as unknown as ReturnType<typeof useMapHook.default>));

const markerMock = vi.fn(() => ({
  addTo: vi.fn(() => ({})),
}));
vi.spyOn(leaflet, 'marker').mockImplementation(markerMock as unknown as typeof leaflet.marker);

const layerGroupMock = vi.fn(() => ({
  addTo: vi.fn(() => ({})),
  clearLayers: vi.fn(),
}));
vi.spyOn(leaflet, 'layerGroup').mockImplementation(layerGroupMock as unknown as typeof leaflet.layerGroup);

describe('Map component', () => {
  it('renders without crashing', () => {
    const { container } = render(<Map offers={mockOffers} block="main__map" />);
    expect(container.querySelector('section.map')).toBeInTheDocument();
  });

  it('applies correct class for offer map', () => {
    const { container } = render(<Map offers={mockOffers} block="offer__map" currentOffer={mockCurrentOffer} />);
    const mapElement = container.querySelector('section.map');
    expect(mapElement).toHaveClass('offer__map map map--offer');
  });

  it('renders markers for all offers and current offer', () => {
    markerMock.mockClear();
    render(<Map offers={mockOffers} block="offer__map" currentOffer={mockCurrentOffer} selectedOfferId={'2'} />);
    expect(markerMock).toHaveBeenCalledTimes(mockOffers.length + 1);
  });
});
