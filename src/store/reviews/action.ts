import { createAsyncThunk } from '@reduxjs/toolkit';
import { ReviewType } from '../../types/review';
import { AxiosInstance, AxiosError } from 'axios';
import { setServerError } from '../error/action';
import { SendReviewType } from '../../types/send-review';
import { tokenService } from '../../services/token';

export const fetchReviewsByOfferId = createAsyncThunk<
  ReviewType[],
  string,
  { extra: AxiosInstance }
>(
  'reviews/fetchReviewsByOfferId',
  async (offerId, { dispatch, extra: api }) => {
    try {
      const { data } = await api.get(`/comments/${offerId}`, {
        headers: tokenService.getAuthHeaders(),
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

export const sendReview = createAsyncThunk<
  ReviewType[],
  SendReviewType,
  { extra: AxiosInstance }
>(
  'reviews/sendReview',
  async ({ offerId, rating, comment }, { dispatch, extra: api }) => {
    try {
      const { data } = await api.post<ReviewType[]>(
        `/comments/${offerId}`,
        { comment, rating },
        { headers: tokenService.getAuthHeaders() }
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
