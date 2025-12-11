import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '..';
import { OfferPreviewType } from '../../types/offer-preview';
import { City } from '../../const';

export const selectFavorites = (state: RootState) => state.favorites.favorites;
export const selectFavoritesLoadingStatus = (state: RootState) => state.favorites.isFavoritesLoading;
export const selectFavoritesCount = (state: RootState) => state.favorites.favorites.length;

export const selectIsFavorites = createSelector(
  [selectFavoritesCount],
  (count) => count > 0
);

export const selectGroupedFavorites = createSelector(
  [selectFavorites],
  (favorites): Record<string, OfferPreviewType[]> => {
    const groupCityOffers: Record<string, OfferPreviewType[]> = {};

    for (const offer of favorites) {
      const city = offer.city.name;
      if (!groupCityOffers[city]) {
        groupCityOffers[city] = [];
      }
      groupCityOffers[city].push(offer);
    }

    const sortedGroup: Record<string, OfferPreviewType[]> = {};
    Object.values(City).forEach((cityName) => {
      if (groupCityOffers[cityName]) {
        sortedGroup[cityName] = groupCityOffers[cityName];
      }
    });

    return sortedGroup;
  }
);
