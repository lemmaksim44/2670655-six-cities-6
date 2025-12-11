import { createSelector } from 'reselect';

import { RootState } from '..';
import { SortingOptions } from '../../const';
import { OfferType } from '../../types/offer';
import { sortOffers } from '../../utils/sorts';
import { sortByNearestOffers } from '../../utils/scripts';

export const selectCity = (state: RootState) => state.offers.city;
export const selectOffers = (state: RootState) => state.offers.offers;
export const selectIsOffersLoading = (state: RootState) => state.offers.isOffersLoading;
export const selectOffer = (state: RootState) => state.offers.offer;
export const selectIsOfferLoading = (state: RootState) => state.offers.isOfferLoading;
export const selectOffersNearby = (state: RootState) => state.offers.offersNearby;

export const selectOffersByCity = createSelector(
  selectOffers,
  selectCity,
  (offers, city) => offers.filter((offer) => offer.city.name === city.toString())
);

export const selectSortedOffers = (sortOption: SortingOptions) =>
  createSelector(
    selectOffersByCity,
    (offers) => sortOffers(offers, sortOption)
  );

export const selectOffersNearbyByOffer = (offer: OfferType | null, limit: number = 3) =>
  createSelector(selectOffersNearby, (offers) => {
    if (!offer) {
      return [];
    }
    return sortByNearestOffers(offers, offer).slice(0, limit);
  });
