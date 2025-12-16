import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance, AxiosError } from 'axios';

import { AuthorizationStatus } from '../../const';
import { LoginData } from '../../types/login';
import { UserAuthType } from '../../types/user-auth';
import { setServerError } from '../error/action';
import { tokenService } from '../../services/token';

export const setUserInfo = createAction<UserAuthType | null>('user/setUserInfo');

export const setAuthorizationStatus = createAction<AuthorizationStatus>('user/setAuthorizationStatus');

export const logoutUser = createAction('user/logout');

export const fetchCheckAuth = createAsyncThunk<void, undefined, { extra: AxiosInstance }>(
  'user/checkAuth',
  async (_arg, { dispatch, extra: api }) => {

    try {
      const headers = tokenService.getAuthHeaders();
      const token = tokenService.get();

      if (!token) {
        dispatch(setAuthorizationStatus(AuthorizationStatus.NoAuth));
        return;
      }

      const { data, status } = await api.get<UserAuthType>('/login', { headers });

      if (status === 200) {
        dispatch(setServerError(null));
        dispatch(setAuthorizationStatus(AuthorizationStatus.Auth));
        dispatch(setUserInfo(data));
      }

    } catch (err) {

      const error = err as AxiosError;

      if (error.response?.status === 401) {
        dispatch(setServerError(null));
        dispatch(setAuthorizationStatus(AuthorizationStatus.NoAuth));
        return;
      }

      if (!error.response) {
        dispatch(setServerError('Сервер недоступен'));
      }

      dispatch(setAuthorizationStatus(AuthorizationStatus.Unknown));
    }
  }
);

export const fetchLogin = createAsyncThunk<void, LoginData, { extra: AxiosInstance }>(
  'user/login',
  async ({ email, password }, { dispatch, extra: api }) => {
    try {
      const { data, status } = await api.post<UserAuthType>('/login', { email, password });

      if (status === 200 || status === 201) {
        dispatch(setServerError(null));
        tokenService.set(data.token);
        dispatch(setAuthorizationStatus(AuthorizationStatus.Auth));
        dispatch(setUserInfo(data));
      }
    } catch (err) {
      const error = err as AxiosError;

      if (error.response?.status === 400) {
        dispatch(setServerError(null));
        dispatch(setAuthorizationStatus(AuthorizationStatus.NoAuth));
      }

      if (!error.response) {
        dispatch(setServerError('Сервер недоступен'));
      }

      dispatch(setAuthorizationStatus(AuthorizationStatus.Unknown));
    }
  }
);

export const fetchLogout = createAsyncThunk<void, void, { extra: AxiosInstance }>(
  'user/logout',
  async (_arg, { dispatch, extra: api }) => {
    const token = tokenService.get();

    if (!token) {
      dispatch(setAuthorizationStatus(AuthorizationStatus.NoAuth));
      dispatch(setUserInfo(null));
      return;
    }

    try {
      const { status } = await api.delete('/logout', {
        headers: tokenService.getAuthHeaders(),
      });

      if (status === 204) {
        dispatch(setServerError(null));
        tokenService.remove();
        dispatch(setAuthorizationStatus(AuthorizationStatus.NoAuth));
        dispatch(setUserInfo(null));
      }
    } catch (err) {
      const error = err as AxiosError;

      if (!error.response) {
        dispatch(setServerError('Сервер недоступен'));
      }

      dispatch(setServerError(null));
      tokenService.remove();
      dispatch(setAuthorizationStatus(AuthorizationStatus.NoAuth));
      dispatch(setUserInfo(null));
    }
  }
);
