import { ReviewType } from '../types/review';

export const reviews: ReviewType[] = [
  {
    id: '229b4d25-03a7-408d-a5dc-fcedb7348214',
    comment: 'The room was spacious and clean. The pool looked nothing like the photos and desparately needs a clean. The sauna and spa were closed for lunar new year holiday.',
    date: '2025-09-18T21:00:00.746Z',
    rating: 4,
    user: {
      name: 'Zak',
      avatarUrl: 'https://14.design.htmlacademy.pro/static/avatar/10.jpg',
      isPro: true
    }
  },
  {
    id: '0dea9e33-d3d7-4374-bfa1-ff249e7536b7',
    comment: 'The deluxe room was a quite comfortable one with all the adequate facilities. The only thing that made me feel uncomfortable was the rude behavior of an impolite staff at the reception desk.',
    date: '2025-09-17T21:00:00.746Z',
    rating: 1,
    user: {
      name: 'Isaac',
      avatarUrl: 'https://14.design.htmlacademy.pro/static/avatar/8.jpg',
      isPro: false
    }
  },
  {
    id: '3b924cb0-7e4d-4c68-9ae6-fe0d7ecb3383',
    comment: 'Home is amazing. It\'s like staying in a museum. The rooms, furnishings and artworks are incredible. The views of My Vesuvius',
    date: '2025-09-19T21:00:00.746Z',
    rating: 5,
    user: {
      name: 'Jack',
      avatarUrl: 'https://14.design.htmlacademy.pro/static/avatar/3.jpg',
      isPro: true
    }
  }
];
