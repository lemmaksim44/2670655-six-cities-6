import { ReviewType } from '../../types/review';
import { Fragment } from 'react';
import OfferPageReview from './offer-page-review';

type OfferPageReviewsProps = {
  reviews: ReviewType[];
}

function OfferPageReviewsList({reviews}: OfferPageReviewsProps) {
  if (reviews.length === 0) {
    return;
  }

  const sortedReviews = reviews
    .slice()
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 10);

  return(
    <Fragment>
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviews.length}</span></h2>
      <ul className="reviews__list">
        {sortedReviews.map((review) => (
          <OfferPageReview key={review.id} review={review} />
        ))}
      </ul>
    </Fragment>
  );
}

export default OfferPageReviewsList;
