import { createReducer, PayloadAction } from '@reduxjs/toolkit';
import { OfferPreviewType } from '../../types/offer-preview';
import { OfferType } from '../../types/offer';
import { City } from '../../const';
import { setCity, fetchOffers, fetchOfferById, fetchNearbyOffers } from './action';
import { changeFavoriteStatus } from '../favorite/action';
import { fetchLogout } from '../user/action';

const initialState: {
  city: City;
  offers: OfferPreviewType[];
  isOffersLoading: boolean;
  offer: OfferType | null;
  isOfferLoading: boolean;
  offersNearby: OfferPreviewType[];
} = {
  city: City.Paris,
  offers: [],
  isOffersLoading: false,
  offer: null,
  isOfferLoading: false,
  offersNearby: [],
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
      state.offers = action.payload;
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
    })
    .addCase(fetchNearbyOffers.pending, (state) => {
      state.offersNearby = [];
    })
    .addCase(fetchNearbyOffers.fulfilled, (state, action: PayloadAction<OfferPreviewType[]>) => {
      state.offersNearby = action.payload;
    })
    .addCase(fetchNearbyOffers.rejected, (state) => {
      state.offersNearby = [];
    })
    .addCase(changeFavoriteStatus.fulfilled, (state, action: PayloadAction<OfferPreviewType | null>) => {
      if (!action.payload) return;

      const updatedOffer = action.payload;

      state.offers = state.offers.map((offer) =>
        offer.id === updatedOffer.id ? { ...offer, isFavorite: updatedOffer.isFavorite } : offer
      );

      if (state.offer?.id === updatedOffer.id) {
        state.offer = { ...state.offer, isFavorite: updatedOffer.isFavorite };
      }

      state.offersNearby = state.offersNearby.map((offer) =>
        offer.id === updatedOffer.id ? { ...offer, isFavorite: updatedOffer.isFavorite } : offer
      );
    })
    .addCase(fetchLogout.fulfilled, (state) => {
      state.offers = state.offers.map((offer) => ({ ...offer, isFavorite: false }));
      if (state.offer) {
        state.offer = { ...state.offer, isFavorite: false };
      }
      state.offersNearby = state.offersNearby.map((offer) => ({ ...offer, isFavorite: false }));
    });
});
