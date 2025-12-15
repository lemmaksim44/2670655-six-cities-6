import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { setUserInfo, setAuthorizationStatus, logoutUser, fetchCheckAuth, fetchLogin, fetchLogout } from '../action';
import { AuthorizationStatus } from '../../../const';
import { LoginData } from '../../../types/login';
import { UserAuthType } from '../../../types/user-auth';
import { tokenService } from '../../../services/token';

const mockApi = new MockAdapter(axios);
const dispatch = vi.fn();
const getState = vi.fn();

const mockUser: UserAuthType = {
  email: 'test@example.com',
  name: 'Alice',
  avatarUrl: '/avatar.png',
  isPro: true,
  token: 'token123',
};

beforeEach(() => {
  vi.clearAllMocks();
  mockApi.reset();

  vi.spyOn(tokenService, 'get').mockReturnValue('token123');
  vi.spyOn(tokenService, 'remove').mockImplementation((() => {}) as typeof tokenService.remove);
  vi.spyOn(tokenService, 'getAuthHeaders').mockReturnValue({ Authorization: 'Bearer token123' });
});

describe('user actions', () => {
  it('setUserInfo creates correct action', () => {
    const action = setUserInfo(mockUser);
    expect(action.payload).toEqual(mockUser);
  });

  it('setAuthorizationStatus creates correct action', () => {
    const action = setAuthorizationStatus(AuthorizationStatus.Auth);
    expect(action.payload).toBe(AuthorizationStatus.Auth);
  });

  it('logoutUser creates correct action', () => {
    const action = logoutUser();
    expect(action.type).toBe('user/logout');
  });
});

describe('user async thunks', () => {
  it('fetchCheckAuth dispatches Auth when token exists and API returns 200', async () => {
    mockApi.onGet('/login').reply(200, mockUser);

    await fetchCheckAuth()(dispatch, getState, axios);

    expect(dispatch).toHaveBeenCalledWith(expect.objectContaining({ type: 'error/setServerError', payload: null }));
    expect(dispatch).toHaveBeenCalledWith(setAuthorizationStatus(AuthorizationStatus.Auth));
    expect(dispatch).toHaveBeenCalledWith(setUserInfo(mockUser));
  });

  it('fetchLogin dispatches Auth on success', async () => {
    const loginData: LoginData = { email: 'test@example.com', password: '123' };
    mockApi.onPost('/login').reply(200, mockUser);

    await fetchLogin(loginData)(dispatch, getState, axios);

    expect(dispatch).toHaveBeenCalledWith(setAuthorizationStatus(AuthorizationStatus.Auth));
    expect(dispatch).toHaveBeenCalledWith(setUserInfo(mockUser));
  });

  it('fetchLogout clears token and sets NoAuth', async () => {
    mockApi.onDelete('/logout').reply(204);

    await fetchLogout()(dispatch, getState, axios);

    expect(tokenService.remove).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledWith(setAuthorizationStatus(AuthorizationStatus.NoAuth));
    expect(dispatch).toHaveBeenCalledWith(setUserInfo(null));
  });
});
