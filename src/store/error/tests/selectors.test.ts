import { selectServerError, selectIsError } from '../selectors';
import { RootState } from '../..';

describe('error selectors', () => {
  const baseState = {
    error: {
      serverError: null,
    },
  } as RootState;

  it('should return serverError', () => {
    const state = {
      ...baseState,
      error: { serverError: 'Error message' },
    };

    expect(selectServerError(state)).toBe('Error message');
  });

  it('should return true when error exists', () => {
    const state = {
      ...baseState,
      error: { serverError: 'Error message' },
    };

    expect(selectIsError(state)).toBe(true);
  });

  it('should return false when error is null', () => {
    expect(selectIsError(baseState)).toBe(false);
  });
});
