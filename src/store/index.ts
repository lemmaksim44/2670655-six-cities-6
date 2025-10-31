import { configureStore } from '@reduxjs/toolkit';
import { reducer } from './reducer';

export const store = configureStore({ reducer });

export type StateType = ReturnType<typeof store.getState>;
export type AppDispatchType = typeof store.dispatch;
