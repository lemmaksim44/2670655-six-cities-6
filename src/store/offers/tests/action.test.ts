import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { fetchOffers, fetchOfferById, fetchNearbyOffers, } from '../action';
import { setServerError } from '../../error/action';
import { OfferPreviewType } from '../../../types/offer-preview';
import { OfferType } from '../../../types/offer';

const mockApi = new MockAdapter(axios);
const dispatch = vi.fn();

const mockOfferPreview: OfferPreviewType = {
  id: '1',
  isFavorite: false,
  city: { name: 'Paris' },
} as OfferPreviewType;

const mockOffer: OfferType = {
  id: '1',
  isFavorite: false,
  city: { name: 'Paris' },
} as OfferType;

describe('offer async actions', () => {
  afterEach(() => {
    mockApi.reset();
    dispatch.mockClear();
  });

  describe('fetchOffers', () => {
    it('should return offers on success', async () => {
      mockApi.onGet('/offers').reply(200, [mockOfferPreview]);

      const thunk = fetchOffers();
      const result = await thunk(dispatch, () => ({}), axios);

      expect(result.payload).toEqual([mockOfferPreview]);
      expect(dispatch).toHaveBeenCalledWith(setServerError(null));
    });

    it('should return empty array on network error', async () => {
      mockApi.onGet('/offers').networkError();

      const thunk = fetchOffers();
      const result = await thunk(dispatch, () => ({}), axios);

      expect(result.payload).toEqual([]);
      expect(dispatch).toHaveBeenCalledWith(
        setServerError('Сервер недоступен')
      );
    });
  });

  describe('fetchOfferById', () => {
    it('should return offer on success', async () => {
      mockApi.onGet('/offers/1').reply(200, mockOffer);

      const thunk = fetchOfferById('1');
      const result = await thunk(dispatch, () => ({}), axios);

      expect(result.payload).toEqual(mockOffer);
      expect(dispatch).toHaveBeenCalledWith(setServerError(null));
    });

    it('should return null on 404', async () => {
      mockApi.onGet('/offers/1').reply(404);

      const thunk = fetchOfferById('1');
      const result = await thunk(dispatch, () => ({}), axios);

      expect(result.payload).toBeNull();
    });

    it('should set server error on network error', async () => {
      mockApi.onGet('/offers/1').networkError();

      const thunk = fetchOfferById('1');
      const result = await thunk(dispatch, () => ({}), axios);

      expect(result.payload).toBeNull();
      expect(dispatch).toHaveBeenCalledWith(
        setServerError('Сервер недоступен')
      );
    });
  });

  describe('fetchNearbyOffers', () => {
    it('should return nearby offers on success', async () => {
      mockApi.onGet('/offers/1/nearby').reply(200, [mockOfferPreview]);

      const thunk = fetchNearbyOffers('1');
      const result = await thunk(dispatch, () => ({}), axios);

      expect(result.payload).toEqual([mockOfferPreview]);
      expect(dispatch).toHaveBeenCalledWith(setServerError(null));
    });

    it('should return empty array on network error', async () => {
      mockApi.onGet('/offers/1/nearby').networkError();

      const thunk = fetchNearbyOffers('1');
      const result = await thunk(dispatch, () => ({}), axios);

      expect(result.payload).toEqual([]);
      expect(dispatch).toHaveBeenCalledWith(
        setServerError('Сервер недоступен')
      );
    });
  });
});
