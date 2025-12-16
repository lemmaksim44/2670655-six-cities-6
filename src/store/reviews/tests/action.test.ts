import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { fetchReviewsByOfferId, sendReview } from '../action';
import { setServerError } from '../../error/action';
import { ReviewType } from '../../../types/review';

const mockApi = new MockAdapter(axios);
const dispatch = vi.fn();

const mockUser = { id: 'u1', name: 'Alice', isPro: true, avatarUrl: '/avatar1.png' };
const mockReview: ReviewType = {
  id: '1',
  comment: 'test',
  rating: 5,
  date: '2025-12-15',
  user: mockUser,
};

describe('reviews async actions', () => {
  beforeEach(() => {
    mockApi.reset();
    dispatch.mockClear();
  });

  it('fetchReviewsByOfferId should return data on success', async () => {
    mockApi.onGet('/comments/offer-1').reply(200, [mockReview]);

    const thunk = fetchReviewsByOfferId('offer-1');
    const result = await thunk(dispatch, () => ({}), axios);

    expect(result.payload).toEqual([mockReview]);
    expect(dispatch).toHaveBeenCalledWith(setServerError(null));
  });

  it('sendReview should return data on success', async () => {
    mockApi.onPost('/comments/1').reply(200, mockReview);

    const thunk = sendReview({ offerId: '1', rating: 5, comment: 'test' });
    const result = await thunk(dispatch, () => ({}), axios);

    expect(result.payload).toEqual(mockReview);
    expect(dispatch).toHaveBeenCalledWith(setServerError(null));
  });
});
