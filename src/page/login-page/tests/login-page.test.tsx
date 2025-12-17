import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import LoginPage from '../login-page';
import { AppRoute, City } from '../../../const';
import { setCity } from '../../../store/offers/action';
import type { TypedUseSelectorHook } from 'react-redux';

const mockDispatch = vi.fn();
let selectorReturnValues: unknown[] = [];

vi.mock('react-redux', async () => {
  const actual = await vi.importActual<typeof import('react-redux')>('react-redux');

  const useSelectorMock: TypedUseSelectorHook<unknown> = () => selectorReturnValues.shift();

  return {
    ...actual,
    useDispatch: () => mockDispatch,
    useSelector: useSelectorMock,
  };
});

vi.mock('../login-form', () => ({
  default: () => <div data-testid="login-form" />,
}));

vi.mock('../../../components/message/message', () => ({
  default: () => <div data-testid="error-message" />,
}));

const renderComponent = () =>
  render(
    <MemoryRouter initialEntries={[AppRoute.Login]}>
      <LoginPage />
    </MemoryRouter>
  );

describe('LoginPage component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    selectorReturnValues = [];
  });

  it('should render login page when user is not authenticated', () => {
    selectorReturnValues = [false, false];

    renderComponent();

    expect(screen.getByText('Sign in')).toBeInTheDocument();
    expect(screen.getByTestId('login-form')).toBeInTheDocument();
  });

  it('should render error message when error state is true', () => {
    selectorReturnValues = [false, true];

    renderComponent();

    expect(screen.getByTestId('error-message')).toBeInTheDocument();
  });

  it('should redirect to main page when user is authenticated', () => {
    selectorReturnValues = [true, false];

    renderComponent();

    expect(screen.queryByText('Sign in')).not.toBeInTheDocument();
  });

  it('should dispatch setCity action when city link is clicked', () => {
    selectorReturnValues = [false, false];

    vi.spyOn(Math, 'random').mockReturnValue(0);

    renderComponent();

    const city = Object.values(City)[0];
    fireEvent.click(screen.getByText(city));

    expect(mockDispatch).toHaveBeenCalledWith(setCity(city));
  });
});
