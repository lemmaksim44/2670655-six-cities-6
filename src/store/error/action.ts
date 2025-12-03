import { createAction } from '@reduxjs/toolkit';

export const setServerError = createAction<string | null>('error/setServerError');
