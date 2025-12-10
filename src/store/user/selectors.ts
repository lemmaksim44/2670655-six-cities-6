import { RootState } from '..';
import { createSelector } from 'reselect';
import { AuthorizationStatus } from '../../const';

export const selectUserInfo = (state: RootState) => state.user.userInfo;
export const selectAuthorizationStatus = (state: RootState) => state.user.authorizationStatus;

export const selectIsAuth = createSelector(
  selectAuthorizationStatus,
  (status) => status === AuthorizationStatus.Auth
);
