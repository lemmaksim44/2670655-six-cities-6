import { configureStore } from '@reduxjs/toolkit';
import { offersReducer} from './offers/reducer';
import { userReducer } from './user/reducer';
import { errorReducer } from './error/reducer';
import { createAPI } from '../services/api';

export const api = createAPI();

export const store = configureStore({
  reducer: {
    user: userReducer,
    offers: offersReducer,
    error: errorReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatchType = typeof store.dispatch;
