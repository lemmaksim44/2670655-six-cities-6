import { useState, Fragment, ChangeEvent } from 'react';
import { ratings } from './const';

function OfferPageForm() {
  const [formData, setFormData] = useState({
    rating: '',
    review: '',
  });

  const handleFieldChange = (evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = evt.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <form className="reviews__form form" action="#" method="post">
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {ratings.map((star) => (
          <Fragment key={star.value}>
            <input
              onChange={handleFieldChange}
              className="form__rating-input visually-hidden"
              name="rating"
              value={star.value.toString()}
              id={`${star.value}-stars`}
              type="radio"
              checked={formData.rating === star.value.toString()}
            />
            <label
              htmlFor={`${star.value}-stars`}
              className="reviews__rating-label form__rating-label"
              title={star.title}
            >
              <svg className="form__star-image" width="37" height="33">
                <use xlinkHref="#icon-star"></use>
              </svg>
            </label>
          </Fragment>
        ))}
      </div>
      <textarea onChange={handleFieldChange} className="reviews__textarea form__textarea" id="review" name="review" value={formData.review} placeholder="Tell how was your stay, what you like and what can be improved"></textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" disabled={!formData.rating || formData.review.length < 50}>Submit</button>
      </div>
    </form>
  );
}

export default OfferPageForm;
