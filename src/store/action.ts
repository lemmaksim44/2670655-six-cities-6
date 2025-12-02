import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { OfferPreviewType } from '../types/offer-preview';
import { City } from '../const';

export const fetchOffers = createAsyncThunk<OfferPreviewType[], undefined, { extra: AxiosInstance }>(
  'offers/fetchOffers',
  async (_arg, { extra: api }) => {
    const { data } = await api.get<OfferPreviewType[]>('/offers');
    return data;
  }
);

export const setCity = createAction<City>('city/setCity');
