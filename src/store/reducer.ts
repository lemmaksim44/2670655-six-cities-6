import { OfferPreviewType } from '../types/offer-preview';
import { createReducer } from '@reduxjs/toolkit';
import { City, AuthorizationStatus } from '../const';
import { fetchOffers, setCity, setAuthorizationStatus } from './action';

const initialState: {
  offers: OfferPreviewType[];
  city: City;
  isOffersLoading: boolean;
  authorizationStatus: AuthorizationStatus;
} = {
  offers: [],
  city: City.Paris,
  isOffersLoading: false,
  authorizationStatus: AuthorizationStatus.Unknown,
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(fetchOffers.pending, (state) => {
      state.isOffersLoading = true;
    })
    .addCase(fetchOffers.fulfilled, (state, action) => {
      const newOffers = action.payload;
      if (JSON.stringify(state.offers) !== JSON.stringify(newOffers)) {
        state.offers = newOffers;
      }
      state.isOffersLoading = false;
    })
    .addCase(fetchOffers.rejected, (state) => {
      state.isOffersLoading = false;
    })
    .addCase(setCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(setAuthorizationStatus, (state, action) => {
      state.authorizationStatus = action.payload;
    });
});
