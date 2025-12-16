import { errorReducer } from '../reducer';
import { setServerError } from '../action';

describe('errorReducer', () => {
  it('should return initial state', () => {
    expect(errorReducer(undefined, { type: 'UNKNOWN' })).toEqual({
      serverError: null,
    });
  });

  it('should set server error', () => {
    const state = errorReducer(undefined, setServerError('Server error'));

    expect(state.serverError).toBe('Server error');
  });

  it('should reset server error to null', () => {
    const initialState = { serverError: 'Error' };

    const state = errorReducer(initialState, setServerError(null));

    expect(state.serverError).toBeNull();
  });
});
