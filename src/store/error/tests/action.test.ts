import { setServerError } from '../action';

describe('error actions', () => {
  it('setServerError creates correct action with message', () => {
    const message = 'Сервер недоступен';
    const action = setServerError(message);
    expect(action.type).toBe('error/setServerError');
    expect(action.payload).toBe(message);
  });

  it('setServerError creates correct action with null', () => {
    const action = setServerError(null);
    expect(action.type).toBe('error/setServerError');
    expect(action.payload).toBeNull();
  });
});
