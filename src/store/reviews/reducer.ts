import { createReducer } from '@reduxjs/toolkit';
import { ReviewType } from '../../types/review';
import { fetchReviewsByOfferId } from './action';

const initialState: {
  reviews: ReviewType[];
} = {
  reviews: [],
};

export const reviewsReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(fetchReviewsByOfferId.fulfilled, (state, action) => {
      state.reviews = action.payload;
    })
    .addCase(fetchReviewsByOfferId.rejected, (state) => {
      state.reviews = [];
    });
});
