import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { UserAuthType } from '../../types/user-auth';
import { AuthorizationStatus } from '../../const';
import { LoginData } from '../../types/login';
import { AxiosInstance, AxiosError } from 'axios';

export const setUserInfo = createAction<UserAuthType | null>('user/setUserInfo');

export const setAuthorizationStatus = createAction<AuthorizationStatus>('user/setAuthorizationStatus');

export const logoutUser = createAction('user/logout');

export const fetchCheckAuth = createAsyncThunk<void, undefined, { extra: AxiosInstance }>(
  'user/checkAuth',
  async (_arg, { dispatch, extra: api }) => {

    const token = localStorage.getItem('Authorization_Token');

    if (!token) {
      dispatch(setAuthorizationStatus(AuthorizationStatus.NoAuth));
      return;
    }

    try {
      const { data, status } = await api.get<UserAuthType>('/login', {
        headers: {
          'X-Token': token,
        },
      });

      if (status === 200) {
        dispatch(setAuthorizationStatus(AuthorizationStatus.Auth));
        dispatch(setUserInfo(data));
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

export const fetchLogin = createAsyncThunk<void, LoginData, { extra: AxiosInstance }>(
  'user/login',
  async ({ email, password }, { dispatch, extra: api }) => {
    try {
      const { data, status } = await api.post<UserAuthType>('/login', {
        email,
        password,
      });

      if (status === 201) {
        localStorage.setItem('Authorization_Token', data.token);
        dispatch(setAuthorizationStatus(AuthorizationStatus.Auth));
        dispatch(setUserInfo(data));
      }
    } catch (err) {
      const error = err as AxiosError;

      if (error.response?.status === 400) {
        dispatch(setAuthorizationStatus(AuthorizationStatus.NoAuth));
      }

      dispatch(setAuthorizationStatus(AuthorizationStatus.Unknown));
    }
  }
);

export const fetchLogout = createAsyncThunk<void, void, { extra: AxiosInstance }>(
  'user/logout',
  async (_arg, { dispatch, extra: api }) => {
    const token = localStorage.getItem('Authorization_Token');

    if (!token) {
      dispatch(setAuthorizationStatus(AuthorizationStatus.NoAuth));
      dispatch(setUserInfo(null));
      return;
    }

    try {
      const { status } = await api.delete('/six-cities/logout', {
        headers: {
          'X-Token': token,
        },
      });

      if (status === 204) {
        localStorage.removeItem('Authorization_Token');
        dispatch(setAuthorizationStatus(AuthorizationStatus.NoAuth));
        dispatch(setUserInfo(null));
      }
    } catch (err) {
      localStorage.removeItem('Authorization_Token');
      dispatch(setAuthorizationStatus(AuthorizationStatus.NoAuth));
      dispatch(setUserInfo(null));
    }
  }
);
