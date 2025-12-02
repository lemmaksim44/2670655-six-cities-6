import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance, AxiosError } from 'axios';
import { OfferPreviewType } from '../types/offer-preview';
import { City, AuthorizationStatus } from '../const';

export const fetchOffers = createAsyncThunk<OfferPreviewType[], undefined, { extra: AxiosInstance }>(
  'offers/fetchOffers',
  async (_arg, { extra: api }) => {
    const { data } = await api.get<OfferPreviewType[]>('/offers');
    return data;
  }
);

export const setCity = createAction<City>('city/setCity');

export const setAuthorizationStatus = createAction<AuthorizationStatus>('user/setAuthorizationStatus');

export const login = createAsyncThunk<void, undefined, { extra: AxiosInstance }>(
  'user/login',
  async (_arg, { dispatch, extra: api }) => {
    const { status } = await api.get('/login');

    if (status === 200) {
      dispatch(setAuthorizationStatus(AuthorizationStatus.Auth));
    }
  }
);

export const fetchCheckAuth = createAsyncThunk<void, undefined, { extra: AxiosInstance }>(
  'user/checkAuth',
  async (_arg, { dispatch, extra: api }) => {

    const token = localStorage.getItem('Authorization_Token');

    try {
      const { status } = await api.get('/login', {
        headers: {
          'X-Token': token ?? '',
        },
      });

      if (status === 200) {
        dispatch(setAuthorizationStatus(AuthorizationStatus.Auth));
      }

    } catch (err) {

      const error = err as AxiosError;

      if (error.response?.status === 401) {
        dispatch(setAuthorizationStatus(AuthorizationStatus.NoAuth));
        return;
      }

      dispatch(setAuthorizationStatus(AuthorizationStatus.Unknown));
    }
  }
);

