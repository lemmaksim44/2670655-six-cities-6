import { render, screen, fireEvent } from '@testing-library/react';
import Header from './header';
import { vi, type SpyInstance } from 'vitest';
import * as redux from 'react-redux';
import * as userSelectors from '../../store/user/selectors';
import * as errorSelectors from '../../store/error/selectors';
import * as favoriteSelectors from '../../store/favorite/selector';
import * as userActions from '../../store/user/action';
import * as favoriteActions from '../../store/favorite/action';
import type { Dispatch, AnyAction } from 'redux';
import type { UserAuthType } from '../../types/user-auth';

vi.mock('react-redux', () => ({
  useSelector: vi.fn(),
  useDispatch: vi.fn(),
}));

vi.mock('react-router-dom', async () => {
  const actual = (await vi.importActual<typeof import('react-router-dom')>('react-router-dom'));
  return {
    ...actual,
    Link: ({ children, to }: { children: React.ReactNode; to: string }) => <a href={to}>{children}</a>,
  };
});

vi.mock('../../store/user/action', () => ({
  fetchLogout: vi.fn(() => ({ type: 'logout' })),
}));

vi.mock('../../store/favorite/action', () => ({
  fetchFavorites: vi.fn(() => ({ type: 'fetchFavorites' })),
}));

vi.mock('../../store/error/selectors', () => ({
  selectIsError: vi.fn(),
}));

vi.mock('../../store/user/selectors', () => ({
  selectUserInfo: vi.fn(),
  selectIsAuth: vi.fn(),
}));

vi.mock('../../store/favorite/selector', () => ({
  selectFavoritesCount: vi.fn(),
}));

vi.mock('../message/message', () => ({
  default: () => <div>Mock Message</div>,
}));

describe('Header', () => {
  let useSelectorMock: SpyInstance;
  let dispatchMock: ReturnType<typeof vi.fn> & Dispatch<AnyAction>;

  beforeEach(() => {
    vi.clearAllMocks();
    useSelectorMock = vi.spyOn(redux, 'useSelector');
    dispatchMock = vi.fn() as ReturnType<typeof vi.fn> & Dispatch<AnyAction>;
    vi.spyOn(redux, 'useDispatch').mockReturnValue(dispatchMock);
  });

  const mockUser: UserAuthType = {
    name: 'Test User',
    avatarUrl: '',
    isPro: false,
    email: 'test@example.com',
    token: 'fake-token',
  };

  const setupSelectorMock = (selectors: {
    isAuth?: boolean;
    userInfo?: UserAuthType | null;
    favoritesCount?: number;
    isError?: boolean;
  }) => {
    useSelectorMock.mockImplementation((selector: unknown) => {
      if (selector === userSelectors.selectIsAuth) {
        return selectors.isAuth ?? false;
      }
      if (selector === userSelectors.selectUserInfo) {
        return selectors.userInfo ?? null;
      }
      if (selector === favoriteSelectors.selectFavoritesCount) {
        return selectors.favoritesCount ?? 0;
      }
      if (selector === errorSelectors.selectIsError) {
        return selectors.isError ?? false;
      }
      return undefined;
    });
  };

  it('should show "Sign in" when user is not authorized', () => {
    setupSelectorMock({ isAuth: false, isError: false });
    render(<Header />);
    expect(screen.getByText('Sign in')).toBeInTheDocument();
  });

  it('should show email and favoritesCount when user is authorized', () => {
    setupSelectorMock({ isAuth: true, userInfo: mockUser, favoritesCount: 5, isError: false });
    render(<Header />);
    expect(screen.getByText('test@example.com')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('should render Message component if there is an error', () => {
    setupSelectorMock({ isAuth: false, isError: true });
    render(<Header />);
    expect(screen.getByText('Mock Message')).toBeInTheDocument();
  });

  it('should call fetchLogout on "Sign out" click', () => {
    setupSelectorMock({ isAuth: true, userInfo: mockUser, favoritesCount: 0, isError: false });
    render(<Header />);
    fireEvent.click(screen.getByText('Sign out'));
    expect(dispatchMock).toHaveBeenCalledWith(userActions.fetchLogout());
  });

  it('should call fetchFavorites on mount if user is authorized', () => {
    setupSelectorMock({ isAuth: true, userInfo: mockUser, favoritesCount: 0, isError: false });
    render(<Header />);
    expect(dispatchMock).toHaveBeenCalledWith(favoriteActions.fetchFavorites());
  });
});
