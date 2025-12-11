import { createReducer } from '@reduxjs/toolkit';

import { AuthorizationStatus } from '../../const';
import { UserAuthType } from '../../types/user-auth';
import { setAuthorizationStatus, setUserInfo } from './action';

const initialState: {
  authorizationStatus: AuthorizationStatus;
  userInfo: UserAuthType | null;
} = {
  authorizationStatus: AuthorizationStatus.Unknown,
  userInfo: null,
};

export const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setAuthorizationStatus, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setUserInfo, (state, action) => {
      state.userInfo = action.payload;
    });
});
