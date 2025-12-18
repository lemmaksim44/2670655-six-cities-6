import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { useDispatch, useSelector } from 'react-redux';
import OfferPageForm from '../offer-page-form';
import { sendReview } from '../../../store/reviews/action';
import { selectIsSendingReview } from '../../../store/reviews/selectors';

type DispatchMock = ReturnType<typeof vi.fn>;
type SelectorMock = ReturnType<typeof vi.fn>;

vi.mock('react-redux', async () => {
  const actual = await vi.importActual<typeof import('react-redux')>('react-redux');
  return {
    ...actual,
    useDispatch: vi.fn() as unknown as DispatchMock,
    useSelector: vi.fn() as unknown as SelectorMock,
  };
});

vi.mock('../../../store/reviews/action', () => ({
  sendReview: vi.fn(() => ({
    unwrap: () => Promise.resolve(),
  })),
}));

vi.mock('../../store/reviews/selectors', () => ({
  selectIsSendingReview: vi.fn(),
}));

describe('OfferPageForm', () => {
  const offerIdMock = 'offer-123';
  let mockDispatch: DispatchMock;

  beforeEach(() => {
    mockDispatch = vi.fn();

    (useDispatch as DispatchMock).mockReturnValue(mockDispatch);
    (useSelector as SelectorMock).mockImplementation((selector) => {
      if (selector === selectIsSendingReview) {
        return false;
      }
    });

    vi.clearAllMocks();
  });

  it('renders form correctly', () => {
    render(<OfferPageForm offerId={offerIdMock} />);

    expect(screen.getByText('Your review')).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Tell how was your stay/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Submit/i })).toBeInTheDocument();
  });

  it('submit button is disabled by default', () => {
    render(<OfferPageForm offerId={offerIdMock} />);

    expect(screen.getByRole('button', { name: /Submit/i })).toBeDisabled();
  });

  it('enables submit button when rating and valid review are provided', () => {
    render(<OfferPageForm offerId={offerIdMock} />);

    fireEvent.click(screen.getByDisplayValue('5'));
    fireEvent.change(screen.getByPlaceholderText(/Tell how was your stay/i), {
      target: { value: 'a'.repeat(50) },
    });

    expect(screen.getByRole('button', { name: /Submit/i })).toBeEnabled();
  });

  it('dispatches sendReview with correct payload', () => {
    render(<OfferPageForm offerId={offerIdMock} />);

    fireEvent.click(screen.getByDisplayValue('5'));
    fireEvent.change(screen.getByPlaceholderText(/Tell how was your stay/i), {
      target: { value: 'a'.repeat(50) },
    });
    fireEvent.click(screen.getByRole('button', { name: /Submit/i }));

    expect(sendReview).toHaveBeenCalledWith({
      offerId: offerIdMock,
      rating: 5,
      comment: 'a'.repeat(50),
    });

    expect(mockDispatch).toHaveBeenCalled();
  });

  it('disables form when review is sending', () => {
    (useSelector as SelectorMock).mockReturnValue(true);

    render(<OfferPageForm offerId={offerIdMock} />);

    expect(screen.getByPlaceholderText(/Tell how was your stay/i)).toBeDisabled();
    expect(screen.getByRole('button', { name: /Submit/i })).toBeDisabled();
  });
});
