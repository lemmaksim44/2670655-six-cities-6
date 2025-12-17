import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { MemoryRouter } from 'react-router-dom';

import MainPageCities from '../main-page-cities';
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
    isFavorite: true,
    isPremium: true,
    previewImage: 'img2.jpg',
    city: { name: 'Paris', location: { latitude: 10, longitude: 10, zoom: 10 } },
    location: { latitude: 10, longitude: 10, zoom: 10 },
  },
];

const mockCity = 'Paris';

vi.mock('../../store/offers/selectors', () => ({
  selectCity: () => () => mockCity,
  selectSortedOffers: () => () => mockOffers,
}));

vi.mock('../../store/user/selectors', () => ({
  selectIsAuth: () => true,
}));

const mockOffersReducer = () => ({ city: mockCity, offers: mockOffers });
const mockUserReducer = () => ({
  authorizationStatus: 'AUTH',
  userInfo: { id: 'user-1', name: 'Test User', email: 'test@test.com' },
});

const store = configureStore({
  reducer: {
    offers: mockOffersReducer,
    user: mockUserReducer,
  },
});

describe('MainPageCities', () => {
  it('renders offers list and city', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <MainPageCities />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(`${mockOffers.length} places to stay in ${mockCity}`)).toBeInTheDocument();

    mockOffers.forEach((offer) => {
      expect(screen.getByText(offer.title)).toBeInTheDocument();
    });

    expect(document.querySelector('.places__options')).toBeInTheDocument();
  });

  it('changes current sorting when option is clicked', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <MainPageCities />
        </MemoryRouter>
      </Provider>
    );

    const sortingList = document.querySelector('.places__options');
    const lowToHighOption = sortingList?.querySelector('.places__option:nth-child(2)');
    expect(lowToHighOption).toBeTruthy();

    fireEvent.click(lowToHighOption!);
    expect(lowToHighOption!.classList.contains('places__option--active')).toBe(true);
  });

  it('simulates hover over a card without touching component props', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <MainPageCities />
        </MemoryRouter>
      </Provider>
    );

    const firstCard = document.querySelector('.cities__card');
    expect(firstCard).toBeTruthy();

    fireEvent.mouseOver(firstCard!);
    fireEvent.mouseOut(firstCard!);

    expect(firstCard).toBeInTheDocument();
  });

  it('renders premium label for premium offers', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <MainPageCities />
        </MemoryRouter>
      </Provider>
    );

    const premiumLabel = document.querySelector('.place-card__mark');
    expect(premiumLabel?.textContent?.trim()).toBe('Premium');
  });

  it('renders correct price for each offer', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <MainPageCities />
        </MemoryRouter>
      </Provider>
    );

    const prices = document.querySelectorAll('.place-card__price-value');
    expect(prices[0].textContent?.includes('100')).toBe(true);
    expect(prices[1].textContent?.includes('200')).toBe(true);
  });

  it('renders favorite buttons with correct status', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <MainPageCities />
        </MemoryRouter>
      </Provider>
    );

    const bookmarkButtons = document.querySelectorAll('.place-card__bookmark-button');
    expect(bookmarkButtons[0].classList.contains('place-card__bookmark-button--active')).toBe(false);
    expect(bookmarkButtons[1].classList.contains('place-card__bookmark-button--active')).toBe(true);
  });

  it('renders correct ratings', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <MainPageCities />
        </MemoryRouter>
      </Provider>
    );

    const stars = document.querySelectorAll('.place-card__stars > span:first-child');
    expect(stars[0].getAttribute('style')).toBe('width: 80%;');
    expect(stars[1].getAttribute('style')).toBe('width: 60%;');
  });

  it('renders offer links correctly', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <MainPageCities />
        </MemoryRouter>
      </Provider>
    );

    const links = document.querySelectorAll('.place-card__name a');
    expect(links[0].getAttribute('href')).toBe('/offer/offer-1');
    expect(links[1].getAttribute('href')).toBe('/offer/offer-2');
  });

  it('renders offer images correctly', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <MainPageCities />
        </MemoryRouter>
      </Provider>
    );

    const images = document.querySelectorAll('.place-card__image');
    expect(images[0].getAttribute('src')).toBe('img1.jpg');
    expect(images[1].getAttribute('src')).toBe('img2.jpg');
  });
});
