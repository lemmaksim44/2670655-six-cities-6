import { render, screen, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import Message from './message';
import { setServerError } from '../../store/error/action';

const dispatchMock = vi.fn();

vi.mock('react-redux', () => ({
  useDispatch: () => dispatchMock,
  useSelector: vi.fn(),
}));

vi.mock('../../store/error/selectors', () => ({
  selectServerError: vi.fn(),
}));

import { useSelector } from 'react-redux';
import { selectServerError } from '../../store/error/selectors';

describe('Message component', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    dispatchMock.mockClear();
  });

  afterEach(() => {
    vi.clearAllTimers();
    vi.clearAllMocks();
  });

  it('renders server error message', () => {
    vi.mocked(useSelector).mockImplementation((selector) =>
      selector === selectServerError ? 'Server error message' : null
    );

    render(<Message />);

    expect(screen.getByText('Server error message')).toBeInTheDocument();
  });

  it('renders empty message when server error is null', () => {
    vi.mocked(useSelector).mockImplementation((selector) =>
      selector === selectServerError ? null : null
    );

    render(<Message />);

    expect(screen.getByText('', { selector: 'p' })).toBeInTheDocument();
  });

  it('dispatches setServerError(null) after 5 seconds', () => {
    vi.mocked(useSelector).mockImplementation((selector) =>
      selector === selectServerError ? 'Error' : null
    );

    render(<Message />);

    act(() => {
      vi.advanceTimersByTime(5000);
    });

    expect(dispatchMock).toHaveBeenCalledTimes(1);
    expect(dispatchMock).toHaveBeenCalledWith(setServerError(null));
  });

  it('clears timeout on unmount', () => {
    vi.mocked(useSelector).mockImplementation((selector) =>
      selector === selectServerError ? 'Error' : null
    );

    const { unmount } = render(<Message />);

    unmount();

    act(() => {
      vi.advanceTimersByTime(5000);
    });

    expect(dispatchMock).not.toHaveBeenCalled();
  });
});
