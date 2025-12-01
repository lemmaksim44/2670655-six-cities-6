import { OfferPreviewType } from '../types/offer-preview';
import { createReducer } from '@reduxjs/toolkit';
import { City } from '../const';
import { fetchOffers, setCity } from './action';

const initialState: {
  offers: OfferPreviewType[];
  city: City;
  isOffersLoading: boolean;
} = {
  offers: [],
  city: City.Paris,
  isOffersLoading: false,
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
    });
});
