import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance, AxiosError } from 'axios';
import { City } from '../../const';
import { OfferPreviewType } from '../../types/offer-preview';
import { setServerError } from '../error/action';

export const setCity = createAction<City>('city/setCity');

export const fetchOffers = createAsyncThunk<OfferPreviewType[], undefined, { extra: AxiosInstance }>(
  'offers/fetchOffers',
  async (_arg, { dispatch, extra: api }) => {
    try {
      const { data } = await api.get<OfferPreviewType[]>('/offers');
      dispatch(setServerError(null));
      return data;
    } catch (err) {
      const error = err as AxiosError;

      if (!error.response) {
        dispatch(setServerError('Сервер недоступен'));
      }

      return [];
    }
  }
);
