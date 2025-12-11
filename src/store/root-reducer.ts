import { combineReducers } from '@reduxjs/toolkit';

import { userReducer } from './user/reducer';
import { offersReducer } from './offers/reducer';
import { favoritesReducer } from './favorite/reducer';
import { reviewsReducer } from './reviews/reducer';
import { errorReducer } from './error/reducer';

export const rootReducer = combineReducers({
  user: userReducer,
  offers: offersReducer,
  favorites: favoritesReducer,
  reviews: reviewsReducer,
  error: errorReducer,
});
