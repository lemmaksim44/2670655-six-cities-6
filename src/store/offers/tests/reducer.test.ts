import { offersReducer } from '../reducer';
import { setCity, fetchOffers, fetchOfferById, fetchNearbyOffers, } from '../action';
import { City } from '../../../const';
import { OfferPreviewType } from '../../../types/offer-preview';
import { OfferType } from '../../../types/offer';
import { changeFavoriteStatus } from '../../favorite/action';
import { fetchLogout } from '../../user/action';

const mockOfferPreview: OfferPreviewType = {
  id: '1',
  isFavorite: true,
  city: { name: City.Paris },
} as OfferPreviewType;

const mockOffer: OfferType = {
  id: '1',
  isFavorite: true,
  city: { name: City.Paris },
} as OfferType;

describe('offersReducer', () => {
  it('should return initial state', () => {
    expect(offersReducer(undefined, { type: 'UNKNOWN' })).toEqual({
      city: City.Paris,
      offers: [],
      isOffersLoading: false,
      offer: null,
      isOfferLoading: false,
      offersNearby: [],
    });
  });

  it('should change city', () => {
    const state = offersReducer(undefined, setCity(City.Amsterdam));
    expect(state.city).toBe(City.Amsterdam);
  });

  it('should set isOffersLoading on fetchOffers.pending', () => {
    const state = offersReducer(
      undefined,
      fetchOffers.pending('', undefined)
    );

    expect(state.isOffersLoading).toBe(true);
  });

  it('should set offers on fetchOffers.fulfilled', () => {
    const state = offersReducer(
      undefined,
      fetchOffers.fulfilled([mockOfferPreview], '', undefined)
    );

    expect(state.offers).toEqual([mockOfferPreview]);
    expect(state.isOffersLoading).toBe(false);
  });

  it('should handle fetchOfferById lifecycle', () => {
    let state = offersReducer(
      undefined,
      fetchOfferById.pending('', '1')
    );

    expect(state.offer).toBeNull();
    expect(state.isOfferLoading).toBe(true);

    state = offersReducer(
      state,
      fetchOfferById.fulfilled(mockOffer, '', '1')
    );

    expect(state.offer).toEqual(mockOffer);
    expect(state.isOfferLoading).toBe(false);
  });

  it('should set nearby offers', () => {
    const state = offersReducer(
      undefined,
      fetchNearbyOffers.fulfilled([mockOfferPreview], '', '1')
    );

    expect(state.offersNearby).toEqual([mockOfferPreview]);
  });

  it('should update favorite status everywhere', () => {
    const initialState = {
      city: City.Paris,
      offers: [mockOfferPreview],
      isOffersLoading: false,
      offer: mockOffer,
      isOfferLoading: false,
      offersNearby: [mockOfferPreview],
    };

    const state = offersReducer(
      initialState,
      changeFavoriteStatus.fulfilled(
        { ...mockOfferPreview, isFavorite: false },
        '',
        { offerId: '1', status: 0 }
      )
    );

    expect(state.offers[0].isFavorite).toBe(false);
    expect(state.offer?.isFavorite).toBe(false);
    expect(state.offersNearby[0].isFavorite).toBe(false);
  });

  it('should reset favorites on logout', () => {
    const initialState = {
      city: City.Paris,
      offers: [mockOfferPreview],
      isOffersLoading: false,
      offer: mockOffer,
      isOfferLoading: false,
      offersNearby: [mockOfferPreview],
    };

    const state = offersReducer(
      initialState,
      fetchLogout.fulfilled(undefined, '', undefined)
    );

    expect(state.offers[0].isFavorite).toBe(false);
    expect(state.offer?.isFavorite).toBe(false);
    expect(state.offersNearby[0].isFavorite).toBe(false);
  });
});
