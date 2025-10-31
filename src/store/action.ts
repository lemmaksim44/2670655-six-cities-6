import { createAction } from "@reduxjs/toolkit";
import { OfferPreviewType } from "../types/offer-preview";

export const fetchOffers = createAction<OfferPreviewType>('offers/fetchOffers');

export const setCity = createAction<string>('city/setCity');
