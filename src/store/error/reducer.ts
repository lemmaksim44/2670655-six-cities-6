import { createReducer } from '@reduxjs/toolkit';
import { setServerError } from './action';

const initialState: {
  serverError: string | null;
} = {
  serverError: null,
};

export const errorReducer = createReducer(initialState, (builder) => {
  builder.addCase(setServerError, (state, action) => {
    state.serverError = action.payload;
  });
});
