import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { fetchFavorites, changeFavoriteStatus } from '../action';
import { setServerError } from '../../error/action';
import { OfferPreviewType } from '../../../types/offer-preview';

const mockApi = new MockAdapter(axios);

const dispatch = vi.fn();

const mockFavorite: OfferPreviewType = {
  id: '1',
  isFavorite: true,
  city: { name: 'Paris' },
} as OfferPreviewType;

describe('favorite async actions', () => {
  afterEach(() => {
    mockApi.reset();
    dispatch.mockClear();
  });

  describe('fetchFavorites', () => {
    it('should return favorites on success', async () => {
      mockApi.onGet('/favorite').reply(200, [mockFavorite]);

      const thunk = fetchFavorites();
      const result = await thunk(dispatch, () => ({}), axios);

      expect(result.payload).toEqual([mockFavorite]);
      expect(dispatch).toHaveBeenCalledWith(setServerError(null));
    });

    it('should return empty array on network error', async () => {
      mockApi.onGet('/favorite').networkError();

      const thunk = fetchFavorites();
      const result = await thunk(dispatch, () => ({}), axios);

      expect(result.payload).toEqual([]);
      expect(dispatch).toHaveBeenCalledWith(
        setServerError('Сервер недоступен')
      );
    });
  });

  describe('changeFavoriteStatus', () => {
    it('should return updated offer on success', async () => {
      mockApi.onPost('/favorite/1/1').reply(200, mockFavorite);

      const thunk = changeFavoriteStatus({ offerId: '1', status: 1 });
      const result = await thunk(dispatch, () => ({}), axios);

      expect(result.payload).toEqual(mockFavorite);
      expect(dispatch).toHaveBeenCalledWith(setServerError(null));
    });

    it('should return null on network error', async () => {
      mockApi.onPost('/favorite/1/1').networkError();

      const thunk = changeFavoriteStatus({ offerId: '1', status: 1 });
      const result = await thunk(dispatch, () => ({}), axios);

      expect(result.payload).toBeNull();
      expect(dispatch).toHaveBeenCalledWith(
        setServerError('Сервер недоступен')
      );
    });
  });
});
