import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance, AxiosError } from 'axios';
import { City } from '../../const';
import { OfferType } from '../../types/offer';
import { OfferPreviewType } from '../../types/offer-preview';
import { setServerError } from '../error/action';

export const setCity = createAction<City>('city/setCity');

export const fetchOffers = createAsyncThunk<OfferPreviewType[], undefined, { extra: AxiosInstance }>(
  'offers/fetchOffers',
  async (_arg, { dispatch, extra: api }) => {
    try {
      const token = localStorage.getItem('six-cities-token');
      const headers: Record<string, string> = {};
      if (token) {
        headers['X-Token'] = token;
      }

      const { data } = await api.get<OfferPreviewType[]>('/offers', { headers });
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

export const fetchOfferById = createAsyncThunk<OfferType | null, string, { extra: AxiosInstance }>(
  'offer/fetchOfferById',
  async (offerId, { dispatch, extra: api }) => {
    try {
      const token = localStorage.getItem('six-cities-token');
      const headers: Record<string, string> = {};
      if (token) {
        headers['X-Token'] = token;
      }

      const { data } = await api.get<OfferType>(`/offers/${offerId}`, { headers });
      dispatch(setServerError(null));
      return data;
    } catch (err) {
      const error = err as AxiosError;

      if (!error.response) {
        dispatch(setServerError('Сервер недоступен'));
      } else if (error.response.status === 404) {
        return null;
      }

      return null;
    }
  }
);

export const fetchNearbyOffers = createAsyncThunk<OfferType[], string, { extra: AxiosInstance }>(
  'offer/fetchNearbyOffers',
  async (offerId, { dispatch, extra: api }) => {
    try {
      const token = localStorage.getItem('six-cities-token');
      const headers: Record<string, string> = {};

      if (token) {
        headers['X-Token'] = token;
      }

      const { data } = await api.get<OfferType[]>(`/offers/${offerId}/nearby`, {
        headers,
      });

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
