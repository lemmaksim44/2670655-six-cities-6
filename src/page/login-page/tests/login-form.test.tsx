import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import type { MockedFunction } from 'vitest';
import LoginForm from '../login-form';
import { useSelector } from 'react-redux';
import { fetchLogin } from '../../../store/user/action';
import { setServerError } from '../../../store/error/action';

const dispatchMock = vi.fn();

vi.mock('react-redux', async () => {
  const actual = await vi.importActual<typeof import('react-redux')>('react-redux');

  return {
    ...actual,
    useDispatch: () => dispatchMock,
    useSelector: vi.fn(),
  };
});

vi.mock('../../../store/user/action', () => ({
  fetchLogin: vi.fn(),
}));

vi.mock('../../../store/error/action', () => ({
  setServerError: vi.fn(),
}));

vi.mock('../../../store/error/selectors', () => ({
  selectServerError: vi.fn(),
}));

const useSelectorMock = useSelector as MockedFunction<typeof useSelector>;

describe('LoginForm', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders login form', () => {
    useSelectorMock.mockReturnValue('');

    render(<LoginForm />);

    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
  });

  it('dispatches validation error for invalid password', () => {
    useSelectorMock.mockReturnValue('');

    render(<LoginForm />);

    fireEvent.change(screen.getByPlaceholderText('Email'), {
      target: { value: 'test@mail.com' },
    });

    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: 'password' },
    });

    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

    expect(setServerError).toHaveBeenCalledWith('Пароль должен содержать минимум одну английскую букву и одну цифру');
  });

  it('clears server error before successful login', () => {
    useSelectorMock.mockReturnValue('Some error');

    render(<LoginForm />);

    fireEvent.change(screen.getByPlaceholderText('Email'), {
      target: { value: 'test@mail.com' },
    });

    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: 'pass123' },
    });

    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

    expect(setServerError).toHaveBeenCalledWith('');
    expect(fetchLogin).toHaveBeenCalled();
  });
});
