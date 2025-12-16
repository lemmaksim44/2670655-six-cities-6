import { selectReviews, selectIsSendingReview, selectReviewsCount, selectReviewsSortedByDate } from '../selectors';
import { ReviewType } from '../../../types/review';
import { RootState } from '../..';

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

const mockReview3: ReviewType = {
  id: '3',
  comment: 'Review 3',
  rating: 3,
  date: '2025-12-13T10:00:00.000Z',
} as ReviewType;

const state: RootState = {
  reviews: {
    reviews: [mockReview1, mockReview2, mockReview3],
    isSending: false,
  },
} as RootState;

describe('reviews selectors', () => {
  it('selectReviews should return reviews array', () => {
    expect(selectReviews(state)).toEqual([mockReview1, mockReview2, mockReview3]);
  });

  it('selectIsSendingReview should return isSending', () => {
    expect(selectIsSendingReview(state)).toBe(false);
  });

  it('selectReviewsCount should return length', () => {
    expect(selectReviewsCount(state)).toBe(3);
  });

  it('selectReviewsSortedByDate should return reviews sorted by date descending', () => {
    const selector = selectReviewsSortedByDate();
    const result = selector(state);
    expect(result[0]).toEqual(mockReview1);
    expect(result[1]).toEqual(mockReview2);
    expect(result[2]).toEqual(mockReview3);
  });

  it('selectReviewsSortedByDate should respect limit', () => {
    const selector = selectReviewsSortedByDate(2);
    const result = selector(state);
    expect(result).toHaveLength(2);
    expect(result[0]).toEqual(mockReview1);
    expect(result[1]).toEqual(mockReview2);
  });

  it('selectReviewsSortedByDate should return empty array if reviews is not array', () => {
    const badState = { reviews: { reviews: null, isSending: false } } as unknown as RootState;
    const selector = selectReviewsSortedByDate();
    expect(selector(badState)).toEqual([]);
  });

  it('selectReviewsSortedByDate should handle empty reviews array', () => {
    const emptyState = { reviews: { reviews: [], isSending: false } } as unknown as RootState;
    const selector = selectReviewsSortedByDate();
    expect(selector(emptyState)).toEqual([]);
  });

  it('selectReviewsSortedByDate should handle more reviews than limit', () => {
    const extraReview: ReviewType = {
      id: '4',
      comment: 'Review 4',
      rating: 2,
      date: '2025-12-12T10:00:00.000Z',
    } as ReviewType;

    const bigState = {
      reviews: {
        reviews: [mockReview1, mockReview2, mockReview3, extraReview],
        isSending: false,
      },
    } as unknown as RootState;

    const selector = selectReviewsSortedByDate(3);
    const result = selector(bigState);
    expect(result).toHaveLength(3);
    expect(result).toEqual([mockReview1, mockReview2, mockReview3]);
  });
});
