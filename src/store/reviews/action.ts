import { createAsyncThunk } from '@reduxjs/toolkit';
import { ReviewType } from '../../types/review';
import { AxiosInstance, AxiosError } from 'axios';
import { setServerError } from '../error/action';

export const fetchReviewsByOfferId = createAsyncThunk<
  ReviewType[],
  string,
  { extra: AxiosInstance }
>(
  'reviews/fetchReviewsByOfferId',
  async (offerId, { dispatch, extra: api }) => {
    try {
      const token = localStorage.getItem('six-cities-token');
      const headers: Record<string, string> = {};

      if (token) {
        headers['X-Token'] = token;
      }

      const { data } = await api.get<ReviewType[]>(
        `/comments/${offerId}`,
        { headers }
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
