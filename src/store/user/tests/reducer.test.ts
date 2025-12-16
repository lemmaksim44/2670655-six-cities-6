import { userReducer } from '../reducer';
import { setAuthorizationStatus, setUserInfo } from '../action';
import { AuthorizationStatus } from '../../../const';
import { UserAuthType } from '../../../types/user-auth';

const mockUser: UserAuthType = {
  email: 'test@example.com',
  name: 'Alice',
  avatarUrl: '/avatar.png',
  isPro: true,
  token: 'token123',
};

const initialState = {
  authorizationStatus: AuthorizationStatus.Unknown,
  userInfo: null,
};

describe('userReducer', () => {
  it('should return the initial state when passed an empty action', () => {
    const state = userReducer(undefined, { type: '' });
    expect(state).toEqual(initialState);
  });

  it('should handle setAuthorizationStatus to Auth', () => {
    const state = userReducer(initialState, setAuthorizationStatus(AuthorizationStatus.Auth));
    expect(state.authorizationStatus).toBe(AuthorizationStatus.Auth);
    expect(state.userInfo).toBeNull();
  });

  it('should handle setAuthorizationStatus to NoAuth', () => {
    const state = userReducer(
      { ...initialState, authorizationStatus: AuthorizationStatus.Auth },
      setAuthorizationStatus(AuthorizationStatus.NoAuth)
    );
    expect(state.authorizationStatus).toBe(AuthorizationStatus.NoAuth);
  });

  it('should handle setUserInfo with a user', () => {
    const state = userReducer(initialState, setUserInfo(mockUser));
    expect(state.userInfo).toEqual(mockUser);
    expect(state.authorizationStatus).toBe(AuthorizationStatus.Unknown);
  });

  it('should handle setUserInfo with null', () => {
    const state = userReducer(
      { ...initialState, userInfo: mockUser },
      setUserInfo(null)
    );
    expect(state.userInfo).toBeNull();
  });

  it('should correctly handle sequence of actions', () => {
    let state = userReducer(initialState, setAuthorizationStatus(AuthorizationStatus.Auth));
    state = userReducer(state, setUserInfo(mockUser));

    expect(state.authorizationStatus).toBe(AuthorizationStatus.Auth);
    expect(state.userInfo).toEqual(mockUser);

    state = userReducer(state, setAuthorizationStatus(AuthorizationStatus.NoAuth));
    state = userReducer(state, setUserInfo(null));

    expect(state.authorizationStatus).toBe(AuthorizationStatus.NoAuth);
    expect(state.userInfo).toBeNull();
  });
});
