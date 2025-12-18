import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { useSelector } from 'react-redux';

import OfferPageReviewsList from '../offer-page-reviews-list';
import { ReviewType } from '../../../types/review';
import { selectReviewsCount } from '../../../store/reviews/selectors';

type SelectorMock = ReturnType<typeof vi.fn>;

vi.mock('react-redux', async () => {
  const actual = await vi.importActual<typeof import('react-redux')>('react-redux');
  return {
    ...actual,
    useSelector: vi.fn() as unknown as SelectorMock,
  };
});

vi.mock('../offer-page-review', () => ({
  default: ({ review }: { review: ReviewType }) => (
    <li data-testid="mock-review">{review.id}</li>
  ),
}));

const generateMockReviews = (count: number): ReviewType[] =>
  Array.from({ length: count }, (_, i) => ({
    id: `review-${i + 1}`,
    date: new Date(2024, 0, count - i).toISOString(),
    rating: Math.floor(Math.random() * 5) + 1,
    comment: `Comment ${i + 1}`,
    user: {} as ReviewType['user'],
  }));

describe('OfferPageReviewsList', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders nothing when reviews count is 0', () => {
    (useSelector as SelectorMock).mockImplementation((selector) => {
      if (selector === selectReviewsCount) {
        return 0;
      }
      return [];
    });

    const { container } = render(<OfferPageReviewsList />);
    expect(container.firstChild).toBeNull();
  });

  it('renders title and reviews list when reviews exist', () => {
    const mockReviews = generateMockReviews(3);

    (useSelector as SelectorMock).mockImplementation((selector) => {
      if (selector === selectReviewsCount) {
        return mockReviews.length;
      }
      return mockReviews;
    });

    render(<OfferPageReviewsList />);

    expect(screen.getByText('Reviews ·')).toBeInTheDocument();
    expect(screen.getByText(String(mockReviews.length))).toBeInTheDocument();

    const reviews = screen.getAllByTestId('mock-review');
    expect(reviews).toHaveLength(mockReviews.length);

    mockReviews.forEach((review) => {
      expect(screen.getByText(review.id)).toBeInTheDocument();
    });
  });

  it('renders at most 10 reviews when more exist', () => {
    const mockReviews = generateMockReviews(15);

    (useSelector as SelectorMock).mockImplementation((selector) => {
      if (selector === selectReviewsCount) {
        return mockReviews.length;
      }
      return mockReviews.slice(0, 10);
    });

    render(<OfferPageReviewsList />);

    const reviews = screen.getAllByTestId('mock-review');
    expect(reviews).toHaveLength(10);
    expect(screen.getByText(String(mockReviews.length))).toBeInTheDocument();
  });

  it('renders reviews in descending date order', () => {
    const mockReviews = [
      { id: 'r1', date: '2024-01-01', rating: 5, comment: 'Old', user: {} as ReviewType['user'] },
      { id: 'r2', date: '2024-01-03', rating: 4, comment: 'New', user: {} as ReviewType['user'] },
      { id: 'r3', date: '2024-01-02', rating: 3, comment: 'Middle', user: {} as ReviewType['user'] },
    ];

    (useSelector as SelectorMock).mockImplementation((selector) => {
      if (selector === selectReviewsCount) {
        return mockReviews.length;
      }
      return mockReviews
        .slice()
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    });

    render(<OfferPageReviewsList />);

    const reviews = screen.getAllByTestId('mock-review');
    expect(reviews[0].textContent).toBe('r2');
    expect(reviews[1].textContent).toBe('r3');
    expect(reviews[2].textContent).toBe('r1');
  });

  it('handles undefined or malformed reviews gracefully', () => {
    (useSelector as SelectorMock).mockImplementation(() => 0);

    const { container } = render(<OfferPageReviewsList />);
    expect(container.firstChild).toBeNull();
  });
});
