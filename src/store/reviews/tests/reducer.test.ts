import { reviewsReducer } from '../reducer';
import { fetchReviewsByOfferId, sendReview } from '../action';
import { ReviewType } from '../../../types/review';

const mockReview1: ReviewType = {
  id: '1',
  comment: 'Review 1',
  rating: 5,
  date: '2025-12-15T10:00:00.000Z',
} as ReviewType;

const mockReview2: ReviewType = {
  id: '2',
  comment: 'Review 2',
  rating: 4,
  date: '2025-12-14T10:00:00.000Z',
} as ReviewType;

const initialState = {
  reviews: [],
  isSending: false,
};

describe('reviewsReducer', () => {
  it('should return the initial state by default', () => {
    const state = reviewsReducer(undefined, { type: 'unknown' });
    expect(state).toEqual(initialState);
  });

  it('should handle fetchReviewsByOfferId.fulfilled', () => {
    const state = reviewsReducer(
      initialState,
      fetchReviewsByOfferId.fulfilled([mockReview1, mockReview2], '', 'offer-1')
    );
    expect(state.reviews).toEqual([mockReview1, mockReview2]);
  });

  it('should handle fetchReviewsByOfferId.rejected', () => {
    const state = reviewsReducer(
      { ...initialState, reviews: [mockReview1] },
      fetchReviewsByOfferId.rejected(new Error(), '', 'offer-1')
    );
    expect(state.reviews).toEqual([]);
  });

  it('should handle sendReview.pending', () => {
    const state = reviewsReducer(initialState, sendReview.pending('', { offerId: '1', rating: 5, comment: 'Test' }));
    expect(state.isSending).toBe(true);
  });

  it('should handle sendReview.fulfilled by adding review at the beginning', () => {
    const state = reviewsReducer(
      { ...initialState, reviews: [mockReview2] },
      sendReview.fulfilled(mockReview1, '', { offerId: '1', rating: 5, comment: 'Test' })
    );
    expect(state.reviews[0]).toEqual(mockReview1);
    expect(state.reviews.length).toBe(2);
    expect(state.isSending).toBe(false);
  });

  it('should handle sendReview.rejected', () => {
    const state = reviewsReducer(
      { ...initialState, isSending: true },
      sendReview.rejected(new Error(), '', { offerId: '1', rating: 5, comment: 'Test' })
    );
    expect(state.isSending).toBe(false);
  });

  it('should replace old reviews when fetchReviewsByOfferId.fulfilled is called again', () => {
    const stateBefore = { reviews: [mockReview1], isSending: false };
    const newReviews = [mockReview2];
    const state = reviewsReducer(
      stateBefore,
      fetchReviewsByOfferId.fulfilled(newReviews, '', 'offer-2')
    );
    expect(state.reviews).toEqual(newReviews);
  });

  it('should not modify isSending on fetchReviewsByOfferId actions', () => {
    const stateBefore = { reviews: [], isSending: true };
    const stateFulfilled = reviewsReducer(
      stateBefore,
      fetchReviewsByOfferId.fulfilled([mockReview1], '', 'offer-1')
    );
    const stateRejected = reviewsReducer(
      stateBefore,
      fetchReviewsByOfferId.rejected(new Error(), '', 'offer-1')
    );
    expect(stateFulfilled.isSending).toBe(true);
    expect(stateRejected.isSending).toBe(true);
  });

  it('should handle multiple sendReview.fulfilled calls correctly', () => {
    const stateBefore = { reviews: [mockReview2], isSending: false };
    const stateAfter = reviewsReducer(
      stateBefore,
      sendReview.fulfilled(mockReview1, '', { offerId: '1', rating: 5, comment: 'Test' })
    );
    expect(stateAfter.reviews).toEqual([mockReview1, mockReview2]);
  });
});
