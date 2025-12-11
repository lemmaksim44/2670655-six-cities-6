import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance, AxiosError } from 'axios';

import { OfferPreviewType } from '../../types/offer-preview';
import { setServerError } from '../error/action';
import { tokenService } from '../../services/token';

export const fetchFavorites = createAsyncThunk<
  OfferPreviewType[],
  undefined,
  { extra: AxiosInstance }
>(
  'favorite/fetchFavorites',
  async (_arg, { dispatch, extra: api }) => {
    try {
      const { data } = await api.get<OfferPreviewType[]>(
        '/favorite',
        { headers: tokenService.getAuthHeaders() }
      );

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

export const changeFavoriteStatus = createAsyncThunk<
  OfferPreviewType | null,
  { offerId: string; status: 0 | 1 },
  { extra: AxiosInstance }
>(
  'favorite/changeStatus',
  async ({ offerId, status }, { dispatch, extra: api }) => {
    try {
      const { data } = await api.post<OfferPreviewType>(
        `/favorite/${offerId}/${status}`,
        {},
        { headers: tokenService.getAuthHeaders() }
      );

      dispatch(setServerError(null));
      return data;

    } catch (err) {
      const error = err as AxiosError;

      if (!error.response) {
        dispatch(setServerError('Сервер недоступен'));
      }

      return null;
    }
  }
);
