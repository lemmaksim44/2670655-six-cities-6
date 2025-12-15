vi.mock('../../../utils/sorts', () => ({
  sortOffers: vi.fn((offers: OfferPreviewType[]): OfferPreviewType[] => offers),
}));

vi.mock('../../../utils/scripts', () => ({
  sortByNearestOffers: vi.fn((offers: OfferPreviewType[]): OfferPreviewType[] => offers),
}));

import { selectCity, selectOffers, selectIsOffersLoading, selectOffer, selectIsOfferLoading, selectOffersNearby, selectOffersByCity, selectSortedOffers, selectOffersNearbyByOffer, } from '../selectors';
import { City, SortingOptions } from '../../../const';
import { RootState } from '../..';
import { OfferPreviewType } from '../../../types/offer-preview';
import { OfferType } from '../../../types/offer';

const mockOfferPreview: OfferPreviewType = {
  id: '1',
  city: { name: City.Paris },
} as OfferPreviewType;

const mockOffer: OfferType = {
  id: '1',
  city: { name: City.Paris },
} as OfferType;

const offersNearby: OfferPreviewType[] = [
  { id: '1', city: { name: City.Paris } } as OfferPreviewType,
  { id: '2', city: { name: City.Paris } } as OfferPreviewType,
  { id: '3', city: { name: City.Paris } } as OfferPreviewType,
  { id: '4', city: { name: City.Paris } } as OfferPreviewType,
];

describe('offer selectors', () => {
  const state = {
    offers: {
      city: City.Paris,
      offers: [mockOfferPreview],
      isOffersLoading: false,
      offer: mockOffer,
      isOfferLoading: false,
      offersNearby: offersNearby,
    },
  } as RootState;

  it('basic selectors should work', () => {
    expect(selectCity(state)).toBe(City.Paris);
    expect(selectOffers(state)).toEqual([mockOfferPreview]);
    expect(selectIsOffersLoading(state)).toBe(false);
    expect(selectOffer(state)).toEqual(mockOffer);
    expect(selectIsOfferLoading(state)).toBe(false);
    expect(selectOffersNearby(state)).toEqual(offersNearby);
  });

  it('should select offers by city', () => {
    expect(selectOffersByCity(state)).toEqual([mockOfferPreview]);
  });

  it('should return sorted offers', () => {
    const selector = selectSortedOffers(SortingOptions.Popular);
    expect(selector(state)).toEqual([mockOfferPreview]);
  });

  it('should return nearby offers by offer', () => {
    const selector = selectOffersNearbyByOffer(mockOffer, 1);
    expect(selector(state)).toEqual([mockOfferPreview]);
  });

  it('should return empty array if offer is null', () => {
    const selector = selectOffersNearbyByOffer(null);
    expect(selector(state)).toEqual([]);
  });

  it('should return only 3 nearby offers by default', () => {
    const selector = selectOffersNearbyByOffer(mockOffer);
    const result = selector(state);
    expect(result).toHaveLength(3);
    expect(result).toEqual(offersNearby.slice(0, 3));
  });
});
