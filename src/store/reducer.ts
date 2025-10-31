import { OfferPreviewType } from "../types/offer-preview";
import { createReducer } from "@reduxjs/toolkit";
import { offers } from "../mocks/offers";
import { City } from "../const";
import { fetchOffers, setCity } from "./action";

const initialState: {
  offers: OfferPreviewType[];
  city: string;
} = {
  offers: [],
  city: City.Paris,
}

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(fetchOffers, (state) => {
      state.offers = offers;
    })
    .addCase(setCity, (state, action) => {
      state.city = action.payload;
    })
});
