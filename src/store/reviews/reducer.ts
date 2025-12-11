import { createReducer } from '@reduxjs/toolkit';

import { ReviewType } from '../../types/review';
import { fetchReviewsByOfferId, sendReview } from './action';

const initialState: {
  reviews: ReviewType[];
  isSending: boolean;
} = {
  reviews: [],
  isSending: false,
};

export const reviewsReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(fetchReviewsByOfferId.fulfilled, (state, action) => {
      state.reviews = action.payload;
    })
    .addCase(fetchReviewsByOfferId.rejected, (state) => {
      state.reviews = [];
    })
    .addCase(sendReview.pending, (state) => {
      state.isSending = true;
    })
    .addCase(sendReview.fulfilled, (state, action) => {
      state.reviews = action.payload;
      state.isSending = false;
    })
    .addCase(sendReview.rejected, (state) => {
      state.isSending = false;
    });
});
