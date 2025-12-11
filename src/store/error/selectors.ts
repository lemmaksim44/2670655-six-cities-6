import { RootState } from '..';
import { createSelector } from '@reduxjs/toolkit';

export const selectServerError = (state: RootState) => state.error.serverError;

export const selectIsError = createSelector(
  selectServerError,
  (serverError) => serverError !== null
);
