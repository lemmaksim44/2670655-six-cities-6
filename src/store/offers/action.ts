import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { City } from '../../const';
import { OfferPreviewType } from '../../types/offer-preview';

export const setCity = createAction<City>('city/setCity');

export const fetchOffers = createAsyncThunk<OfferPreviewType[], undefined, { extra: AxiosInstance }>(
  'offers/fetchOffers',
  async (_arg, { extra: api }) => {
    const { data } = await api.get<OfferPreviewType[]>('/offers');
    return data;
  }
);
