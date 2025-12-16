import { selectUserInfo, selectAuthorizationStatus, selectIsAuth } from '../selectors';
import { AuthorizationStatus } from '../../../const';
import { UserAuthType } from '../../../types/user-auth';
import { RootState } from '../..';

const mockUser: UserAuthType = {
  email: 'test@example.com',
  name: 'Alice',
  avatarUrl: '/avatar.png',
  isPro: true,
  token: 'token123',
};

describe('user selectors', () => {
  const baseState: RootState = {
    user: {
      authorizationStatus: AuthorizationStatus.Unknown,
      userInfo: null,
    },
  } as RootState;

  it('selectUserInfo should return userInfo', () => {
    expect(selectUserInfo(baseState)).toBeNull();

    const stateWithUser: RootState = {
      ...baseState,
      user: {
        ...baseState.user,
        userInfo: mockUser,
      },
    } as RootState;

    expect(selectUserInfo(stateWithUser)).toEqual(mockUser);
  });

  it('selectAuthorizationStatus should return authorizationStatus', () => {
    expect(selectAuthorizationStatus(baseState)).toBe(AuthorizationStatus.Unknown);

    const stateAuth: RootState = {
      ...baseState,
      user: {
        ...baseState.user,
        authorizationStatus: AuthorizationStatus.Auth,
      },
    } as RootState;

    expect(selectAuthorizationStatus(stateAuth)).toBe(AuthorizationStatus.Auth);
  });

  it('selectIsAuth should return true if status is Auth', () => {
    const stateAuth: RootState = {
      ...baseState,
      user: {
        ...baseState.user,
        authorizationStatus: AuthorizationStatus.Auth,
      },
    } as RootState;

    expect(selectIsAuth(stateAuth)).toBe(true);
  });

  it('selectIsAuth should return false if status is not Auth', () => {
    const stateNoAuth: RootState = {
      ...baseState,
      user: {
        ...baseState.user,
        authorizationStatus: AuthorizationStatus.NoAuth,
      },
    } as RootState;

    expect(selectIsAuth(stateNoAuth)).toBe(false);

    const stateUnknown: RootState = {
      ...baseState,
      user: {
        ...baseState.user,
        authorizationStatus: AuthorizationStatus.Unknown,
      },
    } as RootState;

    expect(selectIsAuth(stateUnknown)).toBe(false);
  });
});
