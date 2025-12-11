import { RootState } from '..';
import { createSelector } from 'reselect';

export const selectReviews = (state: RootState) => state.reviews.reviews;
export const selectIsSendingReview = (state: RootState) => state.reviews.isSending;

export const selectReviewsCount = createSelector(
  selectReviews,
  (reviews) => reviews.length
);

export const selectReviewsSortedByDate = (limit: number = 5) =>
  createSelector(
    selectReviews,
    (reviews) => {
      if (!Array.isArray(reviews)) {
        return [];
      }

      return reviews
        .slice()
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, limit);
    }
  );

