import { createAction } from '@reduxjs/toolkit';
import { OfferPreviewType } from '../types/offer-preview';
import { City } from '../const';

export const fetchOffers = createAction<OfferPreviewType[]>('offers/fetchOffers');

export const setCity = createAction<City>('city/setCity');
