import { render, screen } from '@testing-library/react';
import { vi, type MockedFunction } from 'vitest';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { Provider, useDispatch } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import OfferPage from '../offer-page';
import { rootReducer } from '../../../store/root-reducer';
import { RootState } from '../../../store';
import { OfferType } from '../../../types/offer';
import { OfferPreviewType } from '../../../types/offer-preview';
import { City } from '../../../const';

vi.mock('react-redux', async () => {
  const actual = await vi.importActual<typeof import('react-redux')>('react-redux');
  return {
    ...actual,
    useDispatch: vi.fn(),
  };
});

vi.mock('../../../components/header/header', () => ({
  default: () => <div data-testid="header" />,
}));

vi.mock('../../../components/footer/footer', () => ({
  default: () => <div data-testid="footer" />,
}));

vi.mock('../../../components/spinner/spinner', () => ({
  default: () => <div data-testid="spinner" />,
}));

vi.mock('../offer-page-details', () => ({
  default: () => <div data-testid="offer-details" />,
}));

vi.mock('../offer-near-list', () => ({
  default: () => <div data-testid="offer-near-list" />,
}));

vi.mock('../../page-404/page-404', () => ({
  default: () => <div data-testid="page-404" />,
}));

const offers: OfferType[] = [
  {
    id: '1',
    title: 'Test offer',
    description: 'Test description',
    type: 'hotel',
    price: 100,
    previewImage: 'img.jpg',
    images: [],
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 0,
        longitude: 0,
        zoom: 10,
      },
    },
    location: {
      latitude: 0,
      longitude: 0,
      zoom: 10,
    },
    goods: [],
    host: {
      isPro: false,
      name: 'Angelina',
      avatarUrl: 'avatar.jpg',
    },
    isPremium: false,
    isFavorite: false,
    rating: 4,
    bedrooms: 1,
    maxAdults: 2,
  },
];

const makeOffersState = (
  override?: Partial<RootState['offers']>
): RootState['offers'] => ({
  city: City.Amsterdam,
  offers: [] as OfferPreviewType[],
  isOffersLoading: false,
  offer: null,
  isOfferLoading: false,
  offersNearby: [],
  ...override,
});

const renderWithStore = (preloadedState?: Partial<RootState>) => {
  const store = configureStore({
    reducer: rootReducer,
    preloadedState: preloadedState as RootState,
  });

  const dispatchMock = vi.fn();

  (useDispatch as MockedFunction<typeof useDispatch>)
    .mockReturnValue(dispatchMock);

  render(
    <Provider store={store}>
      <MemoryRouter initialEntries={['/offer/1']}>
        <Routes>
          <Route path="/offer/:id" element={<OfferPage />} />
        </Routes>
      </MemoryRouter>
    </Provider>
  );

  return { dispatchMock };
};

describe('OfferPage', () => {
  it('renders 404 page when offer is null and not loading', () => {
    renderWithStore({
      offers: makeOffersState({
        offer: null,
        isOfferLoading: false,
      }),
    });

    expect(screen.getByTestId('page-404')).toBeInTheDocument();
  });

  it('renders spinner while offer is loading', () => {
    renderWithStore({
      offers: makeOffersState({
        isOfferLoading: true,
      }),
    });

    expect(screen.getByTestId('spinner')).toBeInTheDocument();
    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });

  it('renders offer details and nearby offers when offer is loaded', () => {
    renderWithStore({
      offers: makeOffersState({
        offer: offers[0],
        offersNearby: offers,
      }),
    });

    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByTestId('offer-details')).toBeInTheDocument();
    expect(screen.getByTestId('offer-near-list')).toBeInTheDocument();
  });

  it('dispatches actions on mount', () => {
    const { dispatchMock } = renderWithStore({
      offers: makeOffersState({
        isOfferLoading: true,
      }),
    });

    expect(dispatchMock).toHaveBeenCalledTimes(3);
  });
});
