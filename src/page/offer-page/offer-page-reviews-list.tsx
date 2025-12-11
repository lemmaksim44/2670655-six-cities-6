import { Fragment } from 'react';
import OfferPageReview from './offer-page-review';
import { useSelector } from 'react-redux';
import { selectReviewsCount, selectReviewsSortedByDate } from '../../store/reviews/selectors';

function OfferPageReviewsList() {
  const reviewCount = useSelector(selectReviewsCount);

  const maxReviewsOnPage = 10;
  const sortedReviews = useSelector(selectReviewsSortedByDate(maxReviewsOnPage));

  if (reviewCount === 0) {
    return;
  }

  return(
    <Fragment>
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviewCount}</span></h2>
      <ul className="reviews__list">
        {sortedReviews.map((review) => (
          <OfferPageReview key={review.id} review={review} />
        ))}
      </ul>
    </Fragment>
  );
}

export default OfferPageReviewsList;
