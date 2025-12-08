import { createAsyncThunk } from '@reduxjs/toolkit';
import { ReviewType } from '../../types/review';
import { AxiosInstance, AxiosError } from 'axios';
import { setServerError } from '../error/action';
import { SendReviewType } from '../../types/send-review';

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

export const sendReview = createAsyncThunk<
  ReviewType[],
  SendReviewType,
  { extra: AxiosInstance }
>(
  'reviews/sendReview',
  async ({ offerId, rating, comment }, { dispatch, extra: api }) => {
    try {
      const token = localStorage.getItem('six-cities-token');
      const headers: Record<string, string> = {};

      if (token) {
        headers['X-Token'] = token;
      }

      const { data } = await api.post<ReviewType[]>(
        `/comments/${offerId}`,
        { comment, rating },
        { headers }
      );

      dispatch(setServerError(null));
      return data;
    } catch (err) {
      const error = err as AxiosError;

      if (!error.response) {
        dispatch(setServerError('Сервер недоступен'));
      } else {
        dispatch(setServerError('Не удалось отправить отзыв'));
      }

      return [];
    }
  }
);
