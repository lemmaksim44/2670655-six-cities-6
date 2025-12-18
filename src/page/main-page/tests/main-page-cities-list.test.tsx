import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';

import MainPageCitiesList from '../main-page-cities-list';
import { City } from '../../../const';
import { setCity } from '../../../store/offers/action';
import { offersReducer } from '../../../store/offers/reducer';
import { OfferPreviewType } from '../../../types/offer-preview';

const mockOffers: OfferPreviewType[] = [
  {
    id: 'offer-1',
    title: 'Test offer 1',
    type: 'apartment',
    price: 100,
    rating: 4,
    isFavorite: false,
    isPremium: true,
    previewImage: 'img1.jpg',
    city: { name: 'Paris', location: { latitude: 10, longitude: 10, zoom: 10 } },
    location: { latitude: 10, longitude: 10, zoom: 10 },
  },
  {
    id: 'offer-2',
    title: 'Test offer 2',
    type: 'apartment',
    price: 200,
    rating: 3,
    isFavorite: false,
    isPremium: true,
    previewImage: 'img2.jpg',
    city: { name: 'Paris', location: { latitude: 10, longitude: 10, zoom: 10 } },
    location: { latitude: 10, longitude: 10, zoom: 10 },
  },
];

const cities = Object.values(City);

describe('MainPageCitiesList Component', () => {
  let store: ReturnType<typeof configureStore>;

  beforeEach(() => {
    store = configureStore({
      reducer: { offers: offersReducer },
      preloadedState: {
        offers: {
          city: City.Paris,
          offers: mockOffers,
          isOffersLoading: false,
          offer: null,
          isOfferLoading: false,
          offersNearby: [],
        },
      },
    });

    const originalDispatch = store.dispatch;
    store.dispatch = vi.fn(originalDispatch);
  });

  const renderComponent = () =>
    render(
      <Provider store={store}>
        <BrowserRouter>
          <MainPageCitiesList />
        </BrowserRouter>
      </Provider>
    );

  it('renders all cities', () => {
    renderComponent();
    cities.forEach((city) => {
      expect(screen.getByText(city)).toBeInTheDocument();
    });
  });

  it('highlights the active city', () => {
    renderComponent();
    const activeLink = screen.getByText(City.Paris).closest('a');
    expect(activeLink).toHaveClass('tabs__item--active');
  });

  it('dispatches action on click even for the active city', () => {
    renderComponent();
    const activeLink = screen.getByText(City.Paris).closest('a')!;
    fireEvent.click(activeLink);
    expect(store.dispatch).toHaveBeenCalledWith(setCity(City.Paris));
  });

  it('all city links have correct href', () => {
    renderComponent();
    cities.forEach((city) => {
      const link = screen.getByText(city).closest('a');
      expect(link).toHaveAttribute('href', '/');
    });
  });

  it('active class moves to clicked city', () => {
    renderComponent();
    const targetCity = City.Brussels;
    const targetLink = screen.getByText(targetCity).closest('a')!;
    fireEvent.click(targetLink);
    expect(targetLink).toHaveClass('tabs__item--active');
  });

  it('all non-active cities do not have active class', () => {
    renderComponent();
    cities.forEach((city) => {
      const link = screen.getByText(city).closest('a');
      if (city !== City.Paris) {
        expect(link).not.toHaveClass('tabs__item--active');
      }
    });
  });

  it('user can navigate and select a city', () => {
    renderComponent();
    expect(screen.getByText(City.Paris).closest('a')).toHaveClass('tabs__item--active');
    const targetCity = City.Brussels;
    fireEvent.click(screen.getByText(targetCity));
    expect(store.dispatch).toHaveBeenCalledWith(setCity(targetCity));
  });
});
