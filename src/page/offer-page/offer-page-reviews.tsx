import { ReviewType } from "../../types/review";

type OfferPageReviewsProps = {
  reviews: ReviewType[];
}

function OfferPageReviews({reviews}: OfferPageReviewsProps) {
  if (reviews.length === 0) {
    return
  }

  const sortedReviews = reviews.toSorted(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return(
    <div>
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{sortedReviews.length}</span></h2>
        <ul className="reviews__list">
          {sortedReviews.map((review, index) => (
            <li className="reviews__item" key={index}>
              <div className="reviews__user user">
                <div className="reviews__avatar-wrapper user__avatar-wrapper">
                  <img className="reviews__avatar user__avatar" src={review.user.avatarUrl} width="54" height="54" alt="Reviews avatar"/>
                </div>
                <span className="reviews__user-name">
                  {review.user.name}
                </span>
              </div>
              <div className="reviews__info">
                <div className="reviews__rating rating">
                  <div className="reviews__stars rating__stars">
                    <span style={{width: `${review.rating * 20}%`}}></span>
                    <span className="visually-hidden">Rating</span>
                  </div>
                </div>
                <p className="reviews__text">
                  {review.comment}
                </p>
                <time className="reviews__time" dateTime={review.date.slice(0, 10)}>
                  {new Date(review.date).getUTCDate()}{" "}
                  {new Date(review.date).toLocaleString("en-US", { month: "long" })}{" "}
                  {new Date(review.date).getUTCFullYear()}
                </time>
              </div>
            </li>
          ))}
        </ul>
    </div>
  );
}

export default OfferPageReviews;
