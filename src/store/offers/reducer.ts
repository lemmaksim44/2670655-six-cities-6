import { createReducer, PayloadAction } from '@reduxjs/toolkit';
import { OfferPreviewType } from '../../types/offer-preview';
import { OfferType } from '../../types/offer';
import { City } from '../../const';
import { setCity, fetchOffers, fetchOfferById } from './action';

const initialState: {
  city: City;
  offers: OfferPreviewType[];
  isOffersLoading: boolean;
  offer: OfferType | null;
  isOfferLoading: boolean;
} = {
  city: City.Paris,
  offers: [],
  isOffersLoading: false,
  offer: null,
  isOfferLoading: false,
};

export const offersReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setCity, (state, action) => {
      state.city = action.payload;
    })
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
    .addCase(fetchOfferById.pending, (state) => {
      state.offer = null;
      state.isOfferLoading = true;
    })
    .addCase(fetchOfferById.fulfilled, (state, action: PayloadAction<OfferType | null>) => {
      state.offer = action.payload;
      state.isOfferLoading = false;
    })
    .addCase(fetchOfferById.rejected, (state) => {
      state.offer = null;
      state.isOfferLoading = false;
    });
});
