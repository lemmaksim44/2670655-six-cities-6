import { describe, it, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import MainPage from '../main-page';
import { offersReducer } from '../../../store/offers/reducer';
import { fetchOffers } from '../../../store/offers/action';
import { OfferPreviewType } from '../../../types/offer-preview';
import { City } from '../../../const';
import { AppDispatchType } from '../../../store';

vi.mock('../../../components/header/header', () => ({
  default: () => <div data-testid="header">Header</div>,
}));
vi.mock('../../../components/spinner/spinner', () => ({
  default: () => <div data-testid="spinner">Spinner</div>,
}));
vi.mock('../main-page-cities-list', () => ({
  default: () => <div data-testid="cities-list">Cities List</div>,
}));
vi.mock('../main-page-cities', () => ({
  default: () => <div data-testid="main-page-cities">Main Page Cities</div>,
}));
vi.mock('../main-page-empty', () => ({
  default: () => <div data-testid="main-page-empty">Main Page Empty</div>,
}));

vi.mock('../../../store/offers/action', async () => {
  const actualModule: typeof import('../../../store/offers/action') = await vi.importActual('../../../store/offers/action');

  const mockFetchOffers = vi.fn(() => (dispatch: AppDispatchType) => {
    dispatch({ type: 'FETCH_OFFERS' });
    return Promise.resolve();
  });

  Object.assign(mockFetchOffers, {
    pending: 'fetchOffers/pending',
    fulfilled: 'fetchOffers/fulfilled',
    rejected: 'fetchOffers/rejected',
    toString: () => 'fetchOffers',
  });

  return {
    ...actualModule,
    fetchOffers: mockFetchOffers,
  };
});

const mockOffers: OfferPreviewType[] = [
  {
    id: '1',
    title: 'Offer 1',
    type: 'apartment',
    price: 100,
    rating: 4,
    isFavorite: false,
    isPremium: true,
    previewImage: '',
    city: { name: City.Paris, location: { latitude: 10, longitude: 10, zoom: 10 } },
    location: { latitude: 10, longitude: 10, zoom: 10 },
  },
];

describe('MainPage', () => {
  let store = configureStore({
    reducer: { offers: offersReducer },
    preloadedState: {
      offers: {
        offers: [],
        isOffersLoading: false,
        city: City.Paris,
        offer: null,
        isOfferLoading: false,
        offersNearby: [],
      },
    },
  });

  beforeEach(() => {
    vi.clearAllMocks();
    store = configureStore({
      reducer: { offers: offersReducer },
      preloadedState: {
        offers: {
          offers: [],
          isOffersLoading: false,
          city: City.Paris,
          offer: null,
          isOfferLoading: false,
          offersNearby: [],
        },
      },
    });
  });

  it('dispatches fetchOffers on mount', () => {
    render(
      <Provider store={store}>
        <MainPage />
      </Provider>
    );

    expect(fetchOffers).toHaveBeenCalledTimes(1);
  });

  it('shows spinner when offers are loading', () => {
    store = configureStore({
      reducer: { offers: offersReducer },
      preloadedState: {
        offers: {
          offers: [],
          isOffersLoading: true,
          city: City.Paris,
          offer: null,
          isOfferLoading: false,
          offersNearby: [],
        },
      },
    });

    render(
      <Provider store={store}>
        <MainPage />
      </Provider>
    );

    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });

  it('shows MainPageCities when offers exist', () => {
    store = configureStore({
      reducer: { offers: offersReducer },
      preloadedState: {
        offers: {
          offers: mockOffers,
          isOffersLoading: false,
          city: City.Paris,
          offer: null,
          isOfferLoading: false,
          offersNearby: [],
        },
      },
    });

    render(
      <Provider store={store}>
        <MainPage />
      </Provider>
    );

    expect(screen.getByTestId('main-page-cities')).toBeInTheDocument();
  });

  it('shows MainPageEmpty when no offers exist and not loading', () => {
    render(
      <Provider store={store}>
        <MainPage />
      </Provider>
    );

    expect(screen.getByTestId('main-page-empty')).toBeInTheDocument();
  });
});
