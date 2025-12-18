import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import OfferPageReview from '../offer-page-review';
import { ReviewType } from '../../../types/review';

vi.mock('../../../utils/scripts', () => ({
  formatDate: vi.fn(() => 'April 2024'),
  getRating: vi.fn(() => '80%'),
}));

const mockReview: ReviewType = {
  id: 'review-1',
  date: '2024-04-10T12:00:00.000Z',
  rating: 4,
  comment: 'Great place!',
  user: {
    name: 'John Doe',
    avatarUrl: 'avatar.jpg',
  } as ReviewType['user'],
};

describe('OfferPageReview', () => {
  it('renders user info correctly', () => {
    render(<OfferPageReview review={mockReview} />);

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByAltText('Reviews avatar')).toHaveAttribute(
      'src',
      mockReview.user.avatarUrl
    );
  });

  it('renders review comment', () => {
    render(<OfferPageReview review={mockReview} />);

    expect(screen.getByText('Great place!')).toBeInTheDocument();
  });

  it('renders formatted date', () => {
    render(<OfferPageReview review={mockReview} />);

    expect(screen.getByText('April 2024')).toBeInTheDocument();
  });

  it('sets correct datetime attribute', () => {
    render(<OfferPageReview review={mockReview} />);

    const timeElement = screen.getByText('April 2024');
    expect(timeElement).toHaveAttribute('dateTime', '2024-04-10');
  });

  it('renders correct rating width', () => {
    const { container } = render(<OfferPageReview review={mockReview} />);

    const stars = container.querySelector('.reviews__stars > span') as HTMLElement;
    expect(stars.style.width).toBe('80%');
  });
});
